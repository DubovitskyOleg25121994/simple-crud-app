import { Field, Int, ObjectType } from 'type-graphql';

import { User } from './user.schema';

@ObjectType()
export class UsersPagination {
  @Field(() => [User])
  list: User[]

  @Field(() => Int)
  count: number
}
