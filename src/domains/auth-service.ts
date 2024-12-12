import { WithId } from "mongodb";
import { IUserDB, IUserInput } from "../@types/users";
import { usersRepository } from "../repositories/mongo/users-repository";
import { bcryptService } from "../application/bcrypt.service";
import { emailService } from "./email-service";
import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns";

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
        expirationDate: add(new Date(), { minutes: 15 }),
        isConfirmed: false
      }
    };

    const createdUserId = await usersRepository.createUser(newUser);
    
    try {
      const result = await emailService.sendEmailConfirmationMessage(newUser);
      console.log(result);
      return true;
    } catch(error) {
      console.log(error);
      await usersRepository.deleteUser(createdUserId);
      return false
    }
    
  }
}