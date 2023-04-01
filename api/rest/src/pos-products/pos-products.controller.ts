import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PosProductsService } from './pos-products.service';
import { CreatePosProductDto } from './dto/create-pos-product.dto';
import { UpdatePosProductDto } from './dto/update-pos-product.dto';

@Controller('pos-products')
export class PosProductsController {
  constructor(private readonly posProductsService: PosProductsService) {}

  @Post()
  create(@Body() createPosProductDto: CreatePosProductDto) {
    return this.posProductsService.create(createPosProductDto);
  }

  @Get()
  findAll() {
    return this.posProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.posProductsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePosProductDto: UpdatePosProductDto) {
    return this.posProductsService.update(id, updatePosProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.posProductsService.remove(id);
  }
}
