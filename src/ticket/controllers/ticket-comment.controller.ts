import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TicketCommentService } from '../services/ticket-comment.service';

@Controller('ticket-comments')
export class TicketCommentsController {
  constructor(private readonly ticketCommentService: TicketCommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createTicket(
    @Res() response: Response,
    @Body() ticketComment: any,
  ): Promise<any> {
    try {
      const ticketCommentResponse = await this.ticketCommentService.createTicketComment(
        ticketComment,
      );
      return response.status(HttpStatus.OK).json(ticketCommentResponse);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }
}
