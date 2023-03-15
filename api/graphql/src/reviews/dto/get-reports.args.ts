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
export class ReportPaginator {
  data: AbusiveReport[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetReportsArgs extends PaginationArgs {
  orderBy?: QueryReportsOrderByOrderByClause[];
  @Field(() => ID)
  product_id?: string;
  @Field(() => ID)
  shop_id?: string;
  rating?: number;
}

@InputType()
export class QueryReportsOrderByOrderByClause {
  column: QueryReportsOrderByColumn;
  order: SortOrder;
}

@InputType()
export class QueryReportsHasTypeWhereHasConditions extends WhereHasConditions {
  column: QueryReportsHasTypeColumn;
  AND?: QueryReportsHasTypeWhereHasConditions[];
  OR?: QueryReportsHasTypeWhereHasConditions[];
  HAS?: QueryReportsHasTypeWhereHasConditionsRelation;
}

@InputType()
export class QueryReportsHasTypeWhereHasConditionsRelation extends WhereGTEConditions {
  condition: QueryReportsHasTypeWhereHasConditions;
}

export enum QueryReportsOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  UPDATED_AT = 'UPDATED_AT',
}

registerEnumType(QueryReportsOrderByColumn, {
  name: 'QueryReportsOrderByColumn',
});

export enum QueryReportsHasTypeColumn {
  SLUG = 'SLUG',
}

registerEnumType(QueryReportsHasTypeColumn, {
  name: 'QueryReportsHasTypeColumn',
});
