import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const portPostgres = process.env.DB_PORT_POSTGRES as number | undefined;

export const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: portPostgres,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [
        './src/modules/**/infra/typeorm/entities/*.ts',
        './src/modules/**/infra/typeorm/entities/*.js',
    ],
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    extra: {
        cli: {
            migrationsDir: './src/shared/infra/typeorm/migrations',
        },
    },
    synchronize: true,
    logging: true,
});

PostgresDataSource.initialize()
    .then(() => {
        console.log('PostgresDataSource has been initialized!');
    })
    .catch(err => {
        console.error('Error during PostgresDataSource initialization', err);
    });
