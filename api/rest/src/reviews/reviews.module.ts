import { Module } from '@nestjs/common';
import { AbusiveReportsController } from './reports.controller';
import { AbusiveReportService } from './reports.service';
import { ReviewController } from './reviews.controller';
import { ReviewService } from './reviews.service';

@Module({
  controllers: [ReviewController, AbusiveReportsController],
  providers: [ReviewService, AbusiveReportService],
})
export class ReviewModule {}
