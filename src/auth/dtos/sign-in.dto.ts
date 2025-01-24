import { IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty({ message: 'The username is required' })
  username: string;

  @IsNotEmpty({ message: 'The password is required' })
  @MinLength(6)
  password: string;
}
