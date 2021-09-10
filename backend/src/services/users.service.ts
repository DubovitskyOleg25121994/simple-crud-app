import { ApolloError } from 'apollo-server-express';
import { Service, Inject } from 'typedi';

import { UsersRepository } from '../database/repositories/users.repository';
import { CreateUserDto } from '../graphql/dto/create-user.dto';
import { UpdateUserDto } from '../graphql/dto/update-user.dto';

@Service()
export class UsersServce {
  constructor(@Inject() private readonly usersRepositiry: UsersRepository) {}

  getUserByID(id: string) {
    return this.usersRepositiry.getUserByID(id);
  }

  async getUsers(skip:number, limit:number) {
    const users = await this.usersRepositiry.getUsers(skip, limit);
    const userCount = await this.usersRepositiry.getUserCount();
    return {
      count: userCount,
      list: users,
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.usersRepositiry.getUserByEmail(email);
    if (user) {
      throw new ApolloError('User is already exist', '409');
    }
    return this.usersRepositiry.createUser(createUserDto);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (!this.isExistData(updateUserDto)) {
      return this.usersRepositiry.getUserByID(id);
    }
    const { email } = updateUserDto;
    if (email) {
      const user = await this.usersRepositiry.getUserByEmail(email);
      if (user) {
        throw new ApolloError('User is already exist', '409');
      }
    }
    return this.usersRepositiry.updateUser(id, updateUserDto);
  }

  async deleteUser(id: string) {
    const user = await this.usersRepositiry.getUserByID(id);
    if (!user) {
      throw new ApolloError('User is not exist', '404');
    }
    return this.usersRepositiry.deleteUser(id);
  }

  isExistData(updateUserDto: UpdateUserDto) {
    return Object.values(updateUserDto).length > 0;
  }
}
