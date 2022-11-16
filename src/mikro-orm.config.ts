import { User } from './users/user.entity';

export default {
  entities: [User], // no need for `entitiesTs` this way
  type: 'sqlite',
  dbName: 'db.sqlite',
  debug: true,
};
