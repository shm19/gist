import { Expose, Type } from 'class-transformer';
import { ResponseUserDto } from '../../users/dtos/response-user.dto';

export class ResponseRepoDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Type(() => ResponseUserDto)
  @Expose()
  user: ResponseUserDto;
}
