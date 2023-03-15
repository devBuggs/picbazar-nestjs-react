import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class AbusiveReportService {
  findAllReports() {
    return 'this route returns all abusive report';
  }

  findReport(id: number) {
    return `This action returns a #${id} report`;
  }

  create(createReportDto: CreateReportDto) {
    return 'This action adds a new report';
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  delete(id: number) {
    return `This action removes a #${id} report`;
  }
}
