import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { LandingPage } from './landing-page.entity';

@Entity('compare_section')
export class CompareSection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  beforeImage: string;

  @Column()
  afterImage: string;

  @Column({ nullable: true })
  title: string;

  @OneToOne(() => LandingPage, landingPage => landingPage.compareSection)
  @JoinColumn()
  landingPage: LandingPage;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 