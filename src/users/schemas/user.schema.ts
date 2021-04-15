import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Ticket } from 'src/ticket/ticket.schema';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' })
  ticket: Ticket;

  @Prop()
  // Many to many is more appropriate
  // boolean is used for easy prototyping
  admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
