import { Body, Controller, HttpStatus, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDTO } from '..';
import { User } from '../schemas/user.schema';
import { UsersService } from '../services/users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  async createUser(
    @Res() response: Response,
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<any> {
    try {

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
