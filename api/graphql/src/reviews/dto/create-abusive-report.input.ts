import { InputType, OmitType } from '@nestjs/graphql';
import { AbusiveReport } from '../entities/abusive-report.entity';

@InputType()
export class CreateAbusiveReportInput extends OmitType(AbusiveReport, [
  'id',
  'created_at',
  'updated_at',
  'user',
]) {}
