import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from '../users/user.entity';
import { RepoRepository } from './repo.repository';
import { File } from '../files/file.entity';
import { Review } from '../review/review.entity';
import { Tag } from '../tag/tag.entity';

@Entity({ customRepository: () => RepoRepository })
export class Repo {
  EntityRepositoryType?: RepoRepository;

  // @fixme: can i use public or private field here at constructor?
  constructor(name: string, content: string, isPublic?: boolean) {
    this.name = name;
    this.content = content;
    this.isPublic = isPublic ?? true;
  }

  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  content: string;

  @Property({ default: false })
  isPinned: boolean;

  @Property({ default: true })
  isPublic: boolean;

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

  // inverse side of the relationship
  @OneToMany(() => File, (file) => file.repo)
  files = new Collection<File>(this);

  @OneToMany(() => Review, (review) => review.repo)
  reviews = new Collection<Review>(this);

  @ManyToMany(() => Tag)
  tags = new Collection<Tag>(this);
}
