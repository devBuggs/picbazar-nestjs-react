import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import { useState } from 'react';
import Search from '@/components/common/search';
import { adminOnly } from '@/utils/auth-utils';
import WebForm from '@/components/posweb/web-form';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import JsBarcode from "jsbarcode";
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useRouter } from 'next/router';
import { generateBarcode } from '@/utils/common';
import { getWebProducts, createWebProduct, updateWebProduct, deleteWebProduct } from '@/assets/pos_web/api/webApis';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { unitOptions, newWebProduct } from '@/utils/constants/pos-web';
import slugify from 'slugify';

type FormValues = {
    barcodeNo: number;
    productImage:  any;
    productGallery: Array<any>;
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
};

export default function WebProductPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const [actionType] = useState(router?.query?.action);

    const [stateFlag, setStateFlag] = React.useState({ 
        actionType: router?.query?.action,
        editPosAction: router?.query?.action === 'edit' ? true : false,
        printBarcodeFg: false, 
        makeDuplicateFg: false,
        inputBarcodeRef: React.useRef(null),
        barcodeData: React.useRef(null),formData: {
            id: "",
            barcodeNo: null,
            productName: null,
            supplierName: null,
            designNumber: null,
            sizeWeight: null,
            sizeWeightUnit: {label: "inch", value: "inch"},
            availableQuantity: null,
            purchasePrice: null,
            salePrice: null,
            productImage: null,
            productGallery: null,
            status: false,
            draft: false
        }
    });
    const queryClient = useQueryClient();
    const newBarcodeNo = generateBarcode();
    const [defaultValues] = useState( actionType === "edit" ? stateFlag.formData : {...newWebProduct, barcodeNo: parseInt(newBarcodeNo)} );
    
    
    const { 
        register, 
        setValue, 
        handleSubmit, 
        formState: { errors },
        getValues,
        control, 
        watch
    } = useForm<FormValues>({ defaultValues }); 

    const {
        isLoading,
        isError,
        error,
        data: webProducts
    } = useQuery('getWebProducts', getWebProducts );

    const createWebProductMutation = useMutation(createWebProduct, {
        onSuccess: () => {
            // Invalidates the cache and refetch
            queryClient.invalidateQueries("getWebProducts");
        }
    })

    const updateWebProductMutation = useMutation(updateWebProduct, {
        onSuccess: () => {
            // Invalidates the cache and refetch
            queryClient.invalidateQueries("getWebProducts")
            // setStateFlag({...stateFlag, makeDuplicateFg: true});
        }
    });

    // working
    const createNewProduct = async (formData: FormValues) => {
        console.log("========== Create New Product ==========");
        console.log("form data :: ", formData);
        setStateFlag({...stateFlag, printBarcodeFg: true, formData: formData});
        
        if ( actionType === 'create' && (!stateFlag.editPosAction) ) {
            console.log("creating baarcode....")
            JsBarcode(stateFlag?.barcodeData?.current, formData?.barcodeNo, {
                format: 'CODE128',
                displayValue: true,
            });
    
            let newWebObject = {
                barcode_no: formData?.barcodeNo.toString(),
                name: formData?.productName,
                slug: slugify(formData?.productName),
                description: formData?.productName,
                type_id: 1,
                price: formData?.productName,
                shop_id: 1,
                sale_price: formData.salePrice,
                language: 1,
                min_price: formData.salePrice,
                max_price: formData?.purchasePrice,
                sku: 1,
                quantity: formData.availableQuantity,
                in_stock: formData.availableQuantity > 0 ? 1 : 0,
                is_taxable: 0,
                shipping_class_id: null,
                status: "publish",
                product_type: "simple",
                unit: "1nos",
                height: null,
                width: null,
                length: null,
                image: formData.productImage ?? null,
                video: null,
                gallery: formData?.productGallery ?? [],
                deleted_at: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                author_id: null,
                manufacturer_id: null,
                is_digital: 0,
                is_external: 0,
                external_product_url: null,
                external_product_button_text: null,
                ratings: 5,
                total_reviews: 0,
                rating_count: [],
                my_review: null,
                in_wishlist: false,
                blocked_dates: [],
                translated_languages: [
                    "en"
                ],
                categories: [{
                    "id": "6432b88b409f0c81ef6f9756",
                    "name": "Kalash",
                    "slug": "kalash",
                    "icon": null,
                    "image": [ ],
                    "details": "All varity of kalash is available here.",
                    "language": "en",
                    "translated_languages": [ "en" ],
                    "parent": null,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:21:31.000000Z",
                    "updated_at": "2021-03-08T07:21:31.000000Z",
                    "deleted_at": null,
                    "parent_id": null,
                    "pivot": {
                      "product_id": 1,
                      "category_id": "6432b88b409f0c81ef6f9756"
                    }
                }],
                shop: {
                    "id": 6,
                    "owner_id": 1,
                    "name": "Grocery Shop",
                    "slug": "grocery-shop",
                    "description": "The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.",
                    "cover_image": {
                        "id": "894",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/Untitled-2.jpg",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/conversions/Untitled-2-thumbnail.jpg"
                    },
                    "logo": {
                        "id": "893",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/Group-36321.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/conversions/Group-36321-thumbnail.jpg"
                    },
                    "is_active": 1,
                    "address": {
                        "zip": "61032",
                        "city": "Freeport",
                        "state": "Illinois",
                        "country": "USA",
                        "street_address": "1986  Spinnaker Lane"
                    },
                    "settings": {
                        "contact": "018927525111",
                        "socials": [
                            {
                            "url": "https://www.facebook.com/",
                            "icon": "FacebookIcon"
                            },
                            {
                            "url": "https://www.instagram.com/",
                            "icon": "InstagramIcon"
                            },
                            {
                            "url": "https://www.twitter.com/",
                            "icon": "TwitterIcon"
                            }
                        ],
                        "website": "https://redq.io/",
                        "location": {
                            "lat": 38.9032325,
                            "lng": -77.0211068,
                            "city": "Washington",
                            "state": "DC",
                            "country": "United States",
                            "formattedAddress": "New York Ave NW, Washington, DC, USA"
                        }
                    },
                    "created_at": "2021-06-27T03:48:23.000000Z",
                    "updated_at": "2021-07-08T09:22:38.000000Z"
                },
                type: {
                    "id": 1,
                    "name": "Grocery",
                    "settings": {
                        "isHome": true,
                        "layoutType": "classic",
                        "productCard": "neon"
                    },
                    "slug": "grocery",
                    "language": "en",
                    "icon": "FruitsVegetable",
                    "promotional_sliders": [
                        {
                            "id": "902",
                            "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png",
                            "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/conversions/offer-5-thumbnail.jpg"
                        },
                        {
                            "id": "903",
                            "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png",
                            "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/conversions/offer-4-thumbnail.jpg"
                        },
                        {
                            "id": "904",
                            "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png",
                            "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/conversions/offer-3-thumbnail.jpg"
                        },
                        {
                            "id": "905",
                            "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/offer-2.png",
                            "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/conversions/offer-2-thumbnail.jpg"
                        },
                        {
                            "id": "906",
                            "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/offer-1.png",
                            "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/conversions/offer-1-thumbnail.jpg"
                        }
                    ],
                    "created_at": "2021-03-08T07:18:25.000000Z",
                    "updated_at": "2021-09-26T15:23:32.000000Z",
                    "translated_languages": [
                        "en"
                    ]
                },
                variations: formData.variationFg ? formData.variationData ?? [] : [] ,
                metas: [],
                manufacturer: null,
                variation_options: [],
                tags: [],
                author: null,
                supplier_name: formData.supplierName,
                design_number: formData.designNumber,
            }

            console.log("New Web Product :: ", newWebObject)

            const apiResponse : any = await createWebProductMutation.mutate(newWebObject);
            console.log("web product created : ", apiResponse);
            setStateFlag(
                {...stateFlag, 
                    printBarcodeFg: true, 
                    makeDuplicateFg: true
                }
            )
        }
    }

    const updateExistingProduct = (formData: FormValues) => {
        console.log("========== Update Existing Product ==========");
        setStateFlag({...stateFlag, printBarcodeFg: true, formData: formData});
        
        if ( actionType === 'edit' && stateFlag.editPosAction ) {
            let updatePosObject = {
                // id: stateFlag?.formData?.id,
                // barcodeNo: formData?.barcodeNo,
                // productName: formData?.productName,
                // supplierName: formData?.supplierName,
                // designNumber: formData?.designNumber,
                // sizeWeight: formData?.sizeWeight,
                // sizeWeightUnit: formData?.sizeWeightUnit,
                // brandManufacturer: formData?.brandManufacturer,
                // status: false,
                // draft: false,
                // availableQuantity: formData?.availableQuantity,
                // purchasePrice: formData?.purchasePrice,
                // salePrice: formData?.salePrice,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            updateWebProductMutation.mutate(updatePosObject);
        }
    }

    const printBarcode = () => {
        console.log("========== Print Barcode ==========");
        var svg: any = document.getElementById("barcode").outerHTML;
        var win: any = window.open("", "printwin");
        win.document.write(svg);
        win.print();
        win.close();
    }

    React.useLayoutEffect(() => {
        if (actionType === "edit" && stateFlag.editPosAction) {
            console.log("useEffect only for edit pos action");
            const scanner = new Html5QrcodeScanner('reader', {
                qrbox: {
                    width: 300,
                    height: 300
                },
                fps: 20
            }, false);
            const success = (result: any) => {
                console.log("Scan Result :: ", result);
                // console.log("state : ", stateFlag);
                
                document.getElementById('result')?.innerHTML = `
                    <h2>Scan Success!</h2>
                    ${ result }
                `;
                scanner.clear();
                document.getElementById("reader")?.remove();
                
                let filteredResult = webProducts.filter( (item: any) => item.barcodeNo ===  parseInt(result));
                // console.log("filteredResult => ", filteredResult);
                
                if (filteredResult?.length > 0) {
                    const tempObject = filteredResult[0];
                    // console.log("trying to writing data to form.... tempObject : ", tempObject);
                    setValue('barcodeNo', parseInt(tempObject.barcodeNo));
                    setValue('productName', tempObject?.productName);
                    setValue('supplierName', tempObject?.supplierName);
                    setValue('designNumber', tempObject?.designNumber);
                    setValue('sizeWeight', tempObject?.sizeWeight);
                    setValue('sizeWeightUnit', { label: tempObject?.sizeWeightUnit.label, value: tempObject?.sizeWeightUnit.value });
                    setValue('brandManufacturer', tempObject?.brandManufacturer);
                    setValue('status', tempObject?.status);
                    setValue('draft', tempObject?.draft);
                    setValue('availableQuantity', tempObject?.availableQuantity);
                    setValue('purchasePrice', tempObject?.purchasePrice);
                    setValue('salePrice', tempObject?.salePrice);

                    setStateFlag({...stateFlag, printBarcodeFg: true });

                    setStateFlag({...stateFlag, formData: {
                        id: tempObject._id,
                        barcodeNo: tempObject.barcodeNo,
                        productName: tempObject.productName,
                        supplierName: tempObject.supplierName,
                        designNumber: tempObject.designNumber,
                        sizeWeight: tempObject.sizeWeight,
                        sizeWeightUnit: tempObject.sizeWeightUnit,
                        brandManufacturer: tempObject.brandManufacturer,
                        status: tempObject.status,
                        draft: tempObject.draft,
                        availableQuantity: tempObject.availableQuantity,
                        purchasePrice: tempObject.purchasePrice,
                        salePrice: tempObject.salePrice
                    }});

                    JsBarcode(stateFlag?.barcodeData?.current, result, {
                        format: 'CODE128',
                        displayValue: true,
                    });
                }
            }
            const error = (error: any) => {
                console.error("Scan Error :: ", error);
                // setStateFlag({...stateFlag, });
            }
            scanner.render(success, error);
        } else {
            console.log("useEffect only for create pos action");
        }
        
    }, [stateFlag.editPosAction])

    // Callback version of watch.  It's your responsibility to unsubscribe when done.
    React.useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            console.log("form value =====> ", value, name, type);
            // if (name === 'productImage') {
            //     // setStateFlag({...stateFlag, formData: {...stateFlag.formData, productGallery: value } });
            //     setStateFlag({...stateFlag, formData: {...stateFlag.formData, productGallery: value} })
            // }

            switch (name) {
                case "productImage":
                    console.log("updating product image");
                    setStateFlag({...stateFlag, formData: {...stateFlag.formData, productImage: value} })
                    break;
                case "productGallery":
                    console.log("updating product image", value);
                    setStateFlag({...stateFlag, formData: {...stateFlag.formData, productGallery: value} })
                    break;
                default:
                    break;
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);


    return (
        <>
            <Card className='mb-5'>
                {
                    actionType === "create" ? <h3 className='text-xl'>WEB PRODUCT ENTRY</h3> : <h3 className='text-xl'>EDIT WEB PRODUCT ENTRY</h3>
                }
            </Card>

            {
                stateFlag?.editPosAction ? 
                    <div className="text-end mb-5">
                        <div>
                            <div id="reader"></div>
                            <div id="result"></div>
                        </div>
                    </div> : '' 
            }

            <WebForm 
                createNewProduct={createNewProduct}
                updateExistingProduct={updateExistingProduct}
                printBarcode={printBarcode}
                stateFlag={stateFlag}
                setStateFlag={setStateFlag}
                formHook={{ register: register, handleSubmit: handleSubmit, errors: errors, getValues: getValues, setValue: setValue, control: control, unitOptions: unitOptions }}
                />
        </>
    );
}

WebProductPage.authenticate = {
    permissions: adminOnly,
};
WebProductPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'form'])),
    },
});
