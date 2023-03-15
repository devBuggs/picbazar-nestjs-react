import { Injectable } from '@nestjs/common';
import { CreateFeedBackDto } from './dto/create-feedback.dto';
import { UpdateFeedBackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
  findAllFeedBacks() {
    return 'this route returns all feedbacks';
  }

  findFeedBack(id: number) {
    return `This action returns a #${id} feedback`;
  }

  create(createFeedBackDto: CreateFeedBackDto) {
    return 'This action adds a new feedback';
  }

  update(id: number, updateFeedbackDto: UpdateFeedBackDto) {
    return `This action updates a #${id} feedback`;
  }

  delete(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
