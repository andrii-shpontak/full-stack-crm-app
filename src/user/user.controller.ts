import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/v1')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('add-user')
  async addUser(@Body() body: { name: string; email: string; phone: string }) {
    const user = await this.userService.addUser(body);
    console.log('User added:', user);
    return user;
  }

  @Get('get-user/:id')
  async getUser(@Param('id') id: number) {
    return await this.userService.getUser(id);
  }
}
