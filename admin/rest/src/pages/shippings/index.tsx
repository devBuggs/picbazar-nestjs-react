import { useState } from 'react';
import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import ShippingList from '@/components/shipping/shipping-list';
import Search from '@/components/common/search';

import LinkButton from '@/components/ui/link-button';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useShippingClassesQuery } from '@/data/shipping';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Routes } from '@/config/routes';
import { SortOrder } from '@/types';
import { adminOnly } from '@/utils/auth-utils';

export default function ShippingsPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearch] = useState('');
  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const { shippingClasses, loading, error } = useShippingClassesQuery({
    name: searchTerm,
    orderBy,
    sortedBy,
  });
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearch(searchText);
  }

  return (
    <>
      <Card className="mb-8 flex flex-col items-center xl:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-xl font-semibold text-heading">
            {t('form:input-label-shippings')}
          </h1>
        </div>

        <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2">
          <Search onSearch={handleSearch} />

          <LinkButton
            href={`${Routes.shipping.create}`}
            className="h-12 w-full md:w-auto md:ms-6"
          >
            <span>
              + {t('form:button-label-add')} {t('form:button-label-shipping')}
            </span>
          </LinkButton>
        </div>
      </Card>
      <ShippingList
        onOrder={setOrder}
        onSort={setColumn}
        shippings={shippingClasses}
      />
    </>
  );
}

ShippingsPage.authenticate = {
  permissions: adminOnly,
};

ShippingsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
