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
import { MyQuestionsService } from './my-questions.service';

@Controller('my-questions')
export class MyQuestionsController {
  constructor(private myQuestionService: MyQuestionsService) {}
  // show all
  // TODO: there is a bug in displaying all questions
  // In product single page front-end all the questions apperaed. It should be based on product ID.
  @Get()
  findAll(@Query() query: GetQuestionDto) {
    return this.myQuestionService.findMyQuestions(query);
  }
  // show one
  @Get(':id')
  find(@Param('id') id: string) {
    return this.myQuestionService.findMyQuestion(+id);
  }
  // create
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.myQuestionService.create(createQuestionDto);
  }

  // update
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.myQuestionService.update(+id, updateQuestionDto);
  }

  // delete
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.myQuestionService.delete(+id);
  }
}
