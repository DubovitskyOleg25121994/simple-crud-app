import { Field, InputType } from 'type-graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Field()
    @IsString()
    @IsNotEmpty()
    name: string
}
