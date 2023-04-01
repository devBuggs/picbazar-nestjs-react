import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePosProductDto } from './dto/create-pos-product.dto';
import { UpdatePosProductDto } from './dto/update-pos-product.dto';
import { PosProducts, PosProductsDocument } from "./schema/pos-products.schema";

@Injectable()
export class PosProductsService {

  constructor(@InjectModel(PosProducts.name) private readonly posproductsModel: Model < PosProductsDocument> ) {}

  async create(createPosProductDto: CreatePosProductDto): Promise < PosProductsDocument > {
    const posProduct = new this.posproductsModel(createPosProductDto);
    return posProduct.save();
  }

  async findAll(): Promise < PosProductsDocument[] > {
    return this.posproductsModel.find().exec();
  }

  async findOne(id: string) {
    let posObject = await this.posproductsModel.findById(id).exec();
    return posObject;
  }

  async update(id: string, updatePosProductDto: UpdatePosProductDto) {
    return this.posproductsModel.findByIdAndUpdate(id, updatePosProductDto);
  }

  async remove(id: string) {
    return this.posproductsModel.findByIdAndDelete(id);
  }
}

