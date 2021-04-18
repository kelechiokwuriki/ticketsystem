import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDTO } from '..';
import { UsersService } from '../services/user.service';

@Controller('users')
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
      return response.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }
}
