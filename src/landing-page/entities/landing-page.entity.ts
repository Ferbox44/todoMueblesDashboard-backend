import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('landing_page')
export class LandingPage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb')
  content: {
    hero: {
      logo: string;
      backgroundImage: string;
      mainTitle: string;
    };
    servicesCarousel: Array<{
      id: string;
      title: string;
      image: string;
      link: string;
    }>;
    videos: Array<{
      id: string;
      url: string;
      title?: string;
      description?: string;
    }>;
    compareSection: {
      beforeImage: string;
      afterImage: string;
      title?: string;
    };
    brandsCarousel: Array<{
      id: string;
      name: string;
      logo: string;
      image: string;
    }>;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 