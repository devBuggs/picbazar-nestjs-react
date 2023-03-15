import { InputType, PickType } from '@nestjs/graphql';
import { Feedback } from '../entities/feedback.entity';

@InputType()
export class CreateFeedbackInput extends PickType(Feedback, [
  'model_id',
  'model_type',
  'positive',
  'negative',
]) {}
