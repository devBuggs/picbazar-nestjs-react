import { InputType, OmitType } from '@nestjs/graphql';
import { Question } from '../entities/question.entity';

@InputType()
export class CreateQuestionInput extends OmitType(Question, [
  'id',
  'product',
  'user',
  'created_at',
  'updated_at',
]) {}
