import { Injectable } from '@nestjs/common';
import { RepoRepository } from '../repos/repo.repository';
import { User } from '../users/user.entity';
import { Review } from './review.entity';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly repoRepository: RepoRepository,
  ) {}

  createReview(id: number, user: User, message: string) {
    const repo = this.repoRepository.getReference(id);
    const review = new Review(message, user, repo);
    this.reviewRepository.persistAndFlush(review);
    return review;
  }

  getReviews(id: number) {
    const reveiws = this.reviewRepository.find({ repo: id });
    return reveiws;
  }

  getMyReviews(user: User) {
    const reviews = this.reviewRepository.find({ user });
    return reviews;
  }

  async updateReview(id: number, message: string) {
    const review = this.reviewRepository.getReference(id);
    review.message = message;
    await this.reviewRepository.persistAndFlush(review);
    return review;
  }

  deleteReview(id: number) {
    const review = this.reviewRepository.getReference(id);
    this.reviewRepository.removeAndFlush(review);
  }
}
