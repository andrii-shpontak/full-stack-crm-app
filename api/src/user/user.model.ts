import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column
  name: string;

  @Unique
  @Column
  email: string;

  @Unique
  @Column
  phone: string;

  @Column
  password: string;
}
