import { IUserDB, IUserInput } from "../@types/users";
import { usersRepository } from "../repositories/mongo/users-repository";
import { bcryptService } from "../application/bcrypt.service";

export const usersService = {
  async createUser(data: IUserInput): Promise<string> {

    const hashPassword = await bcryptService.generateHash(data.password);

    const newUser: IUserDB = {
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      login: data.login,
      email: data.email,
      password: hashPassword,
      registerConfirmation: {
        confirmationCode: "",
        expirationDate: null,
        isConfirmed: true
      }
    };

    const createdUserId = await usersRepository.createUser(newUser);

    return createdUserId;
  },

  async deleteUser(id: string): Promise<boolean> {
    const user = await usersRepository.findUserById(id);
    if (!user) return false;
    return await usersRepository.deleteUser(id);
  },
}