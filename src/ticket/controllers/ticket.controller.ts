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

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createTicket(
    @Res() response: Response,
    @Body() createTicketDTO: any,
  ): Promise<any> {
    try {
      const ticket = await this.ticketService.createTicket(createTicketDTO);
      return response.status(HttpStatus.OK).json(ticket);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getUserTickets(
    @Req() req: Request,
    @Res() response: Response,
  ): Promise<any> {
    const user = req.user as string;

    try {
      const tickets = await this.ticketService.getUserTickets(user);
      return response.status(HttpStatus.OK).json(tickets);
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).send();
    }
  }

  /**
   * Requirement 2: View the status of the previous requests.
   * The returned data contains status which can be used in the Front End
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTicket(@Param() params, @Res() response: Response): Promise<any> {
    try {
      const { id } = params;
      const ticket = await this.ticketService.findTicketByCriteria({ _id: id });
      return response.status(HttpStatus.OK).json(ticket);
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).send();
    }
  }
}
