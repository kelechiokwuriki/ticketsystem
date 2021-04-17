import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import * as mongoose from 'mongoose';

export type TickcetDocument = Ticket & Document;

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
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
