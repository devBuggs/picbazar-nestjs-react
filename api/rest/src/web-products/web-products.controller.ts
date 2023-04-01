import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebProductsService } from './web-products.service';
import { CreateWebProductDto } from './dto/create-web-product.dto';
import { UpdateWebProductDto } from './dto/update-web-product.dto';

@Controller('web-products')
export class WebProductsController {
  constructor(private readonly webProductsService: WebProductsService) {}

  @Post()
  create(@Body() createWebProductDto: CreateWebProductDto) {
    return this.webProductsService.create(createWebProductDto);
  }

  @Get()
  findAll() {
    return this.webProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webProductsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebProductDto: UpdateWebProductDto) {
    return this.webProductsService.update(id, updateWebProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webProductsService.remove(id);
  }
}
