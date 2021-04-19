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
  Put,
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
    @Req() req: Request,
    @Res() response: Response,
    @Body() createTicketDTO: CreateTicketDTO,
  ): Promise<any> {
    try {
      const reqUser = req.user as string;

      if (!createTicketDTO.hasOwnProperty('owners')) {
        createTicketDTO.owners = [];
        createTicketDTO.owners.push(reqUser);
      }

      if (
        'owners' in createTicketDTO &&
        !createTicketDTO.owners.includes(reqUser)
      ) {
        createTicketDTO.owners.push(req.user as string);
      }

      const ticket = await this.ticketService.createTicket(createTicketDTO);
      return response.status(HttpStatus.OK).json(ticket);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }

  /*
  Fetches all tickets for user
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
  @Put(':id')
  async updateTicket(
    @Param() params,
    @Res() response: Response,
    @Body() updateTicket,
  ): Promise<any> {
    try {
      const { id } = params;
      const ticket = await this.ticketService.updateTicket(id, updateTicket);
      return response.status(HttpStatus.OK).json(ticket);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/closed/generatepdf')
  async closeIt(@Res() response: Response): Promise<any> {
    try {
      const tickets = await this.ticketService.generateClosedTicketsInCSVFormat();
      if (tickets) {
        response.set({
          'Content-Disposition': 'attachment; filename=report.csv',
          'Content-Length': tickets.length,
        });

        return response.end(tickets);
      }
      return response.send();
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }
}
