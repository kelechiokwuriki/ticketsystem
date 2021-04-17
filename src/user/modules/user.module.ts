import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SCHEMAS } from 'src/shared/constants';
import { UserController } from '../controllers/user.controller';
import { UserSchema } from '../schemas/user.schema';
import { UsersService } from '../services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SCHEMAS.USER, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
