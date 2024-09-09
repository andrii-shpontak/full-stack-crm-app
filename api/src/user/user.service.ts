import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async addUser(createUserDto: CreateUserDto) {
    console.log('start in services');
    const existingUser = await this.userModel.findOne({
      where: {
        [Op.or]: [
          { email: createUserDto.email },
          { phone: createUserDto.phone },
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email or phone already exists',
      );
    }

    return await this.userModel.create(createUserDto);
  }

  async getUser(id: number) {
    return await this.userModel.findByPk(id);
  }
}
