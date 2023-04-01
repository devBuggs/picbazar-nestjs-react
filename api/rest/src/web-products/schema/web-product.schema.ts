import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebProductsDocument = WebProducts & Document;

@Schema()
export class WebProducts {
    @Prop()
    barcodeNo: number;

    @Prop()
    productGAlleryImage:  string;

    @Prop()
    productMediaItems: Array<string>;

    @Prop()
    productName: string;

    @Prop()
    productDescription: string;

    @Prop()
    productSizeWeight: number;

    @Prop()
    productSizeWeightUnit: string

    @Prop()
    supplierName: string;

    @Prop()
    designNumber: number;

    @Prop()
    width: number;

    @Prop()
    height: number;

    @Prop()
    brandMenufacturer: string;

    @Prop()
    availableQuantity: number;

    @Prop()
    productQuantityUnit: string;

    @Prop()
    purchasePrice: number;

    @Prop()
    salePrice: number;

    @Prop()
    tags: string;

    @Prop()
    variationFg: boolean;

    @Prop({ type: Object })
    variationData:  object;

    @Prop()
    category: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const WebProductsSchema = SchemaFactory.createForClass(WebProducts);
