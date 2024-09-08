import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async addUser(body: { name: string; email: string; phone: string }) {
    return await this.userModel.create(body);
  }

  async getUser(id: number) {
    return await this.userModel.findByPk(id);
  }
}
