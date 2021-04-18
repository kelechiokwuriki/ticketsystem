import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ROLES } from 'src/shared/constants';
import { User } from 'src/user/schemas/user.schema';
import { CreateTicketDTO } from '..';
import { TicketService } from '../services/ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createTicket(
    @Res() response: Response,
    @Body() createTicketDTO: CreateTicketDTO,
  ): Promise<any> {
    try {
      const ticket = await this.ticketService.createTicket(createTicketDTO);
      return response.status(HttpStatus.OK).json(ticket);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }

  /*
  Fetches all tickets for logged in owner
  */
  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getTicketsForUser(
    @Req() req: Request,
    @Param() params,
    @Query() query,
    @Res() response: Response,
  ): Promise<any> {
    const { userId } = params;

    const ownerTicketQuery = { owners: userId };

    try {
      const tickets = await this.ticketService.findAllTicketsByCriteria(
        ownerTicketQuery,
      );
      return response.status(HttpStatus.OK).json(tickets);
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).send(error.message);
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
      const ticket = await this.ticketService.findOneTicketByCriteria({
        _id: id,
      });
      return response.status(HttpStatus.OK).json(ticket);
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).send(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/process/:ticketId')
  async processTicket(
    @Param() params,
    @Req() req: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const user = req.user as User;
      if (user.role !== ROLES.SUPPORT_AGENT) {
        throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED);
      }

      const { ticketId } = params;
      const ticket = await this.ticketService.processTicket(ticketId);
      return response.status(HttpStatus.OK).json(ticket);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/close/:id')
  async closeTicket(@Param() params, @Res() response: Response): Promise<any> {
    try {
      const { id } = params;
      const ticket = await this.ticketService.processTicket(id);
      return response.status(HttpStatus.OK).json(ticket);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/close/:id')
  async getTicketsForOwner(
    @Param() params,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const { id } = params;
      const ticket = await this.ticketService.processTicket(id);
      return response.status(HttpStatus.OK).json(ticket);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }
}
