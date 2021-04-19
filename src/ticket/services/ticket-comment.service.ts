import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ROLES, SCHEMAS } from 'src/shared/constants';
import { UserDocument } from 'src/user/schemas/user.schema';
import {
  TicketCommentDocument,
  TicketComment,
} from '../schemas/ticket-comment.schema';
import { TicketDocument } from '../schemas/ticket.schema';

@Injectable()
export class TicketCommentService {
  constructor(
    @InjectModel(SCHEMAS.TICKET_COMMENT)
    private ticketCommentModel: Model<TicketCommentDocument>,
    @InjectModel(SCHEMAS.TICKET) private ticketModel: Model<TicketDocument>,
    @InjectModel(SCHEMAS.USER) private userModel: Model<UserDocument>,
  ) {}

  public async createTicketComment(payload: TicketComment): Promise<any> {
    const { by, ticket } = payload;

    const userRole = await (await this.userModel.findOne({ _id: by })).role;

    if (![ROLES.ADMIN, ROLES.SUPPORT_AGENT].includes(userRole)) {
      if (await this.supportAgentMadeCommentOnTicket(ticket)) {
        return this.ticketCommentModel.create(payload);
      }
      throw new Error('A support agent has not made a comment.');
    }
    return this.ticketCommentModel.create(payload);
  }

  public async supportAgentMadeCommentOnTicket(ticketId): Promise<any> {
    const ticket: any = await this.ticketCommentModel.findOne({
      ticket: ticketId,
    });
    return ticket && ticket.commentor.role === ROLES.SUPPORT_AGENT;
  }
}
