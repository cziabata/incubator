import { Request, Response } from "express";
import { IPaginationValues } from "../@types/shared";
import { getPaginationValues } from "../utils/pagination-helper";
import { usersQueryRepository } from "../query-repositories/usersQueryRepository";
import { IUserInput } from "../@types/users";
import { usersService } from "../domains/users-service";

export const getUsersController = async (req: Request, res: Response) => {
  const paginationValues: IPaginationValues = getPaginationValues(req.query);
  const foundUsers = await usersQueryRepository.getUsers({
    ...paginationValues,
    searchLoginTerm: req.query.searchLoginTerm ? String(req.query.searchLoginTerm) : null,
    searchEmailTerm: req.query.searchEmailTerm ? String(req.query.searchEmailTerm) : null,
  })
  res.status(200).send(foundUsers);
}

export const createUserController = async (req: Request, res: Response) => {
  const prepareData: IUserInput = {
    login: req.body.login,
    email: req.body.email,
    password: req.body.password,
  }

  const newUserId = await usersService.createUser(prepareData);
  const newUser = await usersQueryRepository.getUserById(newUserId);

  res.status(201).send(newUser);
}

export const deleteUserController = async (req: Request, res: Response) => {
  const isDeleted = await usersService.deleteUser(req.params.id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
}