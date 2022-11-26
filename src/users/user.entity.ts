import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Repo } from '../repos/repo.entity';

import { UserRepository } from './user.repository';

@Entity({ customRepository: () => UserRepository })
export class User {
  [EntityRepositoryType]?: UserRepository;

  constructor(name: string, username: string, email: string, password: string) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
  }
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  // @todo: add role table and relationship
  @Property({ default: 'user' })
  role: string;

  @Property({ unique: true })
  username: string;

  @Property({ unique: true })
  email: string;

  @Property()
  password: string;

  // inverse side of the relationship
  @OneToMany(() => Repo, (repo) => repo.user)
  repos = new Collection<Repo>(this);

  @OneToMany(() => Repo, (repo) => repo.user)
  pinRepos = new Collection<Repo>(this);

  @ManyToMany(() => Repo)
  favorites = new Collection<Repo>(this);
}
