import { Module } from '@nestjs/common';
import { MyQuestionsController } from './my-questions.controller';
import { MyQuestionsService } from './my-questions.service';
import { QuestionController } from './questions.controller';
import { QuestionService } from './questions.service';

@Module({
  controllers: [QuestionController, MyQuestionsController],
  providers: [QuestionService, MyQuestionsService],
})
export class QuestionModule {}
