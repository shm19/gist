import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Repo } from '../repos/repo.entity';
import { FileRepository } from './file.repository';

@Entity({ customRepository: () => FileRepository })
export class File {
  EntityRepositoryType?: FileRepository;

  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  extension: string;

  // owner side of the relationship
  @ManyToOne(() => Repo)
  repo: Repo;
}
