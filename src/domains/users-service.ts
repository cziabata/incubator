import { INewUserDto, IUserInput } from "../@types/users";
import { usersRepository } from "../repositories/mongo/users-repository";
import { bcryptService } from "../utils/bcrypt.service";

export const usersService = {
  async createUser(data: IUserInput): Promise<string> {

    const hashPassword = await bcryptService.generateHash(data.password);

    const newUser: INewUserDto = {
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      login: data.login,
      email: data.email,
      password: hashPassword
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