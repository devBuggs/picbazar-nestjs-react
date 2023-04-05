export class WebProduct {
    barcodeNo: number;
    productGAlleryImage:  object;
    productMediaItems: Array<object>;
    productName: string;
    productDescription: string;
    productSizeWeight: number;
    productSizeWeightUnit: object
    supplierName: string;
    designNumber: number;
    brandMenufacturer: string;
    availableQuantity: number;
    productQuantityUnit: string;
    purchasePrice: number;
    salePrice: number;
    tags: string;
    variationFg: boolean;
    variationData:  object;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}