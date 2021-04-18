import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/schemas/user.schema';
import { CreateTicketDTO } from '..';
import { TicketService } from '../services/ticekt.service';
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
      return response.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
