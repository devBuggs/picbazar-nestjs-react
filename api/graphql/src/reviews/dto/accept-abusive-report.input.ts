import { InputType, OmitType } from '@nestjs/graphql';
import { AbusiveReport } from '../entities/abusive-report.entity';

@InputType()
export class AcceptAbusiveReportInput extends OmitType(AbusiveReport, []) {}
