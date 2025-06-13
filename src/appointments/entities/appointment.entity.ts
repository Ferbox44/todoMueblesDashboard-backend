import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ default: 'pending' })
  status: string;

  @Column()
  projectType: string;

  @Column('jsonb')
  address: {
    street: string;
    number: string;
    zipCode: string;
    neighborhood: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 