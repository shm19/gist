import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRepoDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
