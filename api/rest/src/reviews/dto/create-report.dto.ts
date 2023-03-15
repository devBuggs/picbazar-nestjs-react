import { OmitType } from '@nestjs/swagger';
import { Report } from '../entities/reports.entity';

export class CreateReportDto extends OmitType(Report, [
  'id',
  'created_at',
  'updated_at',
  'user',
]) {}
