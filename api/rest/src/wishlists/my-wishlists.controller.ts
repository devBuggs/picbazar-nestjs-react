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
import { MyWishlistService } from './my-wishlists.service';

@Controller('my-wishlists')
export class MyWishlistsController {
  constructor(private myWishlistService: MyWishlistService) {}

  // Get All
  @Get()
  findAll(@Query() query: GetWishlistDto) {
    return this.myWishlistService.findAMyWishlists(query);
  }
  // Get single
  @Get(':id')
  find(@Param('id') id: string) {
    return this.myWishlistService.findAMyWishlist(+id);
  }

  // create
  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.myWishlistService.create(createWishlistDto);
  }

  // update
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.myWishlistService.update(+id, updateWishlistDto);
  }

  // delete
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.myWishlistService.delete(+id);
  }
}
