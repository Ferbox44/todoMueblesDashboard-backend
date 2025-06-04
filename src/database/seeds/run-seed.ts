import { DataSource } from 'typeorm';
import { createTestUser } from './create-user.seed';
import { ConfigService } from '@nestjs/config';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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