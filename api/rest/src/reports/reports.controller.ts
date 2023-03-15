import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('my-reports')
export class ReportsController {
  constructor(private myReportService: ReportsService) {}

  // Get All
  @Get()
  findAll() {
    return this.myReportService.findMyReports();
  }
}
