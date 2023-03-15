import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlists.dto';
import { GetWishlistDto } from './dto/get-wishlists.dto';
import { UpdateWishlistDto } from './dto/update-wishlists.dto';
import { WishlistsService } from './wishlists.service';

@Controller('wishlists')
export class WishlistsController {
  constructor(private wishlistService: WishlistsService) {}

  // Get All
  @Get()
  findAll(@Query() query: GetWishlistDto) {
    return this.wishlistService.findAllWishlists(query);
  }
  // Get single
  @Get(':id')
  find(@Param('id') id: string) {
    return this.wishlistService.findWishlist(+id);
  }

  // create
  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

  // update
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistService.update(+id, updateWishlistDto);
  }

  // delete
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.wishlistService.delete(+id);
  }

  // wishlists/toggle
  @Post('/toggle')
  toggle(@Body() CreateWishlistDto: CreateWishlistDto) {
    return this.wishlistService.toggle(CreateWishlistDto);
  }
  // /in_wishlist/{product_id}
  @Get('/in_wishlist/:product_id')
  inWishlist(@Param('product_id') id: string) {
    return this.wishlistService.isInWishlist(+id);
  }
}
