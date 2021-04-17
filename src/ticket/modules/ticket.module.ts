import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SCHEMAS } from 'src/shared/constants';
import { TicketController } from '../controllers/ticket.controller';
import { TicketSchema } from '../schemas/ticket.schema';
import { TicketService } from '../services/ticekt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SCHEMAS.TICKET, schema: TicketSchema }]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
