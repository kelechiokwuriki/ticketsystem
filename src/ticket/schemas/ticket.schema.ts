import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import * as mongoose from 'mongoose';
import { TicketCommentDocument } from './ticket-comment.schema';
import { SCHEMAS } from 'src/shared/constants';

export type TicketDocument = Ticket & Document;

export enum TicketStatus {
  Open = 'open',
  Processing = 'processing',
  Closed = 'closed',
}

export const TicketStates = Object.values(TicketStatus);
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
export class Ticket {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    required: true,
    description: 'Owners of the the ticket (client, agent, admin)',
  })
  owners: string[];

  @Prop({
    type: String,
    enum: TicketStates,
    default: TicketStatus.Open,
  })
  status: TicketStatus;

  @Prop({
    type: String,
    required: true,
  })
  text: string;
}

const TicketSchema = SchemaFactory.createForClass(Ticket);

TicketSchema.virtual('comments', {
  ref: SCHEMAS.TICKETCOMMENT,
  localField: '_id',
  foreignField: 'ticket',
  autopopulate: true,
});

export { TicketSchema };
