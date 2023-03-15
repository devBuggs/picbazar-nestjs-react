import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { ReportsResolver } from './reports.resolver';

@Module({
  providers: [ReviewsResolver, ReviewsService, ReportsResolver],
})
export class ReviewsModule {}
