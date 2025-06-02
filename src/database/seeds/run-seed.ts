import { DataSource } from 'typeorm';
import { createTestUser } from './create-user.seed';
import { env } from '../../config/env';

const dataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  entities: ['src/**/*.entity.ts'],
  synchronize: true,
});

async function runSeed() {
  try {
    await dataSource.initialize();
    console.log('Database connection established');

    await createTestUser(dataSource);
    
    await dataSource.destroy();
    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error during seed:', error);
    process.exit(1);
  }
}

runSeed(); 