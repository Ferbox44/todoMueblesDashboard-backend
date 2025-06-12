import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ServiceDetailsService } from './service-details.service';
import { ServiceDetail } from './entities/service-detail.entity';
import { Project } from './entities/project.entity';
import { ProjectImage } from './entities/project-image.entity';

@Controller('service-details')
export class ServiceDetailsController {
  constructor(private readonly serviceDetailsService: ServiceDetailsService) {}

  @Post(':serviceId')
  create(
    @Param('serviceId') serviceId: string,
    @Body() serviceDetail: Partial<ServiceDetail>,
  ): Promise<ServiceDetail> {
    return this.serviceDetailsService.create(serviceId, serviceDetail);
  }

  @Get(':serviceId')
  findByServiceId(@Param('serviceId') serviceId: string): Promise<ServiceDetail> {
    return this.serviceDetailsService.findByServiceId(serviceId);
  }

  @Put(':serviceId')
  update(
    @Param('serviceId') serviceId: string,
    @Body() serviceDetail: Partial<ServiceDetail>,
  ): Promise<ServiceDetail> {
    return this.serviceDetailsService.update(serviceId, serviceDetail);
  }

  @Delete(':serviceId')
  remove(@Param('serviceId') serviceId: string): Promise<void> {
    return this.serviceDetailsService.remove(serviceId);
  }

  @Post(':serviceId/projects')
  addProject(
    @Param('serviceId') serviceId: string,
    @Body() project: Partial<Project>,
  ): Promise<Project> {
    return this.serviceDetailsService.addProject(serviceId, project);
  }

  @Put('projects/:projectId')
  updateProject(
    @Param('projectId') projectId: string,
    @Body() project: Partial<Project>,
  ): Promise<Project> {
    return this.serviceDetailsService.updateProject(projectId, project);
  }

  @Delete('projects/:projectId')
  removeProject(@Param('projectId') projectId: string): Promise<void> {
    return this.serviceDetailsService.removeProject(projectId);
  }

  @Post('projects/:projectId/images')
  addProjectImage(
    @Param('projectId') projectId: string,
    @Body() image: Partial<ProjectImage>,
  ): Promise<ProjectImage> {
    return this.serviceDetailsService.addProjectImage(projectId, image);
  }

  @Delete('projects/images/:imageId')
  removeProjectImage(@Param('imageId') imageId: string): Promise<void> {
    return this.serviceDetailsService.removeProjectImage(imageId);
  }
} 