import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
  })
  firstname: string;

  @Prop({
    required: true,
  })
  lastname: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop()
  // Many to many is more appropriate
  // string is used for easy prototyping
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
