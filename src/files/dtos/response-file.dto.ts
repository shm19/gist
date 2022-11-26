import { Expose } from 'class-transformer';

export class ResponseFileDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  extension: string;
}
