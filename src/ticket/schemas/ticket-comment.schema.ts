import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Ticket } from './ticket.schema';

export type TicketCommentDocument = TicketComment & Document;
@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any): void => {
      delete ret._id;
      delete ret.__v;
    },
  },
  toObject: {
    virtuals: true,
  },
})
export class TicketComment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  ticket: Ticket;

  @Prop({
    type: String,
    required: true,
  })
  text: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  by: User;
}

export const TicketCommentSchema = SchemaFactory.createForClass(TicketComment);
