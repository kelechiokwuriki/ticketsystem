import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { saltOrRounds, SCHEMAS } from 'src/shared/constants';
import { userDTO } from '..';
import { UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity
export type User = userDTO;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(SCHEMAS.USER) private userModel: Model<UserDocument>,
  ) {}
  async create(user: User): Promise<UserDocument> {
    user.password = await bcrypt.hash(user.password, saltOrRounds);
    return this.userModel.create(user);
  }

  async getUserByEmail(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ email: username });
  }
}
