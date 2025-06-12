import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceDetail } from './entities/service-detail.entity';
import { Service } from '../landing-page/entities/service.entity';
import { Project } from './entities/project.entity';
import { ProjectImage } from './entities/project-image.entity';

@Injectable()
export class ServiceDetailsService {
  constructor(
    @InjectRepository(ServiceDetail)
    private serviceDetailRepository: Repository<ServiceDetail>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(ProjectImage)
    private projectImageRepository: Repository<ProjectImage>,
  ) {}

  async create(serviceId: string, serviceDetail: Partial<ServiceDetail>): Promise<ServiceDetail> {
    const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
    if (!service) {
      throw new Error('Service not found');
    }

    const newServiceDetail = this.serviceDetailRepository.create({
      ...serviceDetail,
      service,
    });

    return this.serviceDetailRepository.save(newServiceDetail);
  }

  async findByServiceId(serviceId: string): Promise<ServiceDetail> {
    const detail = await this.serviceDetailRepository.findOne({
      where: { service: { id: serviceId } },
      relations: ['service', 'projects', 'projects.images'],
    });
    
    if (!detail) {
      const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
      if (!service) {
        throw new Error('Service not found');
      }
      
      const newDetail = this.serviceDetailRepository.create({
        title: service.title,
        subtitle: '',
        backgroundImage: '',
        service,
        projects: []
      });
      
      return this.serviceDetailRepository.save(newDetail);
    }
    
    return detail;
  }

  async update(serviceId: string, serviceDetail: Partial<ServiceDetail>): Promise<ServiceDetail> {
    const existingDetail = await this.findByServiceId(serviceId);
    if (!existingDetail) {
      return this.create(serviceId, serviceDetail);
    }

    Object.assign(existingDetail, serviceDetail);
    return this.serviceDetailRepository.save(existingDetail);
  }

  async remove(serviceId: string): Promise<void> {
    const serviceDetail = await this.findByServiceId(serviceId);
    if (serviceDetail) {
      await this.serviceDetailRepository.remove(serviceDetail);
    }
  }

  async addProject(serviceId: string, project: Partial<Project>): Promise<Project> {
    const serviceDetail = await this.findByServiceId(serviceId);
    const newProject = this.projectRepository.create({
      ...project,
      serviceDetail,
    });
    return this.projectRepository.save(newProject);
  }

  async updateProject(projectId: string, project: Partial<Project>): Promise<Project> {
    const existingProject = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['images'],
    });
    if (!existingProject) {
      throw new Error('Project not found');
    }

    Object.assign(existingProject, project);
    return this.projectRepository.save(existingProject);
  }

  async removeProject(projectId: string): Promise<void> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['images'],
    });
    if (project) {
      await this.projectRepository.remove(project);
    }
  }

  async addProjectImage(projectId: string, image: Partial<ProjectImage>): Promise<ProjectImage> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new Error('Project not found');
    }

    const newImage = this.projectImageRepository.create({
      ...image,
      project,
    });
    return this.projectImageRepository.save(newImage);
  }

  async removeProjectImage(imageId: string): Promise<void> {
    const image = await this.projectImageRepository.findOne({
      where: { id: imageId },
    });
    if (image) {
      await this.projectImageRepository.remove(image);
    }
  }
} 