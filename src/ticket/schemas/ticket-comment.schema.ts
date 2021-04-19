import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Ticket } from './ticket.schema';
import { SCHEMAS } from 'src/shared/constants';

export type TicketCommentDocument = TicketComment & Document;
@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any): void => {
      delete ret._id;
      delete ret.__v;
      delete ret.password;
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

const TicketCommentSchema = SchemaFactory.createForClass(TicketComment);

TicketCommentSchema.virtual('commentor', {
  ref: SCHEMAS.USER,
  localField: 'by',
  foreignField: '_id',
  autopopulate: true,
});

export { TicketCommentSchema };
