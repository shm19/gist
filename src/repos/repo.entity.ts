import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../users/user.entity';
import { RepoRepository } from './repo.repository';

@Entity({ customRepository: () => RepoRepository })
export class Repo {
  EntityRepositoryType?: RepoRepository;

  // @fixme: can i use public or private field here at constructor?
  constructor(name: string, content: string) {
    this.name = name;
    this.content = content;
  }

  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  content: string;

  @Property({ default: Date.now() })
  createdAt: Date;

  @Property({
    default: Date.now(),
    onUpdate: () => new Date(),
  })
  updatedAt: Date;

  // owner side of the relationship
  @ManyToOne(() => User)
  user: User;
}
