import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class ProjectImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  type: 'material' | 'accessory';

  @Column()
  title: string;

  @ManyToOne(() => Project, project => project.images, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  project: Project;
} 