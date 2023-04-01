import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateWebProductDto } from './dto/create-web-product.dto';
import { UpdateWebProductDto } from './dto/update-web-product.dto';
import { WebProducts, WebProductsDocument } from './schema/web-product.schema';

@Injectable()
export class WebProductsService {

  constructor(@InjectModel(WebProducts.name) private readonly webproductsModel: Model < WebProductsDocument > ) {}

  async create(createWebProductDto: CreateWebProductDto): Promise < WebProductsDocument > {
    const webProduct = new this.webproductsModel(createWebProductDto);
    return webProduct.save();
  }

  
  async findAll(): Promise < WebProductsDocument[] > {
    return this.webproductsModel.find().exec();
  }

  async findOne(id: string) {
    let webObject = await this.webproductsModel.findById(id).exec();
    return webObject;
  }

  async update(id: string, updateWebProductDto: UpdateWebProductDto) {
    return this.webproductsModel.findByIdAndUpdate(id, updateWebProductDto);
  }

  async remove(id: string) {
    return this.webproductsModel.findByIdAndDelete(id);
  }
}
