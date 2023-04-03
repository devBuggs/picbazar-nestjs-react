import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PosWebMenu from '@/components/posweb/pos-web-menu';
import { useState } from 'react';
import Search from '@/components/common/search';
import { adminOnly } from '@/utils/auth-utils';
import { useShopsQuery } from '@/data/shop';
import { SortOrder } from '@/types';

export default function HomePage() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [orderBy, setOrder] = useState('created_at');
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

    function handleSearch({ searchText }: { searchText: string }) {
        setSearchTerm(searchText);
    }

    return (
        <>
            <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/4">
                    <h1 className="text-lg font-semibold text-heading">
                        {t('POS WEB')}
                    </h1>
                </div>

                <div className="ms-auto flex w-full flex-col items-center md:w-1/2 md:flex-row">
                    <Search onSearch={handleSearch} />
                </div>
            </Card>

            <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
                <PosWebMenu />
            </Card>

        </>
    );
}

HomePage.authenticate = {
    permissions: adminOnly,
};
HomePage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
    },
});
