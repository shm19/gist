import { EntityRepository } from '@mikro-orm/sqlite';
import { File } from './file.entity';

export class FileRepository extends EntityRepository<File> {}
