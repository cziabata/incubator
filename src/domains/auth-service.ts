import { WithId } from "mongodb";
import { IUserDB, IUserInput } from "../@types/users";
import { usersRepository } from "../repositories/mongo/users-repository";
import { bcryptService } from "../application/bcrypt.service";
import { emailService } from "./email-service";
import { v4 as uuidv4 } from "uuid";
import { add, isAfter } from "date-fns";
import { jwtService } from "../application/jwt.service";
import { refreshTokenRepository } from "../repositories/mongo/refresh-tokens-repository";

export const authService = {
  async loginUser(loginOrEmail: string, password: string): Promise<WithId<IUserDB> | null> {
    return this.checkUserCredentials(loginOrEmail, password);
  },

  async checkUserCredentials(loginOrEmail: string, password: string): Promise<WithId<IUserDB> | null> {
    const user = await usersRepository.findByLoginOrEmail(loginOrEmail);
    if (!user) return null;

    const isPassCorrect = await bcryptService.checkPassword(password, user.password);
    if (!isPassCorrect) return null;

    return user
  },

  async registerUser(data: IUserInput) {
    const hashPassword = await bcryptService.generateHash(data.password);

    const newUser: IUserDB = {
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      login: data.login,
      email: data.email,
      password: hashPassword,
      registerConfirmation: {
        confirmationCode: uuidv4(),
        expirationDate: add(new Date(), { hours: 1, minutes: 15 }),
        isConfirmed: false
      }
    };

    const createdUserId = await usersRepository.createUser(newUser);

    try {
      const result = await emailService.sendEmailConfirmationMessage(newUser);
      return true;
    } catch (error) {
      console.log(error);
      await usersRepository.deleteUser(createdUserId);
      return false
    }
  },

  async confirmRegistration(code: string): Promise<boolean> {

    const user = await usersRepository.findUserByConfirmationCode(code);
    if (!user) return false;
    if (user.registerConfirmation.isConfirmed) return false;
    if (user.registerConfirmation.confirmationCode !== code) return false;
    if (!user.registerConfirmation.expirationDate) return false
    if (!isAfter(user.registerConfirmation.expirationDate, new Date(Date.now()))) return false;

    const result = await usersRepository.updateConfirmation(user._id);
    return result;
  },

  async resendEmail(email: string): Promise<boolean> {
    try {

      const user = await usersRepository.findByLoginOrEmail(email);
      if (!user) return false;
      if (user.registerConfirmation.isConfirmed) return false;

      const resendedEmailUser = {
        ...user,
        registerConfirmation: {
          confirmationCode: uuidv4(),
          expirationDate: add(new Date(), { hours: 1, minutes: 15 }),
          isConfirmed: false
        }
      }

      await emailService.sendEmailConfirmationMessage(resendedEmailUser);

      await usersRepository.updateConfirmationAfterEmailResending({
        _id: resendedEmailUser._id,
        confirmationCode: resendedEmailUser.registerConfirmation.confirmationCode,
        expirationDate: resendedEmailUser.registerConfirmation.expirationDate,
      })
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async refreshTokens(userId: string, oldRefreshToken: string): Promise<{ refreshToken: string, accessToken: string } | null> {

    try {
      const result = await refreshTokenRepository.insertToken(oldRefreshToken);

      if (!result) return null;

      const refreshToken = await jwtService.createRefreshToken(userId);
      const accessToken = await jwtService.createToken(userId);
      return { refreshToken, accessToken };
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async logout(refreshToken: string): Promise<boolean> {
    try {
      const result = await refreshTokenRepository.insertToken(refreshToken);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}