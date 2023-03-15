import type { NextPageWithLayout } from '@/types';
import type { InferGetStaticPropsType } from 'next';
import { getLayout } from '@/components/layouts/layout';
import { AttributesProvider } from '@/components/products/details/attributes.context';
import Seo from '@/components/seo/seo';
import { useWindowSize } from '@/lib/use-window-size';
import ProductQuestions from '@/components/questions/product-questions';
import AverageRatings from '@/components/reviews/average-ratings';
import ProductReviews from '@/components/reviews/product-reviews';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';

import { getStaticPaths, getStaticProps } from '@/framework/product.ssr';
export { getStaticPaths, getStaticProps };
//FIXME: typescript and layout
const Details = dynamic(() => import('@/components/products/details/details'));
const BookDetails = dynamic(
  () => import('@/components/products/details/book-details')
);
const RelatedProducts = dynamic(
  () => import('@/components/products/details/related-products')
);
const CartCounterButton = dynamic(
  () => import('@/components/cart/cart-counter-button'),
  { ssr: false }
);

const ProductPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ product } : any) => {
  const { width } = useWindowSize();
  return (
    <>
      <Seo
        title={product.name}
        url={product.slug}
        images={!isEmpty(product?.image) ? [product.image] : []}
      />
      <AttributesProvider>
        <div className="min-h-screen bg-light">
          {product.type?.slug === 'books' ? (
            <BookDetails product={product} />
          ) : (
            <>
              <Details product={product} />
              <AverageRatings
                title={product?.name}
                ratingCount={product?.rating_count}
                totalReviews={product?.total_reviews}
                ratings={product?.ratings}
              />
            </>
          )}

          <ProductReviews
            productId={product?.id}
            productType={product?.type?.slug}
          />
          <ProductQuestions
            productId={product?.id}
            shopId={product?.shop?.id}
            productType={product?.type?.slug}
          />
          {product.type?.slug !== 'books' &&
            product?.related_products?.length > 1 && (
              <div className="p-5 lg:p-14 xl:p-16">
                <RelatedProducts
                  products={product.related_products}
                  currentProductId={product.id}
                  gridClassName="lg:grid-cols-4 2xl:grid-cols-5 !gap-3"
                />
              </div>
            )}
        </div>
        {width > 1023 && <CartCounterButton />}
      </AttributesProvider>
    </>
  );
};
ProductPage.getLayout = getLayout;
export default ProductPage;
