import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import React, { useState } from 'react';
import Search from '@/components/common/search';
import { adminOnly } from '@/utils/auth-utils';
import PosForm from '@/components/posweb/pos-form';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import JsBarcode from "jsbarcode";
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useRouter } from 'next/router';


export default function CreatePosProductPage() {
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
            barcodeNo: 500000000,
            productName: "Dummy Product 001",
            supplierName: "Ecorpin Corp.",
            designNumber: 56020001,
            sizeWeight: 11,
            sizeWeightUnit: {label: "inch", value: "inch"},
            availableQuantity: 2,
            purchasePrice: 9999,
            salePrice: 8099
        }
    });

    const makeDuplicate = () => {
        console.log("========== Make Duplicate Product ==========");
    }

    // working
    const createNewProduct = (formData: object) => {
        console.log("========== Create New Product ==========");
        console.log("form data :: ", formData);
        // setStateFlag({...stateFlag, printBarcodeFg: true, formData: formData});
        JsBarcode(stateFlag?.barcodeData?.current, formData?.barcodeNo, {
            format: 'CODE128',
            displayValue: true,
        });
    }

    const updateExistingProduct = () => {
        console.log("========== Update Existing Product ==========");
    }

    // done
    const printBarcode = () => {
        console.log("========== Print Barcode ==========");
        var svg: any = document.getElementById("barcode").outerHTML;
        var win: any = window.open("", "printwin");
        win.document.write(svg);
        win.print();
        win.close();
    }

    const saveToDraft = () => {
        console.log("========== Save To Draft ==========");
    }

    const handleScanBarcode = async (e: any) => {
        console.log("========== Scanning Barcode ===========");
        // scanner.render(success, error);
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
                console.log("Result :: ", result);
                document.getElementById('result')?.innerHTML = `
                    <h2>Scan Success!</h2>
                    ${ result }
                `;
                scanner.clear();
                document.getElementById("reader")?.remove();
            }
            const error = (error: any) => {
                console.error("Result :: ", error);
                setStateFlag({...stateFlag, });
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
                    actionType  ? <h3 className='text-xl'>POS PRODUCT ENTRY</h3> : <h3 className='text-xl'>EDIT POS PRODUCT ENTRY</h3>
                }
            </Card>

            {
                actionType === "edit" ? 
                    <div className="text-end mb-5">
                        <div>
                            <div id="reader"></div>
                            <div id="result"></div>
                        </div>
                    </div> : '' 
            }
            
            <PosForm 
                createNewProduct={createNewProduct}
                updateExistingProduct={updateExistingProduct}
                makeDuplicate={makeDuplicate}
                printBarcode={printBarcode}
                saveToDraft={saveToDraft}
                scanBarcode={handleScanBarcode}
                stateFlag={stateFlag}
                setStateFlag={setStateFlag}
                />
        </>
    );
}

CreatePosProductPage.authenticate = {
    permissions: adminOnly,
};
CreatePosProductPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'form'])),
    },
});
