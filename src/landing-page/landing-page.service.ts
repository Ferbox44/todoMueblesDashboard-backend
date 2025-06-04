import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandingPage } from './entities/landing-page.entity';

@Injectable()
export class LandingPageService {
  constructor(
    @InjectRepository(LandingPage)
    private landingPageRepository: Repository<LandingPage>
  ) {}

  async getContent(): Promise<LandingPage> {
    const content = await this.landingPageRepository.findOne({
      order: { updatedAt: 'DESC' }
    });

    if (!content) {
      // Create default content if none exists
      const defaultContent = this.landingPageRepository.create({
        content: {
          hero: {
            logo: '',
            backgroundImage: '',
            mainTitle: 'Welcome to Santino'
          },
          servicesCarousel: [],
          videos: [],
          compareSection: {
            beforeImage: '',
            afterImage: '',
            title: 'Before & After'
          },
          brandsCarousel: []
        }
      });
      return this.landingPageRepository.save(defaultContent);
    }

    return content;
  }

  async updateHeroSection(heroContent: LandingPage['content']['hero']): Promise<LandingPage> {
    const content = await this.getContent();
    content.content.hero = heroContent;
    return this.landingPageRepository.save(content);
  }

  async updateServicesCarousel(services: LandingPage['content']['servicesCarousel']): Promise<LandingPage> {
    const content = await this.getContent();
    content.content.servicesCarousel = services;
    return this.landingPageRepository.save(content);
  }

  async updateVideos(videos: LandingPage['content']['videos']): Promise<LandingPage> {
    const content = await this.getContent();
    content.content.videos = videos;
    return this.landingPageRepository.save(content);
  }

  async updateCompareSection(compareSection: LandingPage['content']['compareSection']): Promise<LandingPage> {
    const content = await this.getContent();
    content.content.compareSection = compareSection;
    return this.landingPageRepository.save(content);
  }

  async updateBrandsCarousel(brands: LandingPage['content']['brandsCarousel']): Promise<LandingPage> {
    const content = await this.getContent();
    content.content.brandsCarousel = brands;
    return this.landingPageRepository.save(content);
  }
} 