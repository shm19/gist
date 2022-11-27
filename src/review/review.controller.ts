import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { serialize } from 'src/interceptors/serialze.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ResponseReviewDto } from './dtos/response-review.dto';
import { ReviewService } from './review.service';

@UseInterceptors(serialize(ResponseReviewDto))
@UseGuards(AuthGuard('jwt'))
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('repos/:id')
  createReview(
    @Param('id') id: string,
    @Body('message') message: string,
    @CurrentUser() user: User,
  ) {
    return this.reviewService.createReview(Number.parseInt(id), user, message);
  }

  @Get('repos/:id')
  getReviews(@Param('id') id: string) {
    return this.reviewService.getReviews(Number.parseInt(id));
  }

  @Get()
  getMyReviews(@CurrentUser() user: User) {
    return this.reviewService.getMyReviews(user);
  }

  @Patch(':id')
  updateReview(@Param('id') id: string, @Body('message') message: string) {
    return this.reviewService.updateReview(Number.parseInt(id), message);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    return this.reviewService.deleteReview(Number.parseInt(id));
  }
}
