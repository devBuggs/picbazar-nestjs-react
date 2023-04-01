import { Injectable } from '@nestjs/common';
import { CreatePosProductDto } from './dto/create-pos-product.dto';
import { UpdatePosProductDto } from './dto/update-pos-product.dto';

@Injectable()
export class PosProductsService {
  create(createPosProductDto: CreatePosProductDto) {
    return 'This action adds a new posProduct';
  }

  findAll() {
    return `This action returns all posProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} posProduct`;
  }

  update(id: number, updatePosProductDto: UpdatePosProductDto) {
    return `This action updates a #${id} posProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} posProduct`;
  }
}
