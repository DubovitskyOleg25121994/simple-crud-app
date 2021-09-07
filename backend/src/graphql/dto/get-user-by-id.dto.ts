import {
  Field, ArgsType, ID,
} from 'type-graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class UserIdDto {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string
}
