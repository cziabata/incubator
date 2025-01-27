import 'reflect-metadata';
import { Container, inject, injectable } from 'inversify';
import { UsersController } from "../controller/users.controller";
import { UsersService } from "../domains/users-service";
import { UsersQueryRepository } from "../query-repositories/usersQueryRepository";
import { UsersRepository } from "../repositories/mongo/users-repository";

// export const usersRepository = new UsersRepository();
// export const usersQueryRepository = new UsersQueryRepository();
// const usersService = new UsersService(usersRepository);
// export const usersController = new UsersController(usersQueryRepository, usersService);

export const io_container: Container = new Container();

io_container.bind(UsersRepository).toSelf();
io_container.bind(UsersQueryRepository).toSelf();
io_container.bind(UsersService).toSelf();
io_container.bind(UsersController).toSelf();