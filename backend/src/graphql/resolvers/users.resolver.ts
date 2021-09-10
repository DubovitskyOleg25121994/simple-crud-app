import { Inject, Service } from 'typedi';
import {
  Query,
  Resolver,
  Args,
  Mutation,
  Arg,
} from 'type-graphql';

import { UsersServce } from '../../services/users.service';
import { User } from '../schemas/user.schema';
import { UsersPagination } from '../schemas/users-pagination.schema';
import { UserIdDto } from '../dto/get-user-by-id.dto';
import { GetUsersDto } from '../dto/get-users-dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Service()
@Resolver(() => User)
export class UsersResolver {
  constructor(@Inject() private readonly usersServce: UsersServce) {}

  @Query(() => User, { nullable: true, description: 'Get user by ID' })
  user(@Args() { id }: UserIdDto) {
    return this.usersServce.getUserByID(id);
  }

  @Query(() => UsersPagination, { description: 'Get all users', nullable: true })
  users(@Args() { skip, limit }: GetUsersDto) {
    return this.usersServce.getUsers(skip, limit);
  }

  @Mutation(() => User, { description: 'Create new user' })
  createUser(@Arg('input') createUserDto: CreateUserDto) {
    return this.usersServce.createUser(createUserDto);
  }

  @Mutation(() => User, { description: 'Update user by ID' })
  updateUser(@Args() { id }: UserIdDto, @Arg('input') updateUserDto: UpdateUserDto) {
    return this.usersServce.updateUser(id, updateUserDto);
  }

  @Mutation(() => User, { description: 'Remove user by ID' })
  deleteUser(@Args() { id }: UserIdDto) {
    return this.usersServce.deleteUser(id);
  }
}
