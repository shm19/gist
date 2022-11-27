import { File } from './files/file.entity';
import { Repo } from './repos/repo.entity';
import { Review } from './review/review.entity';
import { User } from './users/user.entity';

export default {
  entities: [User, Repo, File, Review], // no need for `entitiesTs` this way
  type: 'sqlite',
  dbName: 'db.sqlite',
  debug: true,
};
