import { EntityRepository } from '@mikro-orm/sqlite';
import { Repo } from './repo.entity';

export class RepoRepository extends EntityRepository<Repo> {}
