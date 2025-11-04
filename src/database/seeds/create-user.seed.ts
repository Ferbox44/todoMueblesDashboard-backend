import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/entities/user.entity';

export async function createTestUser(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);

  // Check if user already exists
  const existingUser = await userRepository.findOne({
    where: { email: 'test@example.com' }
  });

  if (existingUser) {
    console.log('Test user already exists');
    return;
  }

  // Create new user
  const hashedPassword = await bcrypt.hash('123456', 10);
  const user = userRepository.create({
    email: 'fernando@gmail.com',
    name: 'Fernando',
    password: hashedPassword
  });

  await userRepository.save(user);
  console.log('Test user created successfully');
} 