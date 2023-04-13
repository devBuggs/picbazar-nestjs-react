import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from '../entities/category.entity';
import { Attachment } from 'src/common/entities/attachment.entity';
import { Type } from 'src/types/entities/type.entity';
import { Product } from 'src/products/entities/product.entity';

export type CategoriesDocument = Categories & Document;

@Schema()
export class Categories {
    @Prop()
    name: string;

    @Prop()
    slug: string;

    @Prop()
    parent?: Category;

    @Prop({ type: Array<Category> })
    children?: Category[];

    @Prop()
    details?: string;

    @Prop({ type: Attachment })
    image: Attachment;

    @Prop()
    icon?: string;

    @Prop({ type: Type })
    type?: Type

    @Prop({ type: Array<Product> })
    products: Product[];

    @Prop()
    language: string;

    @Prop({ type: Array<String> })
    translated_languages: string[];
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);