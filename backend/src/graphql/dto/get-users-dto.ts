import { Field, ArgsType, Int } from 'type-graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@ArgsType()
export class GetUsersDto {
    @Field(() => Int)
    @IsNumber()
    @IsNotEmpty()
    skip: number

    @Field(() => Int)
    @IsNumber()
    @IsNotEmpty()
    limit: number
}
