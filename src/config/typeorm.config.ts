import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { User } from '../user.entity';

let type;
switch (process.env.TYPEORM_CONNECTION) {
  case 'mysql':
    type = 'mysql';
    break;
  case 'postgres':
    type = 'postgres';
    break;
  case 'mongodb':
    type = 'mongodb';
    break;
  default:
    type = 'mongodb';
}

const config: MongoConnectionOptions = {
  type,
  host: process.env.HOST,
  database: process.env.DATABASE_NAME,
  port: +process.env.DATABASE_PORT,
  entities: [User],
  synchronize: true,
};

export default config;

// export default registerAs(
//   'database',
//   (): MongoConnectionOptions => ({
//     host: process.env.DATABASE_HOST,
//     port: +process.env.DATABASE_PORT || 5432,
//     type: 'mongodb',
//     entities: [User],
//     synchronize: true,
//   }),
// );
