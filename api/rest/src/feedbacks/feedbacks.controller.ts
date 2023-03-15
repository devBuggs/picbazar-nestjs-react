import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateFeedBackDto } from './dto/create-feedback.dto';
import { UpdateFeedBackDto } from './dto/update-feedback.dto';
import { FeedbackService } from './feedbacks.service';

@Controller('feedbacks')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Get()
  async findAll() {
    return this.feedbackService.findAllFeedBacks();
  }

  // get single feedback
  @Get(':id')
  find(@Param('id') id: number) {
    return this.feedbackService.findFeedBack(id);
  }

  // create a new feedback
  @Post()
  create(@Body() createFeedBackDto: CreateFeedBackDto) {
    return this.feedbackService.create(createFeedBackDto);
  }

  // update a feedback
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeedBackDto: UpdateFeedBackDto,
  ) {
    return this.feedbackService.update(+id, updateFeedBackDto);
  }

  // delete a feedback
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.feedbackService.delete(+id);
  }
}
