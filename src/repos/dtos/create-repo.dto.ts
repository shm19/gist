import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRepoDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsBoolean()
  // add enum
  isPublic: boolean;
}
