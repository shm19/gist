import { IsEmpty, IsString } from 'class-validator';

export class CreateRepoDto {
  @IsEmpty()
  @IsString()
  name: string;

  @IsEmpty()
  @IsString()
  content: string;
}
