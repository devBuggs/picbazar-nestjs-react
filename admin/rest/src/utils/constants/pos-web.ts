
const unitOptions = [
    {label: "inch", value: "inch"},
    {label: "mm", value: "mm"},
    {label: "cm", value: "cm"},
    {label: "gm", value: "gm"},
    {label: "kg", value: "kg"},
    {label: "NOS", value: "nos"}
];

const existingProduct = {
    barcodeNo: Date.now(),
    productName: "Dummy Product 001",
    supplierName: "Bhagwan Singh",
    designNumber: 56020001,
    sizeWeight: 10,
    sizeWeightUnit: {label: "gm", value: "gm"},
    availableQuantity: 5,
    purchasePrice: 1500,
    salePrice: 500
}

const newProduct = {
    barcodeNo: Date.now(),
    productName: "New product",
    supplierName: "New supplier",
    designNumber: 0,
    sizeWeight: 0,
    sizeWeightUnit: {label: "mm", value: "mm"},
    availableQuantity: 1,
    purchasePrice: 0,
    salePrice: 0
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
    barcodeNo: 999990,
    productGalleryImage: "demo/demo.jpg",
    productMediaItems: [],
    productName: "New Product",
    productDescription: "A dummy product.",
    productSizeWeight: 10,
    productSizeWeightUnit: "inch",
    supplierName: "needyHub Pvt. Ltd.",
    designNumber: 105,
    width: 12,
    height: 12,
    brandMenufacturer: "NeedyHub",
    availableQuantity: 21,
    productQuantityUnit: "nos",
    purchasePrice: 999,
    salePrice: 995,
    tags: "needyHub",
    variationFg: false,
    variationData: {},
    category: "Showpeace",
}

export {
    unitOptions,
    newProduct,
    existingProduct,
    newWebProduct,
    existingWebProduct
}





















