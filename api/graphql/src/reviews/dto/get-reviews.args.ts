import {
  ArgsType,
  Field,
  ID,
  InputType, Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  SortOrder,
  WhereGTEConditions,
  WhereHasConditions,
} from 'src/common/dto/generic-conditions.input';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { PaginatorInfo } from 'src/common/dto/paginator-info.model';
import { Review } from '../entities/review.entity';
import { AbusiveReport } from '../entities/abusive-report.entity';

@ObjectType()
export class ReviewPaginator {
  data: Review[];
  paginatorInfo: PaginatorInfo;
  abusive_reports?: AbusiveReport[];
}

@ArgsType()
export class GetReviewsArgs extends PaginationArgs {
  orderBy?: QueryReviewsOrderByOrderByClause[];
  @Field(() => ID)
  product_id?: string;
  @Field(() => ID)
  shop_id?: string;
  rating?: number;
}

@InputType()
export class QueryReviewsOrderByOrderByClause {
  column: QueryReviewsOrderByColumn;
  order: SortOrder;
}

@InputType()
export class QueryReviewsHasTypeWhereHasConditions extends WhereHasConditions {
  column: QueryReviewsHasTypeColumn;
  AND?: QueryReviewsHasTypeWhereHasConditions[];
  OR?: QueryReviewsHasTypeWhereHasConditions[];
  HAS?: QueryReviewsHasTypeWhereHasConditionsRelation;
}

@InputType()
export class QueryReviewsHasTypeWhereHasConditionsRelation extends WhereGTEConditions {
  condition: QueryReviewsHasTypeWhereHasConditions;
}

export enum QueryReviewsOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  UPDATED_AT = 'UPDATED_AT',
  RATING = 'RATING',
}

registerEnumType(QueryReviewsOrderByColumn, {
  name: 'QueryReviewsOrderByColumn',
});

export enum QueryReviewsHasTypeColumn {
  SLUG = 'SLUG',
}

registerEnumType(QueryReviewsHasTypeColumn, {
  name: 'QueryReviewsHasTypeColumn',
});
