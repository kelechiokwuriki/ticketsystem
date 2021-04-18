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
@Schema()
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

  ticketComments: TicketCommentDocument[];
}

const TicketSchema = SchemaFactory.createForClass(Ticket);

TicketSchema.virtual('ticketComments', {
  ref: SCHEMAS.TICKETCOMMENT,
  localField: '_id',
  foreignField: 'ticket',
  autopopulate: true,
});

export { TicketSchema };
