import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductsDocument = Products & Document;

@Schema()
export class Products {
    @Prop()
    barcode_no: number;

    @Prop()
    name: string;

    @Prop()
    slug: string;

    @Prop()
    description: string;

    @Prop()
    type_id: string;

    @Prop()
    price: string;

    @Prop()
    shop_id: string;

    @Prop()
    sale_price: string;

    @Prop()
    language: string;

    @Prop()
    min_price: string;

    @Prop()
    max_price: string;

    @Prop()
    sku: string;

    @Prop()
    quantity: string;

    @Prop()
    in_stock: string;

    @Prop()
    is_taxable: string;

    @Prop()
    shipping_class_id: string;

    @Prop()
    status: string;

    @Prop()
    product_type: string;

    @Prop()
    unit: string;

    @Prop()
    height: string;

    @Prop()
    width: string;

    @Prop()
    length: string;

    @Prop({ type: Object })
    image: object;

    @Prop({type: Array<Object>})
    video: any;

    @Prop({type: Array<Object>})
    gallery: Array<object>;

    @Prop()
    deleted_at: string; 

    @Prop()
    created_at: string; 

    @Prop()
    updated_at: string; 

    @Prop()
    author_id: string; 

    @Prop()
    manufacturer_id: string; 

    @Prop()
    is_digital: number; 

    @Prop()
    is_external: number; 

    @Prop()
    external_product_url: string; 

    @Prop()
    external_product_button_text: string; 

    @Prop()
    ratings: string; 

    @Prop()
    total_reviews: number; 

    @Prop({ type: Array<Object> })
    rating_count: any; 

    @Prop({type: Array<Object>})
    my_review: any;

    @Prop()
    in_wishlist: boolean;

    @Prop({type: Array<Object>})
    blocked_dates: any;

    @Prop({type: Array<Object>})
    translated_languages: any;

    @Prop({type: Array<Object>})
    categories: any;

    @Prop({type: Object})
    shop: object;

    @Prop({type: Object})
    type: any;

    @Prop({type: Array<Object>})
    variations: any;

    @Prop({type: Array<Object>})
    metas: any;

    @Prop({type: Array<Object>})
    manufacturer: any;

    @Prop({type: Array<Object>})
    variation_options: any;

    @Prop({type: Array<Object>})
    tags: any;

    @Prop({type: Array<Object>})
    author: any;

    @Prop()
    supplier_name: string;

    @Prop()
    design_number: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);