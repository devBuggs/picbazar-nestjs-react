import { CreateQuestionInput } from './create-question.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionInput extends PartialType(CreateQuestionInput) {}
