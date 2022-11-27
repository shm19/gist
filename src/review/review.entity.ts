import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Repo } from '../repos/repo.entity';
import { User } from '../users/user.entity';
import { ReviewRepository } from './review.repository';

@Entity({ customRepository: () => ReviewRepository })
export class Review {
  EntityRepositoryType?: ReviewRepository;

  constructor(message: string, user: User, repo: Repo) {
    this.message = message;
    this.user = user;
    this.repo = repo;
  }

  @PrimaryKey()
  id: number;

  @Property()
  message: string;

  @Property({ onCreate: () => new Date() })
  date: Date;

  // ownwer side
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Repo)
  repo: Repo;
}
