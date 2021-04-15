import { Controller, Post, Response, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(AuthGuard('local'))
  // @Post('/login')
  // async login(@Response() response: Response, @Request() request) {
  //   return request.user;

  //   try {
  //     const { user } = request;
  //     const result = await this.authService.login(user);
  //     return 
  //   } catch (error) {
  //     // return response.status(400).json('Invalid login');
  //   }
  // }
}
