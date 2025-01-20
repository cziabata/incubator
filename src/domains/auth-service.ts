import { WithId } from "mongodb";
import { Request } from "express";
import { IUserDB, IUserInput } from "../@types/users";
import { usersRepository } from "../repositories/mongo/users-repository";
import { bcryptService } from "../application/bcrypt.service";
import { emailService } from "./email-service";
import { v4 as uuidv4 } from "uuid";
import { add, addSeconds, isAfter } from "date-fns";
import { jwtService } from "../application/jwt.service";
import { refreshTokenRepository } from "../repositories/mongo/refresh-tokens-repository";
import { SETTINGS } from "../config";
import { sessionSevice } from "../application/session.service";
import { securityDevicesService } from "./security-devices-service";
import { IIdType, ISessionType } from "../@types/shared";
import { ISession } from "../@types/auth";
import { securityDevicesRepository } from "../repositories/mongo/security-devices-repository";

export const authService = {

  async loginUser(req: Request): Promise<{ accessToken: string, refreshToken: string } | null> {

    const { loginOrEmail, password } = req.body;

    const user = await this.checkUserCredentials(loginOrEmail, password);
    if (!user) {
      return null;
    }

    const deviceId = await sessionSevice.generateDeviceId();

    const iat = new Date(Date.now());
    const refreshTokenSeconds = parseInt(SETTINGS.REFRESH_TOKEN_TIME.replace("s", ""), 10);
    const exp = addSeconds(iat, refreshTokenSeconds);

    const accessToken = await jwtService.createToken(user._id.toString());
    const refreshToken = await jwtService.createRefreshToken(user._id.toString(), iat.getTime(), deviceId);

    const newSession = {
      user_id: user._id.toString(),
      device_id: deviceId,
      device_name: req.headers["user-agent"] || "",
      ip: req.ip || "",
      iat: iat.toISOString(),
      exp,
    };

    await securityDevicesService.createSession(newSession);

    return { accessToken, refreshToken };

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

  async refreshTokens(req: Request): Promise<{ refreshToken: string, accessToken: string } | null> {

    const { id } = req.user as IIdType;
    const { deviceId, iat } = req.session as ISessionType;

    const oldRefreshToken = req.cookies.refreshToken;

    try {
      const result = await refreshTokenRepository.insertToken(oldRefreshToken);

      if (!result) return null;

      const iat = new Date(Date.now());
      const refreshTokenSeconds = parseInt(SETTINGS.REFRESH_TOKEN_TIME.replace("s", ""), 10);
      const exp = addSeconds(iat, refreshTokenSeconds);

      const refreshToken = await jwtService.createRefreshToken(id, iat.getTime(), deviceId);
      const accessToken = await jwtService.createToken(id);

      const newSession: Partial<ISession> = {
        iat: iat.toISOString(),
        exp,
      };
  
      await securityDevicesService.updateSession(deviceId, newSession);

      return { refreshToken, accessToken };
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async logout(req: Request): Promise<boolean> {

    const userId = (req.user as IIdType).id;
    const deviceId = (req.session as ISessionType).deviceId;

    try {
      const result = await securityDevicesRepository.deleteActiveSessionByDeviceId(userId, deviceId)
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async passwordRecovery(email: string): Promise<boolean> {
    const user = await usersRepository.findByLoginOrEmail(email);
    if (!user) return true;

    const updatedlUser = {
      ...user,
      registerConfirmation: {
        confirmationCode: uuidv4(),
        expirationDate: add(new Date(), { hours: 1, minutes: 15 }),
        isConfirmed: false
      }
    }

    try {
      await emailService.sendPasswordRecoveryEmail(updatedlUser);
      await usersRepository.updateConfirmationAfterPasswordReset({
        _id: updatedlUser._id,
        confirmationCode: updatedlUser.registerConfirmation.confirmationCode,
        expirationDate: updatedlUser.registerConfirmation.expirationDate,
        isConfirmed: updatedlUser.registerConfirmation.isConfirmed
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async confirmPasswordRecovery(newPassword: string, code: string): Promise<boolean> {
    const user = await usersRepository.findUserByConfirmationCode(code);
    if (!user) return false;
    if (user.registerConfirmation.isConfirmed) return false;
    if (user.registerConfirmation.confirmationCode !== code) return false;
    if (!user.registerConfirmation.expirationDate) return false
    if (!isAfter(user.registerConfirmation.expirationDate, new Date(Date.now()))) return false;

    const hashPassword = await bcryptService.generateHash(newPassword);

    if(hashPassword === user.password) return false;

    const result = await usersRepository.updateUserAfterPasswordRecovery(user._id, hashPassword);
    return result;
  }
}