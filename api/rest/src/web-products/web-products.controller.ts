import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebProductsService } from './web-products.service';
import { ProductsService } from 'src/products/products.service';
import { CreateWebProductDto } from './dto/create-web-product.dto';
import { UpdateWebProductDto } from './dto/update-web-product.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { ProductType, ProductStatus } from 'src/products/entities/product.entity';
import slugify from 'slugify';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from 'src/products/schema/products.schema';

@Controller('web-products')
export class WebProductsController {
  constructor(
    private readonly webProductsService: WebProductsService,
    @InjectModel(Products.name) private readonly productsModel: Model<ProductsDocument>,
  ) {}


  @Post()
  async create(@Body() createWebProductDto: CreateWebProductDto) {
    const productService : any = new ProductsService(this.productsModel);

    const { name, description, type_id, price, shop_id, language, min_price, max_price, sku, quantity, 
      in_stock, is_taxable, status, product_type, unit, height, width,
      length, image, video, gallery, deleted_at, created_at, updated_at, author_id, manufacturer_id, is_digital, 
      is_external, external_product_url, external_product_button_text, ratings, total_reviews, rating_count, my_review,
      in_wishlist, blocked_dates, translated_languages, categories, shop, type, variations, metas, manufacturer, variation_options,
      tags, author, barcode_no, supplier_name, design_number
    } = createWebProductDto;

    // Create a new product using the data from the createWebProductDto
    const createProductDto: CreateProductDto = {
      name: String(name),
      description: String(description),
      type_id: type_id,
      price: parseInt(price),
      shop_id: shop_id,
      language: language,
      min_price: Number(min_price),
      max_price: Number(max_price),
      sku: sku,
      quantity: Number(quantity),
      in_stock: in_stock ? true : false,
      is_taxable: is_taxable ? true : false,
      // shipping_class_id: shipping_class_id,
      status: status === "draft" ? ProductStatus.DRAFT : ProductStatus.PUBLISH,
      product_type: product_type === "simple" ? ProductType.SIMPLE : ProductType.VARIABLE,
      unit: unit,
      height: height,
      width: width,
      length: length,
      image: { 
        id: image?.id,
        original: image?.original, 
        thumbnail: image?.thumbnail, 
        created_at: new Date(), 
        updated_at: new Date()
      },
      // video: video,
      gallery: gallery,
      // deleted_at: deleted_at,
      // created_at: created_at,
      // updated_at: updated_at,
      // author_id: author_id,
      // manufacturer_id: manufacturer_id,
      // is_digital: is_digital,
      // is_external: is_external,
      // external_product_url: external_product_url,
      // external_product_button_text: external_product_button_text,
      ratings: Number(ratings),
      // total_reviews: total_reviews,
      // rating_count: rating_count,
      my_review: my_review,
      in_wishlist: in_wishlist,
      // blocked_dates: blocked_dates,
      // translated_languages: translated_languages,
      categories: categories,
      // shop: shop,
      // type: type,
      variations: variations,
      // metas: metas,
      // manufacturer: manufacturer,
      variation_options: variation_options,
      tags: tags,
      // author: author,
      supplier_name: supplier_name,
      design_number: design_number,
      barcode_no: barcode_no
    };

    const newProduct = await productService.create(createProductDto);

    console.log("create api of products :: data :: ", newProduct);
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
