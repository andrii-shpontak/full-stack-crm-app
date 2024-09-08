import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users = [
    { username: 'admin', password: 'admin', userId: '1' },
  ];

  constructor(private jwtService: JwtService) {}

  async login(user: { username: string; password: string }) {
    const validUser = this.users.find(
      (u) => u.username === user.username && u.password === user.password,
    );

    if (!validUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: validUser.username, sub: validUser.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
