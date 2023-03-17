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

    return (
        <>
            <PosForm />
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
