import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SCHEMAS } from 'src/shared/constants';
import { TicketDocument, Ticket, TicketStatus } from '../schemas/ticket.schema';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(SCHEMAS.TICKET) private ticketModel: Model<TicketDocument>,
  ) {}

  public async createTicket(payload: Ticket): Promise<TicketDocument> {
    return this.ticketModel.create(payload);
  }

  public async findOneTicketByCriteria(
    criteria: any = {},
  ): Promise<TicketDocument> {
    return this.ticketModel.findOne(criteria);
  }

  public async getUserTickets(userId: string): Promise<TicketDocument[]> {
    return this.ticketModel.find({ owners: userId });
  }

  public async processTicket(ticketId: string): Promise<TicketDocument> {
    const ticket = await this.findOneTicketByCriteria({ _id: ticketId });

    if (ticket.status === TicketStatus.Processing) {
      throw new Error('Ticket is already being processed');
    }

    ticket.status = TicketStatus.Processing;

    return ticket.save();
  }
}
