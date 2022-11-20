import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRepoDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content?: string;
}
