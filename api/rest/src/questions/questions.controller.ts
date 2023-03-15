import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { GetQuestionDto } from './dto/get-questions.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './questions.service';

@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}
  // show all
  // TODO: there is a bug in displaying all questions
  // In product single page front-end all the questions apperaed. It should be based on product ID.
  @Get()
  findAll(@Query() query: GetQuestionDto) {
    return this.questionService.findAllQuestions(query);
  }
  // show one
  @Get(':id')
  find(@Param('id') id: string) {
    return this.questionService.findQuestion(+id);
  }
  // create
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  // update
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  // delete
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.questionService.delete(+id);
  }
}
