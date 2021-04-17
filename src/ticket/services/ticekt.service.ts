import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SCHEMAS } from 'src/shared/constants';
import { User } from 'src/user/schemas/user.schema';
import { TickcetDocument, Ticket } from '../schemas/ticket.schema';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(SCHEMAS.TICKET) private ticketModel: Model<TickcetDocument>,
  ) {}

  public async createTicket(payload: Ticket): Promise<TickcetDocument> {
    return this.ticketModel.create(payload);
  }

  public async findTicketByCriteria(
    criteria: any = {},
  ): Promise<TickcetDocument> {
    return this.ticketModel.findOne(criteria);
  }

  public async getUserTickets(userId: string): Promise<any> {
    return this.ticketModel.find({ owners: userId });
  }
}
