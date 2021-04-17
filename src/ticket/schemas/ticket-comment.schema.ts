import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type TickcetCommentDocument = TicketComment & Document;

export class TicketComment {
  @Prop({
    type: String,
  })
  text: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  by: User;
}
