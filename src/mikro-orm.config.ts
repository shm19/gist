import { Repo } from './repos/repo.entity';
import { User } from './users/user.entity';

export default {
  entities: [User, Repo], // no need for `entitiesTs` this way
  type: 'sqlite',
  dbName: 'db.sqlite',
  debug: true,
};
