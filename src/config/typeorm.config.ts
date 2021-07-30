import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { User } from '../user.entity';
const config: MongoConnectionOptions = {
  type: 'mongodb',
  host: 'localhost',
  database: 'nestjs',
  port: 27017,
  entities: [User],
  synchronize: true,
};

export default config;
