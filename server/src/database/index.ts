import { createConnections } from 'typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

createConnections([
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT) || 0,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: 'organizer',
    entities: [
      process.env.NODE_ENV === 'desenv'
        ? './src/models/*.ts'
        : './dist/models/*.js',
    ],
    migrations: [
      process.env.NODE_ENV === 'desenv'
        ? './src/database/migrations/*.ts'
        : './dist/database/migrations/*.js',
    ],
    cli: {
      migrationsDir:
        process.env.NODE_ENV === 'desenv'
          ? './src/database/migrations'
          : './dist/database/migrations',
    },
    namingStrategy: new SnakeNamingStrategy(),
    logging: true,
  },
]);
