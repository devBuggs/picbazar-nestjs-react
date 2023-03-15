import { ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from '../../common/dto/pagination.args';

@ArgsType()
export class GetWishlistProductsArgs extends PaginationArgs {}
