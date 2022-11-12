import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ReposController } from './repos/repos.controller';
import { ReposService } from './repos/repos.service';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsService } from './reviews/reviews.service';

@Module({
  imports: [],
  controllers: [UsersController, ReposController, ReviewsController],
  providers: [UsersService, ReposService, ReviewsService],
})
export class AppModule {}
