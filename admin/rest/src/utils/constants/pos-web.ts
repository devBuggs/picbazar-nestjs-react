
const unitOptions = [
    {label: "inch", value: "inch"},
    {label: "mm", value: "mm"},
    {label: "cm", value: "cm"},
    {label: "gram", value: "gram"},
    {label: "kg", value: "kg"},
    {label: "nos", value: "nos"}
];

const existingProduct = {
    barcodeNo: 55660099,
    productName: "Dummy Product 001",
    supplierName: "Bhagwan Singh",
    designNumber: 56020001,
    sizeWeight: 10,
    sizeWeightUnit: { label: "inch", value: "inch" },
    brandManufacturer: "Ecorpin Corp",
    draft: false,
    status: false,
    availableQuantity: 5,
    purchasePrice: 1500,
    salePrice: 500
}

const newProduct = {
    barcodeNo: 55660022,
    productName: null,
    supplierName: null,
    designNumber: null,
    sizeWeight: null,
    sizeWeightUnit: { label: "inch", value: "inch" },
    brandManufacturer: null,
    draft: false,
    status: false,
    availableQuantity: null,
    purchasePrice: null,
    salePrice: null
}

const existingWebProduct = {
    barcodeNo: 999990,
    productGalleryImage: "demo/demo.jpg",
    productMediaItems: ['demo/demo.jpg'],
    productName: "New web product",
    productDescription: "New dummy product",
    productSizeWeight: 9,
    productSizeWeightUnit: "inch",
    supplierName: "Sunny Shewatabh",
    designNumber: 12345,
    width: 5,
    height: 5,
    brandMenufacturer: "Ecorpin Corp.",
    availableQuantity: 12,
    productQuantityUnit: "nos",
    purchasePrice: 1099,
    salePrice: 999,
    tags: "ecorpin",
    variationFg: false,
    variationData: {},
    category: "new",
}

const newWebProduct = {
    barcodeNo: 55660022,
    // productGalleryImage: null,
    // productMediaItems: null,
    productName: null,
    supplierName: null,

    productDescription: null,
    productSizeWeight: null,
    productSizeWeightUnit: { label: "inch", value: "inch" },
    designNumber: null,
    width: null,
    height: null,
    brandMenufacturer: null,
    availableQuantity: null,
    productQuantityUnit: { label: "nos", value: "nos" },
    purchasePrice: null,
    salePrice: null,
    tags: null,
    variationFg: false,
    variationData: false,
    category: null,
}

export {
    unitOptions,
    newProduct,
    existingProduct,
    newWebProduct,
    existingWebProduct
}





















