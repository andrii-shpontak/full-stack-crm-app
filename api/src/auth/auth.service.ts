import * as crypto from 'crypto';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users = [
    { username: 'admin', password: 'admin', userId: '1' },
  ];

  private readonly refreshTokens = new Map<string, string>();

  constructor(private jwtService: JwtService) {}

  async login(user: { username: string; password: string }) {
    const validUser = this.users.find(
      (u) => u.username === user.username && u.password === user.password,
    );

    if (!validUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: validUser.username, sub: validUser.userId };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = crypto.randomBytes(64).toString('hex');

    this.refreshTokens.set(validUser.userId, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    const userId = [...this.refreshTokens.entries()].find(
      ([_, token]) => token === refreshToken,
    )?.[0];

    if (!userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = this.users.find((u) => u.userId === userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload = { username: user.username, sub: user.userId };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }
}
