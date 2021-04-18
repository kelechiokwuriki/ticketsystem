import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SCHEMAS } from 'src/shared/constants';
import {
  TicketCommentDocument,
  TicketComment,
} from '../schemas/ticket-comment.schema';

@Injectable()
export class TicketCommentService {
  constructor(
    @InjectModel(SCHEMAS.TICKETCOMMENT)
    private ticketCommentModel: Model<TicketCommentDocument>,
  ) {}

  public async createTicketComment(payload: TicketComment): Promise<any> {
    return this.ticketCommentModel.create(payload);
  }
}
