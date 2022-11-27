import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Repo } from '../repos/repo.entity';
import { UserModule } from '../users/user.module';
import { ReviewController } from './review.controller';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

@Module({
  imports: [
    UserModule,
    MikroOrmModule.forFeature({ entities: [Review, Repo] }),
  ],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
