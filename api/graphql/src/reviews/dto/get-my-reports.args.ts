import {
  ArgsType,
  Field,
  ID,
  InputType,
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
import { AbusiveReport } from '../entities/abusive-report.entity';

@ObjectType()
export class MyReportPaginator {
  data: AbusiveReport[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetMyReportsArgs extends PaginationArgs {
  orderBy?: QueryMyReportsOrderByOrderByClause[];
  @Field(() => ID)
  product_id?: string;
  @Field(() => ID)
  shop_id?: string;
  rating?: number;
}

@InputType()
export class QueryMyReportsOrderByOrderByClause {
  column: QueryMyReportsOrderByColumn;
  order: SortOrder;
}

@InputType()
export class QueryMyReportsHasTypeWhereHasConditions extends WhereHasConditions {
  column: QueryMyReportsHasTypeColumn;
  AND?: QueryMyReportsHasTypeWhereHasConditions[];
  OR?: QueryMyReportsHasTypeWhereHasConditions[];
  HAS?: QueryMyReportsHasTypeWhereHasConditionsRelation;
}

@InputType()
export class QueryMyReportsHasTypeWhereHasConditionsRelation extends WhereGTEConditions {
  condition: QueryMyReportsHasTypeWhereHasConditions;
}

export enum QueryMyReportsOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  UPDATED_AT = 'UPDATED_AT',
}

registerEnumType(QueryMyReportsOrderByColumn, {
  name: 'QueryMyReportsOrderByColumn',
});

export enum QueryMyReportsHasTypeColumn {
  SLUG = 'SLUG',
}

registerEnumType(QueryMyReportsHasTypeColumn, {
  name: 'QueryMyReportsHasTypeColumn',
});
