import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import { useState } from 'react';
import Search from '@/components/common/search';
import { adminOnly } from '@/utils/auth-utils';
import PosForm from '@/components/posweb/pos-form';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function CreatePosProductPage() {
    const { t } = useTranslation();

    // const [newPos, setNewPos] = useState({});

    const generateBarCode = () => {
        console.log("========== Generating Barcode ==========");
    }

    const makeDuplicate = () => {
        console.log("========== Make Duplicate Product ==========");
    }

    const createNewProduct = () => {
        console.log("========== Create New Product ==========");
    }

    const updateExistingProduct = () => {
        console.log("========== Update Existing Product ==========");
    }

    const printBarcode = () => {
        console.log("========== Print Barcode ==========");
    }

    const saveToDraft = () => {
        console.log("========== Save To Draft ==========");
    }

    return (
        <>
            <PosForm 
                createNewProduct={createNewProduct}
                updateExistingProduct={updateExistingProduct}
                makeDuplicate={makeDuplicate}
                generateBarCode={generateBarCode}
                printBarcode={printBarcode}
                saveToDraft={saveToDraft}
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
