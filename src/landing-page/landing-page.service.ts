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

  async getContent(): Promise<any> {
    // First try to find the first landing page
    let content = await this.landingPageRepository.findOne({
      where: {}, // This will find the first record
      relations: ['hero', 'services', 'videos', 'compareSection', 'brands'],
    });

    // If no landing page exists, create one
    if (!content) {
      content = await this.landingPageRepository.save(new LandingPage());
    }

    // Transform the data to match the frontend interface
    return {
      id: content.id,
        content: {
        hero: content.hero ? {
          logo: content.hero.logo || '',
          backgroundImage: content.hero.backgroundImage || '',
          mainTitle: content.hero.mainTitle || ''
        } : {
            logo: '',
            backgroundImage: '',
          mainTitle: ''
        },
        servicesCarousel: content.services?.map(service => ({
          id: service.id,
          title: service.title || '',
          image: service.image || '',
          link: service.link || ''
        })) || [],
        videos: content.videos?.map(video => ({
          id: video.id,
          url: video.url || '',
          title: video.title || '',
          description: video.description || ''
        })) || [],
        compareSection: content.compareSection ? {
          beforeImage: content.compareSection.beforeImage || '',
          afterImage: content.compareSection.afterImage || '',
          title: content.compareSection.title || ''
        } : {
            beforeImage: '',
            afterImage: '',
          title: ''
          },
        brandsCarousel: content.brands?.map(brand => ({
          id: brand.id,
          name: brand.name || '',
          logo: brand.logo || '',
          image: brand.image || ''
        })) || []
      },
      lastUpdated: content.updatedAt
    };
  }

  async updateHeroSection(heroData: Partial<Hero>): Promise<LandingPage> {
    const content = await this.landingPageRepository.findOne({
      where: {},
      relations: ['hero'],
    });

    if (!content) {
      throw new Error('No landing page found');
    }

    if (content.hero) {
      // Update existing hero
      await this.heroRepository.update(content.hero.id, heroData);
    } else {
      // Create new hero and associate it with the landing page
      const hero = this.heroRepository.create(heroData);
      hero.landingPage = content;
      await this.heroRepository.save(hero);
    }

    return this.getContent();
  }

  async updateServicesCarousel(services: Partial<Service>[]): Promise<LandingPage> {
    const content = await this.landingPageRepository.findOne({
      where: {},
      relations: ['services'],
    });

    if (!content) {
      throw new Error('No landing page found');
    }

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
    const content = await this.landingPageRepository.findOne({
      where: {},
      relations: ['compareSection'],
    });

    if (!content) {
      throw new Error('No landing page found');
    }

    if (content.compareSection) {
      // Update existing compare section
      await this.compareSectionRepository.update(content.compareSection.id, compareData);
    } else {
      // Create new compare section and associate it with the landing page
      const compareSection = this.compareSectionRepository.create({
        ...compareData,
        landingPage: content
      });
      await this.compareSectionRepository.save(compareSection);
    }

    return this.getContent();
  }

  async updateBrandsCarousel(brands: any[]): Promise<LandingPage> {
    const content = await this.landingPageRepository.findOne({
      where: {},
      relations: ['brands'],
    });

    if (!content) {
      throw new Error('No landing page found');
    }

    // Remove existing brands
    if (content.brands?.length) {
      await this.brandRepository.remove(content.brands);
    }

    // Create new brands
    const newBrands = await this.brandRepository.save(
      brands.map(brand => ({
        name: brand.name,
        logo: brand.logo || brand.image,
        image: brand.image,
        landingPage: content
      }))
    );
    
    content.brands = newBrands;
    await this.landingPageRepository.save(content);

    return this.getContent();
  }
} 