import { Request, Response } from "express";
import { IPaginationValues } from "../@types/shared";
import { getPaginationValues } from "../utils/pagination-helper";
import { UsersQueryRepository } from "../query-repositories/usersQueryRepository";
import { IUserInput } from "../@types/users";
import { UsersService } from "../domains/users-service";

export class UsersController {

  constructor(
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly usersService: UsersService
  ) {}

  getUsersController = async (req: Request, res: Response) => {
    const paginationValues: IPaginationValues = getPaginationValues(req.query);
    const foundUsers = await this.usersQueryRepository.getUsers({
      ...paginationValues,
      searchLoginTerm: req.query.searchLoginTerm ? String(req.query.searchLoginTerm) : null,
      searchEmailTerm: req.query.searchEmailTerm ? String(req.query.searchEmailTerm) : null,
    })
    res.status(200).send(foundUsers);
  }

  createUserController = async (req: Request, res: Response) => {
    const prepareData: IUserInput = {
      login: req.body.login,
      email: req.body.email,
      password: req.body.password,
    }
  
    const newUserId = await this.usersService.createUser(prepareData);
    const newUser = await this.usersQueryRepository.getUserById(newUserId);
  
    res.status(201).send(newUser);
  }

  deleteUserController = async (req: Request, res: Response) => {
    const isDeleted = await this.usersService.deleteUser(req.params.id);
    if (isDeleted) {
      res.send(204);
    } else {
      res.send(404);
    }
  }
}