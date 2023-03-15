import { Injectable } from '@nestjs/common';
import { CreateFeedbackInput } from './dto/create-feedback.input';

@Injectable()
export class FeedbackService {
  createFeedback(createFeedbackInput: CreateFeedbackInput) {
    return null;
  }
}
