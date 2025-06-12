import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Service } from '../../landing-page/entities/service.entity';
import { Project } from './project.entity';

@Entity()
export class ServiceDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  backgroundImage: string;

  @OneToOne(() => Service)
  @JoinColumn()
  service: Service;

  @OneToMany(() => Project, project => project.serviceDetail, {
    cascade: true
  })
  projects: Project[];
} 