import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackInput } from './dto/create-feedback.input';
import { FeedbackService } from './feedback.service';

@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(private feedbackService: FeedbackService) {}

  @Mutation(() => Feedback)
  async createFeedback(
    @Args('input') createFeedbackInput: CreateFeedbackInput,
  ) {
    return this.feedbackService.createFeedback(createFeedbackInput);
  }
}
