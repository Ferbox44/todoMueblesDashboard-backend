import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ServiceDetail } from './service-detail.entity';
import { ProjectImage } from './project-image.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => ServiceDetail, serviceDetail => serviceDetail.projects)
  @JoinColumn()
  serviceDetail: ServiceDetail;

  @OneToMany(() => ProjectImage, projectImage => projectImage.project, {
    cascade: true
  })
  images: ProjectImage[];
} 