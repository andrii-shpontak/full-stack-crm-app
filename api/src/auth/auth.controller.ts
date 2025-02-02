import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { TLoginData } from 'src/common/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: TLoginData) {
    return this.authService.login(body);
  }

  @Post('refresh')
  async refreshToken(@Body() body: { refresh_token: string }) {
    return this.authService.refreshToken(body.refresh_token);
  }
}
