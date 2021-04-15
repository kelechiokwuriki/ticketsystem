import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SCHEMAS } from 'src/shared/constants';
import { userDTO } from '..';
import { UserDocument } from '../schemas/user.schema';

// This should be a real class/interface representing a user entity
export type User = userDTO;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  constructor(
    @InjectModel(SCHEMAS.USER) private userModel: Model<UserDocument>,
  ) {}
  async create(user: User): Promise<UserDocument> {
    return this.userModel.create(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
