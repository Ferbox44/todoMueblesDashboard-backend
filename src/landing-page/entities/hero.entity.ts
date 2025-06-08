import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { LandingPage } from './landing-page.entity';

@Entity('hero')
export class Hero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  logo: string;

  @Column()
  backgroundImage: string;

  @Column()
  mainTitle: string;

  @OneToOne(() => LandingPage, landingPage => landingPage.hero)
  @JoinColumn()
  landingPage: LandingPage;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 