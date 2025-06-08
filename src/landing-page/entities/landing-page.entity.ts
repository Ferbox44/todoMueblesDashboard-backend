import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { Hero } from './hero.entity';
import { Service } from './service.entity';
import { Video } from './video.entity';
import { CompareSection } from './compare-section.entity';
import { Brand } from './brand.entity';

@Entity('landing_page')
export class LandingPage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Hero, hero => hero.landingPage)
  hero: Hero;

  @OneToMany(() => Service, service => service.landingPage)
  services: Service[];

  @OneToMany(() => Video, video => video.landingPage)
  videos: Video[];

  @OneToOne(() => CompareSection, compareSection => compareSection.landingPage)
  compareSection: CompareSection;

  @OneToMany(() => Brand, brand => brand.landingPage)
  brands: Brand[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 