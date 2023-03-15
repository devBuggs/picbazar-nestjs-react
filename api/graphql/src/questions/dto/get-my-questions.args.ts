import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { SortOrder } from 'src/common/dto/generic-conditions.input';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { PaginatorInfo } from 'src/common/dto/paginator-info.model';
import { Question } from '../entities/question.entity';
import { QueryQuestionsOrderByOrderByClause } from './get-questions.args';

@ObjectType()
export class MyQuestionPaginator {
  data: Question[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetMyQuestionsArgs extends PaginationArgs {
  orderBy?: QueryMyQuestionsOrderByOrderByClause[];
  @Field(() => ID)
  shop_id?: string;
  name?: string;
}

@InputType()
export class QueryMyQuestionsOrderByOrderByClause {
  column: QueryQuestionsOrderByOrderByClause;
  order: SortOrder;
}
