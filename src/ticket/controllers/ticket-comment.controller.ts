import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TicketCommentService } from '../services/ticket-comment.service';

@Controller('ticket-comments')
export class TicketCommentsController {
  constructor(private readonly ticketCommentService: TicketCommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createTicket(
    @Res() response: Response,
    @Req() req: Request,
    @Body() ticketComment: any,
  ): Promise<any> {
    try {
      ticketComment.by = req.user;
      const ticketCommentResponse = await this.ticketCommentService.createTicketComment(
        ticketComment,
      );
      return response.status(HttpStatus.OK).json(ticketCommentResponse);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }
}
