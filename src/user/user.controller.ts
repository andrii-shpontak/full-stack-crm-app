import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

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

  @Get('get-user/:id')
  async getUser(@Param('id') id: number) {
    return await this.userModel.findByPk(id);
  }
}
