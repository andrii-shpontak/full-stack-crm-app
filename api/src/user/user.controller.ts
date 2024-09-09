import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { TUserData } from 'src/common/types';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/v1')
export class UserController {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  @Post('add-user')
  async addUser(@Body() body: CreateUserDto) {
    try {
      const user = await this.userModel.create(body);
      console.log('User added:', user);
      return user;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        const uniqueField = error.errors[0]?.path;
        const message = uniqueField
          ? `${uniqueField} must be unique`
          : 'Unique constraint error';
        throw new ConflictException(message);
      }
      console.error('Error adding user:', error);
      throw new BadRequestException('Error adding user'); // or handle other types of errors appropriately
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-user/:id')
  async getUser(@Param('id') id: string) {
    return await this.userModel.findByPk(id);
  }
}
