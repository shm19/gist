import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignInUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*/, {
    message: 'password is too weak',
  })
  password: string;
}
