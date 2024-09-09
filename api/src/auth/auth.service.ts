import * as crypto from 'crypto';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import type { TLoginData } from 'src/common/types';
import { Op } from 'sequelize';

@Injectable()
export class AuthService {
  private readonly refreshTokens = new Map<string, string>();

  constructor(
    private jwtService: JwtService,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async login(user: TLoginData) {
    const validUser = await this.userModel.findOne({
      where: {
        [Op.or]: [{ email: user.username }, { phone: user.username }],
        password: user.password,
      },
    });

    if (!validUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: validUser.phone, sub: validUser.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = crypto.randomBytes(64).toString('hex');

    this.refreshTokens.set(validUser.id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user_id: validUser.id,
    };
  }

  async refreshToken(refreshToken: string) {
    const userId = [...this.refreshTokens.entries()].find(
      ([_, token]) => token === refreshToken,
    )?.[0];

    if (!userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload = { username: user.phone, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }
}
