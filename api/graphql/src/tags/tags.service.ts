import { Injectable } from '@nestjs/common';
import { paginate } from 'src/common/pagination/paginate';
import { CreateTagInput } from './dto/create-tag.input';
import { GetTagsArgs } from './dto/get-tags.args';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag } from './entities/tag.entity';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import tagsJson from './tags.json';
import { GetTagArgs } from './dto/get-tag.args';

const tags = plainToClass(Tag, tagsJson);
const options = {
  keys: ['name'],
  threshold: 0.3,
};
const fuse = new Fuse(tags, options);

@Injectable()
export class TagsService {
  private tags: Tag[] = tags;

  create({ type, ...createTagInput }: CreateTagInput) {
    const newTag = {
      id: this.tags.length + 1,
      slug: createTagInput.name,
      ...createTagInput,
      created_at: new Date(),
      updated_at: new Date(),
    };
    // TODO: Fix it
    // @ts-ignore
    this.tags.push(newTag);
    return newTag;
  }

  findAll({ text, first, page }: GetTagsArgs) {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: Tag[] = this.tags;
    if (text?.replace(/%/g, '')) {
      const formatText = text?.replace(/%/g, '');
      data = fuse.search(formatText)?.map(({ item }) => item);
    }
    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(this.tags.length, page, first, this.tags.length),
    };
  }

  findOne(getTagArgs: GetTagArgs) {
    return this.tags.find(
      (tag) => tag.id === Number(getTagArgs.id) || tag.slug === getTagArgs.slug,
    );
  }

  update(id: number, updateTagInput: UpdateTagInput) {
    return this.tags[0];
  }

  remove(id: number) {
    return this.tags[0];
  }
}
