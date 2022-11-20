import { Expose } from 'class-transformer';

export class ResponseUserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  role: string;
}
