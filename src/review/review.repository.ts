import { EntityRepository } from '@mikro-orm/sqlite';
import { Review } from './review.entity';

export class ReviewRepository extends EntityRepository<Review> {}
