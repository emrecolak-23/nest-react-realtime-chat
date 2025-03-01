import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  username: string;

  @Field()
  @IsStrongPassword()
  password: string;
}
