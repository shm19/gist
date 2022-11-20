import { IsEmpty, IsString } from 'class-validator';

export class UpdateRepoDto {
  @IsEmpty()
  @IsString()
  name: string;

  @IsEmpty()
  @IsString()
  content: string;
}
