import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import reportJSON from '@db/reports.json';
import { MyReports } from './entities/report.entity';
const myReports = plainToClass(MyReports, reportJSON);

@Injectable()
export class ReportsService {
  private myReports: MyReports[] = myReports;

  findMyReports() {
    return {
      data: myReports,
    };
  }
}
