import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SCHEMAS } from 'src/shared/constants';
import { TicketCommentsController } from '../controllers/ticket-comment.controller';
import { TicketController } from '../controllers/ticket.controller';
import { TicketCommentSchema } from '../schemas/ticket-comment.schema';
import { TicketSchema } from '../schemas/ticket.schema';
import { TicketService } from '../services/ticket.service';
import { TicketCommentService } from '../services/ticket-comment.service';
import { UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SCHEMAS.TICKET, schema: TicketSchema }]),
    MongooseModule.forFeature([
      { name: SCHEMAS.TICKET_COMMENT, schema: TicketCommentSchema },
    ]),
    MongooseModule.forFeature([{ name: SCHEMAS.USER, schema: UserSchema }]),
  ],
  controllers: [TicketController, TicketCommentsController],
  providers: [TicketService, TicketCommentService],
  exports: [TicketService, TicketCommentService],
})
export class TicketModule {}
