import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Question } from './entities/question.entity';
import { QuestionsService } from './questions.service';
import { CreateQuestionInput } from './dto/create-question.input';
import { GetQuestionsArgs, QuestionPaginator } from './dto/get-questions.args';
import { GetQuestionArgs } from './dto/get-question.args';
import { UpdateQuestionInput } from './dto/update-question.input';
import {
  GetMyQuestionsArgs,
  MyQuestionPaginator,
} from './dto/get-my-questions.args';
import { GetAllQuestionsArgs } from './dto/get-all-questions.args';

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(private readonly questionsService: QuestionsService) {}

  @Mutation(() => Question)
  createQuestion(@Args('input') createQuestionInput: CreateQuestionInput) {
    return this.questionsService.create(createQuestionInput);
  }

  @Query(() => QuestionPaginator, { name: 'all_questions' })
  getAllQuestions(@Args() getAllQuestionsArgs: GetQuestionsArgs) {
    return this.questionsService.findAll(getAllQuestionsArgs);
  }

  // Fix duplicate questions query
  @Query(() => QuestionPaginator, { name: 'questions' })
  getQuestions(@Args() getQuestionsArgs: GetQuestionsArgs) {
    return this.questionsService.findAll(getQuestionsArgs);
  }

  @Query(() => MyQuestionPaginator, { name: 'myQuestions' })
  getMyQuestions(
    @Args() getMyQuestionsArgs: GetMyQuestionsArgs,
  ): MyQuestionPaginator {
    return this.questionsService.getMyQuestions(getMyQuestionsArgs);
  }

  @Query(() => Question, { name: 'question', nullable: true })
  findOne(@Args() getQuestionArgs: GetQuestionArgs) {
    return this.questionsService.findOne(getQuestionArgs.id);
  }

  @Mutation(() => Question)
  updateQuestion(
    @Args('id', { type: () => ID }) id: number,
    @Args('input') updateQuestionInput: UpdateQuestionInput,
  ) {
    return this.questionsService.update(id, updateQuestionInput);
  }

  @Mutation(() => Question)
  deleteQuestion(@Args('id', { type: () => ID }) id: number) {
    return this.questionsService.remove(id);
  }
}
