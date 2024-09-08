import { Controller, Get, Param, Post, UseGuards, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('api/v1')
export class UserController {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  @Post('add-user')
  async addUser(@Body() body: { name: string; email: string; phone: string }) {
    const user = await this.userModel.create(body);
    console.log('User added:', user);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-user/:id')
  async getUser(@Param('id') id: string) {
    return await this.userModel.findByPk(id);
  }
}
