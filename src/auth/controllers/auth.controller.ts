import {
  Controller,
  Post,
  Req,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() response: Response) {
    try {
      const loggedInUser = await this.authService.login(req.user);
      return response.status(HttpStatus.OK).json(loggedInUser);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
