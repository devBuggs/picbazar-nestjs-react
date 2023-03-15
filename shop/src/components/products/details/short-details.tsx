import { useRouter } from 'next/router';
import Image from 'next/image';
import cn from 'classnames';
import { AddToCart } from '@/components/products/add-to-cart/add-to-cart';
import usePrice from '@/lib/use-price';
import { getVariations } from '@/lib/get-variations';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import VariationPrice from './variation-price';
import { useTranslation } from 'next-i18next';
import { Routes } from '@/config/routes';
import { useModalAction } from '@/components/ui/modal/modal.context';
import VariationGroups from './variation-groups';
import type { Product } from '@/types';
import { isVariationSelected } from '@/lib/is-variation-selected';
import { useMemo } from 'react';
import { useAttributes } from './attributes.context';

interface ShortDetailsProps {
  product: Product;
  isSticky: boolean;
}
const ShortDetails: React.FC<ShortDetailsProps> = ({ product, isSticky }) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const { closeModal } = useModalAction();
  const { attributes } = useAttributes();

  const { name, slug, image, unit, quantity, min_price, max_price } =
    product ?? {};

  const navigate = (path: string) => {
    router.push(path);
    closeModal();
  };

  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price!,
    baseAmount: product?.price!,
  });

  const variations = useMemo(
    () => getVariations(product?.variations),
    [product?.variations]
  );

  const isSelected = isVariationSelected(variations, attributes);

  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = product?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }
  const hasVariations = !isEmpty(variations);
  return (
    <div
      className={cn(
        'fixed top-0 left-1/2 z-50 hidden h-auto w-full max-w-6xl -translate-x-1/2 transform bg-light px-8 py-6 shadow transition-all duration-300 md:block',
        {
          'invisible -translate-y-1/2 opacity-0': !isSticky,
          'visible translate-y-0 opacity-100': isSticky,
        }
      )}
    >
      <div className="flex items-center">
        <div
          className={cn(
            'relative flex shrink-0 items-center justify-center overflow-hidden rounded border border-border-200 border-opacity-70',
            {
              'h-28 w-28': !hasVariations,
              'h-40 w-40 lg:h-52 lg:w-52': hasVariations,
            }
          )}
        >
          <Image
            src={selectedVariation?.image?.original! ?? image?.original}
            alt={name}
            layout="fill"
            objectFit="contain"
            className="product-image"
          />
        </div>

        <div className="flex flex-col justify-center overflow-hidden px-8 ltr:mr-auto rtl:ml-auto">
          <h3
            className="cursor-pointer truncate text-lg font-semibold tracking-tight text-heading transition-colors hover:text-accent lg:text-xl"
            onClick={() => navigate(Routes.product(slug))}
            // onClick={() => navigate(Routes.product(slug, router?.asPath.slice(1)))}
            title={name}
          >
            {name}
          </h3>

          {unit && !hasVariations ? (
            <span className="mt-2 block text-sm font-normal text-body">
              {unit}
            </span>
          ) : (
            <span className="mt-2 flex items-center">
              {hasVariations && (
                <VariationPrice
                  selectedVariation={selectedVariation}
                  minPrice={min_price}
                  maxPrice={max_price}
                />
              )}
            </span>
          )}
        </div>

        <div
          className={cn('flex w-full shrink-0', {
            'max-w-max': !hasVariations,
            'max-w-[40%]': hasVariations,
          })}
        >
          {!hasVariations && (
            <span className="flex items-center ltr:mr-8 rtl:ml-8 ">
              <ins className="text-xl font-semibold text-accent no-underline lg:text-2xl">
                {price}
              </ins>
              {basePrice && (
                <del className="text-sm font-normal text-muted ltr:ml-2 rtl:mr-2 lg:text-base">
                  {basePrice}
                </del>
              )}
            </span>
          )}

          <div className="w-full">
            <div
              className={cn('flex flex-col justify-center overflow-y-auto', {
                'h-[140px]': hasVariations,
              })}
            >
              <VariationGroups variations={variations} />
            </div>

            <div className={cn({ 'mt-4': hasVariations })}>
              {quantity! > 0 ? (
                <AddToCart
                  data={product}
                  variant="big"
                  variation={selectedVariation}
                  disabled={selectedVariation?.is_disable || !isSelected}
                />
              ) : (
                <div className="rounded bg-red-500 px-3 py-2 text-sm text-light">
                  {t('text-out-stock')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortDetails;
