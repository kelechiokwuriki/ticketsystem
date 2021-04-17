import { User } from 'src/user/schemas/user.schema';
import { TicketStatus } from './schemas/ticket.schema';

export class CreateTicketDTO {
  text: string;
  owners: Array<string>;
  status: TicketStatus;
}
