import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import * as mongoose from 'mongoose';

export type TickcetDocument = Ticket & Document;

export enum TicketState {
  Open = 'open',
  Processing = 'processing',
  Closed = 'closed',
}

export const TicketStates = Object.values(TicketState);
export class Ticket {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;

  @Prop({
    type: String,
    enum: TicketState,
  })
  status: TicketState;
}
