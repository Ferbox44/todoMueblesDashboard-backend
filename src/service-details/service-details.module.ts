import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceDetailsService } from './service-details.service';
import { ServiceDetailsController } from './service-details.controller';
import { ServiceDetail } from './entities/service-detail.entity';
import { Service } from '../landing-page/entities/service.entity';
import { Project } from './entities/project.entity';
import { ProjectImage } from './entities/project-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceDetail, Service, Project, ProjectImage])],
  controllers: [ServiceDetailsController],
  providers: [ServiceDetailsService],
  exports: [ServiceDetailsService],
})
export class ServiceDetailsModule {} 