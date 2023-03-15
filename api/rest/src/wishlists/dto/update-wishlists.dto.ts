import { PartialType } from '@nestjs/swagger';
import { CreateWishlistDto } from './create-wishlists.dto';

export class UpdateWishlistDto extends PartialType(CreateWishlistDto) {}
