import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import Fuse from 'fuse.js';
import categoriesJson from '@db/categories.json';
import typesJson from '@db/types.json';
import { paginate } from 'src/common/pagination/paginate';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories, CategoriesDocument } from './schema/categories.schema';
import slugify from 'slugify';

const categories = plainToClass(Category, categoriesJson);
const storeType = typesJson[0];
const options = {
  keys: ['name', 'type.slug'],
  threshold: 0.3,
};
// const fuse = new Fuse(categories, options);

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Categories.name) private readonly categoriesModel: Model < CategoriesDocument > ) {}

  create(createCategoryDto: CreateCategoryDto) {
    var newCategory = new this.categoriesModel(createCategoryDto);
    return newCategory.save();
  }

  async getCategories(
    getCategoriesDto: GetCategoriesDto,
    products: any
  ) {
    var { limit, page, search, parent } = getCategoriesDto;
    if (!page) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    var categoriesDB : any =  await this.categoriesModel.find();
    var productsDB : any = products;

    if (categoriesDB.length > 0) {
      let children = []
      categoriesDB = await categoriesDB.map((item:any) => {
        const { _id, name, parent, details, image, icon, language } = item?._doc;

        console.log("parent ::== ", parent);

        if (parent){
          productsDB = productsDB.filter((item:any) => item.id === parent[0])
        }

        return {
          id: _id,
          name: name,
          slug: slugify(name.toLowerCase()),
          icon: icon,
          image: [image],
          details: details,
          language: language,
          translated_languages: [
            "en"
          ],
          parent: parent,
          type_id: 1,
          created_at: "2021-03-08T07:21:31.000000Z",
          updated_at: "2021-03-08T07:21:31.000000Z",
          deleted_at: null,
          parent_id: null,
          type: storeType,
          children: []
        }
      });
    }

    const mCategories = categories.concat(categoriesDB);
    const fuse = await new Fuse(mCategories, options);

    let data: Category[] = mCategories;
    
    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // data = data.filter((item) => item[key] === value);
        // data = await fuse.search(value)?.map(({ item }) => item);
        const searchResult = fuse.search(value);
        data = searchResult ? searchResult.map(({ item }) => item) : data;
      }
    }
    if (parent === 'null') {
      data = data.filter((item) => item.parent === null);
    }
    // if (text?.replace(/%/g, '')) {
    //   data = fuse.search(text)?.map(({ item }) => item);
    // }
    // if (hasType) {
    //   data = fuse.search(hasType)?.map(({ item }) => item);
    // }

    const results = data.slice(startIndex, endIndex);
    const url = `/categories?search=${search}&limit=${limit}&parent=${parent}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async findAll(): Promise < CategoriesDocument[] > {
    const category = await this.categoriesModel.find();
    return category
  }

  getCategory(param: string, language: string): Promise < CategoriesDocument[] > {
    const data = this.categoriesModel.find(
      (p:any) => p.id === Number(param) || p.slug === param,
    );
    return data;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesModel.findByIdAndUpdate(id, updateCategoryDto);
  }

  remove(id: string) {
    return this.categoriesModel.findByIdAndDelete(id);
  }
}
