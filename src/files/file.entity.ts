import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Repo } from '../repos/repo.entity';
import { FileRepository } from './file.repository';

@Entity({ customRepository: () => FileRepository })
export class File {
  EntityRepositoryType?: FileRepository;

  constructor(name: string, extension: string, number: number, repo: Repo) {
    this.name = name;
    this.extension = extension;
    this.number = number;
    this.repo = repo;
  }

  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  extension: string;

  @Property()
  number: number;

  // owner side of the relationship
  @ManyToOne(() => Repo)
  repo: Repo;
}
