import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsResolver } from './questions.resolver';

@Module({
  providers: [QuestionsResolver, QuestionsService],
})
export class QuestionsModule {}
