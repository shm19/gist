import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { TagRepository } from './tag.repository';

@Entity({ customRepository: () => TagRepository })
export class Tag {
  EntityRepositoryType?: TagRepository;

  constructor(name: string) {
    this.name = name;
  }

  @PrimaryKey()
  id: number;

  @Property()
  name: string;
}
