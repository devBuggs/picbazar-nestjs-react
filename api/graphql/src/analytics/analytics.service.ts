import { Injectable } from '@nestjs/common';
import analyticsJson from './analytics.json';
import { plainToClass } from 'class-transformer';
import { Analytics } from './entities/analytics.entity';

const analytics = plainToClass(Analytics, analyticsJson);

@Injectable()
export class AnalyticsService {
  private analytics = analytics;

  findAll() {
    return this.analytics;
  }
}
