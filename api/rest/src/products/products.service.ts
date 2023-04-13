import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto, ProductPaginator } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { paginate } from 'src/common/pagination/paginate';
import productsJson from '@db/products.json';
import Fuse from 'fuse.js';
import { GetPopularProductsDto } from './dto/get-popular-products.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument, ProductsSchema } from './schema/products.schema';
import slugify from 'slugify';

const products = plainToClass(Product, productsJson);

const options = {
  keys: [
    'name',
    'type.slug',
    'categories.slug',
    'status',
    'shop_id',
    'author.slug',
    'tags',
    'manufacturer.slug',
  ],
  threshold: 0.3,
};
const fuse = new Fuse(products, options);

@Injectable()
export class ProductsService {
  private products: any = products;
  
  constructor(@InjectModel(Products.name) private readonly productsModel: Model < ProductsDocument > ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = new this.productsModel(createProductDto);
    return newProduct.save();
  }

  async getProducts({ limit, page, search }: GetProductsDto) {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    var productsDB : any = await this.productsModel.find();

    if (productsDB.length > 0) {
      // TODO: body
      productsDB = await productsDB.map((item:any) => {
        const { _id, name, slug, description, type_id, price, shop_id, sale_price, language, min_price, max_price, sku, quantity, in_stock, is_taxable,  shipping_class_id, status, product_type,  unit,  height, width, length, image, video, gallery, deleted_at, created_at, updated_at, author_id, manufacturer_id, is_digital, is_external, external_product_url, external_product_button_text, ratings, total_reviews, rating_count, my_review, in_wishlist, blocked_dates, translated_languages, categories, shop, type, variations, metas, manufacturer, variation_options, tags, author, barcode_no, supplier_name, design_number } = item?._doc;

        return {
          id: _id,
          name: name, 
          slug: slug, 
          description: description,
          type_id: type_id, 
          price: price, 
          shop_id: shop_id, 
          sale_price: sale_price, 
          language: language, 
          min_price: min_price, 
          max_price: max_price, 
          sku: sku, 
          quantity: quantity, 
          in_stock: in_stock, 
          is_taxable: is_taxable, 
          shipping_class_id: shipping_class_id, 
          status: status, 
          product_type: product_type, 
          unit: unit, 
          height: height, 
          width: width, 
          length: length, 
          image: image, 
          video: video, 
          gallery: gallery, 
          deleted_at: deleted_at, 
          created_at: created_at, 
          updated_at: updated_at, 
          author_id: author_id, 
          manufacturer_id: manufacturer_id, 
          is_digital: is_digital, 
          is_external: is_external, 
          external_product_url: external_product_url, 
          external_product_button_text: external_product_button_text, 
          ratings: ratings, 
          total_reviews: total_reviews, 
          rating_count: rating_count, 
          my_review: my_review, 
          in_wishlist: in_wishlist, 
          blocked_dates: blocked_dates, 
          translated_languages: translated_languages, 
          categories: categories, 
          shop: shop, 
          type: type, 
          variations: variations, 
          metas: metas, 
          manufacturer: manufacturer, 
          variation_options: variation_options, 
          tags: tags, 
          author: author, 
          barcode_no: barcode_no, 
          supplier_name: supplier_name, 
          design_number: design_number
        }
      });
    }


    const mProducts = products.concat(productsDB);
    // console.log("mCategories :: ", mCategories);
    const fuse = await new Fuse(mProducts, options);

    let data: Product[] = mProducts;
    if (search) {
      const parseSearchParams = search.split(';');
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // TODO: Temp Solution
        if (key !== 'slug') {
          searchText.push({
            [key]: value,
          });
        }
      }

      data = fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/products?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async getProductBySlug(slug: string): Promise <Product> {
    var productsDB : any = await this.productsModel.find(); 

    if (productsDB.length > 0) {
      // TODO: body
      productsDB = await productsDB.map((item:any) => {
        const { _id, name, slug, description, type_id, price, shop_id, sale_price, language, min_price, max_price, sku, quantity, in_stock, is_taxable,  shipping_class_id, status, product_type,  unit,  height, width, length, image, video, gallery, deleted_at, created_at, updated_at, author_id, manufacturer_id, is_digital, is_external, external_product_url, external_product_button_text, ratings, total_reviews, rating_count, my_review, in_wishlist, blocked_dates, translated_languages, categories, shop, type, variations, metas, manufacturer, variation_options, tags, author, barcode_no, supplier_name, design_number } = item?._doc;

        return {
          id: _id,
          name: name, 
          slug: slug, 
          description: description,
          type_id: type_id, 
          price: price, 
          shop_id: shop_id, 
          sale_price: sale_price, 
          language: language, 
          min_price: min_price, 
          max_price: max_price, 
          sku: sku, 
          quantity: quantity, 
          in_stock: in_stock, 
          is_taxable: is_taxable, 
          shipping_class_id: shipping_class_id, 
          status: status, 
          product_type: product_type, 
          unit: unit, 
          height: height, 
          width: width, 
          length: length, 
          image: image, 
          video: video, 
          gallery: gallery, 
          deleted_at: deleted_at, 
          created_at: created_at, 
          updated_at: updated_at, 
          author_id: author_id, 
          manufacturer_id: manufacturer_id, 
          is_digital: is_digital, 
          is_external: is_external, 
          external_product_url: external_product_url, 
          external_product_button_text: external_product_button_text, 
          ratings: ratings, 
          total_reviews: total_reviews, 
          rating_count: rating_count, 
          my_review: my_review, 
          in_wishlist: in_wishlist, 
          blocked_dates: blocked_dates, 
          translated_languages: translated_languages, 
          categories: categories, 
          shop: shop, 
          type: type, 
          variations: variations, 
          metas: metas, 
          manufacturer: manufacturer, 
          variation_options: variation_options, 
          tags: tags, 
          author: author, 
          barcode_no: barcode_no, 
          supplier_name: supplier_name, 
          design_number: design_number
        }
      });
    }

    const mProducts = products.concat(productsDB);

    const product = mProducts.find((p) => p.slug === slug);
    const related_products = this.products
      .filter((p:any) => p.type.slug === product.type.slug)
      .slice(0, 20);
    return {
      ...product,
      related_products,
    };
  }

  getPopularProducts({ limit, type_slug }: GetPopularProductsDto): Product[] {
    let data: any = this.products;
    if (type_slug) {
      data = fuse.search(type_slug)?.map(({ item }) => item);
    }
    return data?.slice(0, limit);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productsModel.findByIdAndUpdate(id, updateProductDto);
  }

  remove(id: string) {
    return this.productsModel.findByIdAndDelete(id);
  }
}
