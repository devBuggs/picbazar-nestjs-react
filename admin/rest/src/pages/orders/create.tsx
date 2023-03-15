import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import Search from '@/components/common/search';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import CategoryTypeFilter from '@/components/product/category-type-filter';
import cn from 'classnames';
import { ArrowDown } from '@/components/icons/arrow-down';
import { ArrowUp } from '@/components/icons/arrow-up';
import ProductCard from '@/components/product/card';
import Cart from '@/components/cart/cart';
import { useUI } from '@/contexts/ui.context';
import DrawerWrapper from '@/components/ui/drawer-wrapper';
import Drawer from '@/components/ui/drawer';
import CartCounterButton from '@/components/cart/cart-counter-button';
import Pagination from '@/components/ui/pagination';
import { Product, ProductStatus } from '@/types';
import { useProductsQuery } from '@/data/product';
import NotFound from '@/components/ui/not-found';
import { useRouter } from 'next/router';
import {useSettings} from "@/contexts/settings.context";

export default function ProductsPage() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const { displayCartSidebar, closeCartSidebar } = useUI();
  const toggleVisible = () => {
    setVisible((v) => !v);
  };
  const { products, loading, paginatorInfo, error } = useProductsQuery({
    limit: 18,
    language: locale,
    status: ProductStatus.Publish,
    name: searchTerm,
    page,
    type,
    categories: category,
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }

  function handlePagination(current: any) {
    setPage(current);
  }

  // const { products } = data;
  return (
    <>
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="mb-4 md:mb-0 md:w-1/4">
            <h1 className="text-lg font-semibold text-heading">
              {t('form:input-label-create-order')}
            </h1>
          </div>

          <div className="ms-auto flex w-full flex-col items-center md:w-3/4">
            <Search onSearch={handleSearch} />
          </div>

          <button
            className="md:ms-5 mt-5 flex items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0"
            onClick={toggleVisible}
          >
            {t('common:text-filter')}{' '}
            {visible ? (
              <ArrowUp className="ms-2" />
            ) : (
              <ArrowDown className="ms-2" />
            )}
          </button>
        </div>

        <div
          className={cn('flex w-full transition', {
            'visible h-auto': visible,
            'invisible h-0': !visible,
          })}
        >
          <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8">
            <CategoryTypeFilter
              onCategoryFilter={({ slug }: { slug: string }) => {
                setCategory(slug);
                setPage(1);
              }}
              onTypeFilter={({ slug }: { slug: string }) => {
                setType(slug);
                setPage(1);
              }}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      {/* <Card> */}
      <div className="flex space-x-5">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-6">
          {products?.map((product: Product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      </div>
      {!products?.length ? (
        <NotFound text="text-not-found" className="mx-auto w-7/12" />
      ) : null}
      <div className="mt-8 flex w-full justify-center">
        {!!paginatorInfo?.total && (
          <div className="flex items-center justify-end">
            <Pagination
              total={paginatorInfo.total}
              current={paginatorInfo.currentPage}
              pageSize={paginatorInfo.perPage}
              onChange={handlePagination}
              showLessItems
            />
          </div>
        )}
      </div>
      {/* <div className="w-[440px] flex-shrink-0 bg-white">
          <Cart />
        </div> */}
      {/* </div> */}

      {/* Mobile cart Drawer */}
      <CartCounterButton />
      <Drawer
        open={displayCartSidebar}
        onClose={closeCartSidebar}
        variant="right"
      >
        <DrawerWrapper hideTopBar={true}>
          <Cart />
        </DrawerWrapper>
      </Drawer>
    </>
  );
}
ProductsPage.authenticate = {
  permissions: adminOnly,
};
ProductsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
