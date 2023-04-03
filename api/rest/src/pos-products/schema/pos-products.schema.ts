import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PosProductsDocument = PosProducts & Document;

@Schema()
export class PosProducts {
    @Prop()
    barcodeNo: number;

    @Prop()
    productName: string;

    @Prop()
    supplierName: string;

    @Prop()
    designNumber: string;

    @Prop()
    sizeWeight: number;

    @Prop({ type: Object })
    sizeWeightUnit: object;

    @Prop()
    brandManufacturer: string;

    @Prop()
    status: boolean;

    @Prop()
    draft: boolean

    @Prop()
    availableQuantity: number;

    @Prop()
    purchasePrice: number;

    @Prop()
    salePrice: number;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const PosProductsSchema = SchemaFactory.createForClass(PosProducts);