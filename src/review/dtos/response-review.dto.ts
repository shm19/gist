import { Expose } from 'class-transformer';

export class ResponseReviewDto {
  @Expose()
  id: number;

  @Expose()
  message: string;

  @Expose()
  date: Date;
}
