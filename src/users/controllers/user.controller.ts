import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDTO } from '..';
import { UsersService } from '../services/users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  async createUser(
    @Res() response: Response,
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<any> {
    try {
      const createdUser = await this.userService.create(createUserDTO);
      return response.status(HttpStatus.OK).json(createdUser);
    } catch (error) {
      console.log('Error', error);
      return response.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
