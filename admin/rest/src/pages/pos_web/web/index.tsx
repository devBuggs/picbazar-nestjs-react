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
import { unitOptions, newWebProduct, existingWebProduct } from '@/utils/constants/pos-web';

type FormValues = {
    barcodeNo: number;
    productName: string;
    supplierName: string;
    designNumber: number;
    sizeWeight: number;
    sizeWeightUnit: object;
    availableQuantity: number;
    purchasePrice: number;
    salePrice: number;
};

export default function CreateWebProductPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const [actionType] = useState(router?.query?.action);

    const [stateFlag, setStateFlag] = React.useState({ 
        printBarcodeFg: false, 
        makeDuplicateFg: false,
        inputBarcodeRef: React.useRef(null),
        barcodeData: React.useRef(null),
        editPosAction: router?.query?.action === 'edit' ? true : false,
        formData: {
            id: null,
            barcodeNo: null,
            productName: null,
            supplierName: null,
            designNumber: null,
            sizeWeight: null,
            sizeWeightUnit: {label: "inch", value: "inch"},
            availableQuantity: null,
            purchasePrice: null,
            salePrice: null
        }
    });

    const queryClient = useQueryClient();
    const [defaultValues] = useState( actionType === "edit" ? stateFlag.formData : {...newWebProduct, barcodeNo: generateBarcode()} );

    const { 
        register, 
        setValue, 
        handleSubmit, 
        formState: { errors },
        getValues,
        control
    } = useForm<FormValues>({defaultValues});

    const {
        isLoading,
        isError,
        error,
        data: posProducts
    } = useQuery('getWebProducts', getWebProducts );

    const createWebProductMutation = useMutation(createWebProduct, {
        onSuccess: () => {
            // Invalidates the cache and refetch
            queryClient.invalidateQueries("getWebProducts");
            setValue('barcodeNo', parseInt("500000000"));
            setValue('productName', "");
            setValue('supplierName', "");
            setValue('designNumber', 0);
            setValue('sizeWeight', 0);
            setValue('sizeWeightUnit', {  });
            setValue('availableQuantity', 0);
            setValue('purchasePrice', 0);
            setValue('salePrice', 0);
            setStateFlag({...stateFlag, printBarcodeFg: false, editPosAction: false, barcodeData: React.useRef(null)})
        }
    })

    const updateWebProductMutation = useMutation(updateWebProduct, {
        onSuccess: () => {
            // Invalidates the cache and refetch
            queryClient.invalidateQueries("getWebProducts")
            setStateFlag({...stateFlag, makeDuplicateFg: true});
        }
    });

    const createNewProduct = (formData: FormValues) => {
        console.log("========== Create New Product ==========");
        console.log("form data :: ", formData);
        setStateFlag({...stateFlag, printBarcodeFg: true, formData: formData});
        
        if ( actionType === 'create' || (!stateFlag.editPosAction) ) {
            JsBarcode(stateFlag?.barcodeData?.current, formData?.barcodeNo, {
                format: 'CODE128',
                displayValue: true,
            });
    
            let newPosObject = {
                barcodeNo: formData?.barcodeNo,
                productName: formData?.productName,
                supplierName: formData?.supplierName,
                designNumber: formData?.designNumber,
                sizeWeight: formData?.sizeWeight,
                availableQuantity: formData?.availableQuantity,
                purchasePrice: formData?.purchasePrice,
                salePrice: formData?.salePrice,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            createWebProductMutation.mutate(newPosObject);
        }
    }

    const updateExistingProduct = (formData: FormValues) => {
        console.log("========== Update Existing Product ==========");
        setStateFlag({...stateFlag, printBarcodeFg: true, formData: formData});
        
        if ( actionType === 'edit' || stateFlag.editPosAction ) {
            let updatePosObject = {
                id: stateFlag?.formData?.id,
                barcodeNo: formData?.barcodeNo,
                productName: formData?.productName,
                supplierName: formData?.supplierName,
                designNumber: formData?.designNumber,
                sizeWeight: formData?.sizeWeight,
                availableQuantity: formData?.availableQuantity,
                purchasePrice: formData?.purchasePrice,
                salePrice: formData?.salePrice,
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
        if (actionType === "edit") {
            console.log("useEffect only for edit pos");
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
                
                let filteredResult = posProducts.filter( (item: any) => item.barcodeNo ===  parseInt(result));
                // console.log("filteredResult => ", filteredResult);
                
                if (filteredResult?.length > 0) {
                    const tempObject = filteredResult[0];
                    // console.log("trying to writing data to form.... tempObject : ", tempObject);
                    setValue('barcodeNo', parseInt(tempObject.barcodeNo));
                    setValue('productName', tempObject?.productName);
                    setValue('supplierName', tempObject?.supplierName);
                    setValue('designNumber', tempObject?.designNumber);
                    setValue('sizeWeight', tempObject?.sizeWeight);
                    setValue('sizeWeightUnit', tempObject?.sizeWeightUnit);
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
            console.log("useEffect only for create pos");
        }
        
    }, [stateFlag.editPosAction])


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

CreateWebProductPage.authenticate = {
    permissions: adminOnly,
};
CreateWebProductPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'form'])),
    },
});
