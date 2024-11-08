import { WithId } from "mongodb";
import { IUserDB } from "../@types/users";
import { usersRepository } from "../repositories/mongo/users-repository";
import { bcryptService } from "../utils/bcrypt.service";

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
}