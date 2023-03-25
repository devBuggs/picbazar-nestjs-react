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


export default function CreatePosProductPage() {
    const { t } = useTranslation();

    const [stateFlag, setStateFlag] = React.useState({ 
        printBarcodeFg: false, 
        makeDuplicateFg: false,
        inputBarcodeRef: React.useRef(null),
        barcodeData: React.useRef(null),
    });

    const makeDuplicate = () => {
        console.log("========== Make Duplicate Product ==========");
    }

    // done
    const createNewProduct = (formData: object) => {
        console.log("========== Create New Product ==========");
        console.log("form data :: ", formData);
        setStateFlag({...stateFlag, printBarcodeFg: true});
        JsBarcode( stateFlag?.barcodeData?.current, formData?.productName.toString(), formData);
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

    const handleScanBarcode = async () => {
        console.log("========== Scanning Barcode ===========");
        const inputBarcode: any = stateFlag?.inputBarcodeRef?.current;
        // Handle the result
        console.log(" barcode data :: ", inputBarcode?.files[0]);
    }

    return (
        <>
            <PosForm 
                createNewProduct={createNewProduct}
                updateExistingProduct={updateExistingProduct}
                makeDuplicate={makeDuplicate}
                printBarcode={printBarcode}
                saveToDraft={saveToDraft}
                scanBarcode={handleScanBarcode}
                stateFlag={stateFlag}
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
