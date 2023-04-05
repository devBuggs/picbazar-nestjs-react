import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebProductsDocument = WebProducts & Document;

@Schema()
export class WebProducts {
    @Prop()
    barcodeNo: number;

    @Prop({ type: Object })
    productGAlleryImage:  object;

    @Prop({ type: Array<Object>})
    productMediaItems: Array<object>;

    @Prop()
    productName: string;

    @Prop()
    productDescription: string;

    @Prop()
    productSizeWeight: number;

    @Prop({ type: Object })
    productSizeWeightUnit: object

    @Prop()
    supplierName: string;

    @Prop()
    designNumber: number;

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
