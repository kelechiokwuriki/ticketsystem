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
import { User } from 'src/user/schemas/user.schema';
import { CreateTicketDTO } from '..';
import { TicketService } from '../services/ticekt.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createTicket(
    @Req() req: Request,
    @Res() response: Response,
    @Body() createTicketDTO: CreateTicketDTO,
  ): Promise<any> {
    try {
      // you can check if user is valid in system at this point using userId

      const ticket = await this.ticketService.createTicket(createTicketDTO);
      return response.status(HttpStatus.OK).json(ticket);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
