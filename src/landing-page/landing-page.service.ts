import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandingPage } from './entities/landing-page.entity';
import { Hero } from './entities/hero.entity';
import { Service } from './entities/service.entity';
import { Video } from './entities/video.entity';
import { CompareSection } from './entities/compare-section.entity';
import { Brand } from './entities/brand.entity';

@Injectable()
export class LandingPageService {
  constructor(
    @InjectRepository(LandingPage)
    private landingPageRepository: Repository<LandingPage>,
    @InjectRepository(Hero)
    private heroRepository: Repository<Hero>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
    @InjectRepository(CompareSection)
    private compareSectionRepository: Repository<CompareSection>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async getContent(): Promise<LandingPage> {
    // First try to find the first landing page
    let content = await this.landingPageRepository.findOne({
      where: {}, // This will find the first record
      relations: ['hero', 'services', 'videos', 'compareSection', 'brands'],
    });

    // If no landing page exists, create one
    if (!content) {
      content = await this.landingPageRepository.save(new LandingPage());
    }

    return content;
  }

  async updateHeroSection(heroData: Partial<Hero>): Promise<LandingPage> {
    const content = await this.getContent();
    
    if (content.hero) {
      await this.heroRepository.update(content.hero.id, heroData);
    } else {
      const hero = await this.heroRepository.save(heroData);
      content.hero = hero;
      await this.landingPageRepository.save(content);
    }

    return this.getContent();
  }

  async updateServicesCarousel(services: Partial<Service>[]): Promise<LandingPage> {
    const content = await this.getContent();
    
    // Remove existing services
    if (content.services?.length) {
      await this.serviceRepository.remove(content.services);
    }

    // Create new services
    const newServices = await this.serviceRepository.save(
      services.map(service => ({ ...service, landingPage: content }))
    );
    
    content.services = newServices;
    await this.landingPageRepository.save(content);

    return this.getContent();
  }

  async updateVideos(videos: Partial<Video>[]): Promise<LandingPage> {
    const content = await this.getContent();
    
    // Remove existing videos
    if (content.videos?.length) {
      await this.videoRepository.remove(content.videos);
    }

    // Create new videos
    const newVideos = await this.videoRepository.save(
      videos.map(video => ({ ...video, landingPage: content }))
    );
    
    content.videos = newVideos;
    await this.landingPageRepository.save(content);

    return this.getContent();
  }

  async updateCompareSection(compareData: Partial<CompareSection>): Promise<LandingPage> {
    const content = await this.getContent();
    
    if (content.compareSection) {
      await this.compareSectionRepository.update(content.compareSection.id, compareData);
    } else {
      const compareSection = await this.compareSectionRepository.save(compareData);
      content.compareSection = compareSection;
      await this.landingPageRepository.save(content);
    }

    return this.getContent();
  }

  async updateBrandsCarousel(brands: Partial<Brand>[]): Promise<LandingPage> {
    const content = await this.getContent();
    
    // Remove existing brands
    if (content.brands?.length) {
      await this.brandRepository.remove(content.brands);
    }

    // Create new brands
    const newBrands = await this.brandRepository.save(
      brands.map(brand => ({ ...brand, landingPage: content }))
    );
    
    content.brands = newBrands;
    await this.landingPageRepository.save(content);

    return this.getContent();
  }
} 