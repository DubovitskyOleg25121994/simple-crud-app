import { Field, InputType } from 'type-graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateUserDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string
}
