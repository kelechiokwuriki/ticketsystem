import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { assumedNumberOfDaysInAMonth, SCHEMAS } from 'src/shared/constants';
import { TicketDocument, Ticket, TicketStatus } from '../schemas/ticket.schema';
import { UserDocument } from 'src/user/schemas/user.schema';
import { Parser } from 'json2csv';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(SCHEMAS.TICKET) private ticketModel: Model<TicketDocument>,
    @InjectModel(SCHEMAS.USER) private userModel: Model<UserDocument>,
  ) {}

  public async createTicket(payload: Ticket): Promise<TicketDocument> {
    return this.ticketModel.create(payload);
  }

  public async findOneTicketByCriteria(
    criteria: any = {},
  ): Promise<TicketDocument> {
    return this.ticketModel.findOne(criteria);
  }

  public async findAllTicketsByCriteria(
    criteria: any = {},
  ): Promise<TicketDocument[]> {
    return this.ticketModel.find(criteria);
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

  public async generateClosedTicketsInCSVFormat(): Promise<any> {
    const closedTickets: any = await this.ticketModel.find({
      status: TicketStatus.Closed,
    });

    const ticketsForUse = [];

    closedTickets.forEach((ticket) => {
      if (
        moment(moment()).diff(ticket.updatedAt, 'days') ===
        assumedNumberOfDaysInAMonth
      ) {
        ticketsForUse.push({
          text: ticket.text,
          status: ticket.status,
          closedAt: moment(ticket.updatedAt).format(
            'dddd, MMMM Do YYYY, h:mm:ss a',
          ),
        });
      }
    });

    if (ticketsForUse.length > 0) {
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(ticketsForUse);
      return csv;
    }
    return null;
  }
}
