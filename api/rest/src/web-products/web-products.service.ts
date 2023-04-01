import { Injectable } from '@nestjs/common';
import { CreateWebProductDto } from './dto/create-web-product.dto';
import { UpdateWebProductDto } from './dto/update-web-product.dto';

@Injectable()
export class WebProductsService {
  create(createWebProductDto: CreateWebProductDto) {
    return 'This action adds a new webProduct';
  }

  findAll() {
    return `This action returns all webProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webProduct`;
  }

  update(id: number, updateWebProductDto: UpdateWebProductDto) {
    return `This action updates a #${id} webProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} webProduct`;
  }
}
