import { Service } from 'typedi';

import { UpdateUserDto } from '../../graphql/dto/update-user.dto';
import UserModel from '../../database/schemas/user.schema';

@Service()
export class UsersRepository {
  getUserByID(id: string) {
    return UserModel.findById(id).exec();
  }

  getUsers(skip: number, limit: number) {
    return UserModel.find().limit(limit).skip(skip).sort({ _id: 1 })
      .exec();
  }

  getUserByEmail(email: string) {
    return UserModel.findOne({ email }).exec();
  }

  createUser(createUserDto) {
    return UserModel.create({ ...createUserDto });
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return UserModel.findOneAndUpdate({ _id: id }, { ...updateUserDto }, { new: true }).exec();
  }

  deleteUser(id: string) {
    return UserModel.findByIdAndDelete(id).exec();
  }
}
