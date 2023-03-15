import { Image } from '@/components/ui/image';
import cn from 'classnames';
import { AddToCart } from '@/components/products/add-to-cart/add-to-cart';
import usePrice from '@/lib/use-price';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { productPlaceholder } from '@/lib/placeholders';
import { PlusIcon } from '@/components/icons/plus-icon';

type ArgonProps = {
  product: any;
  className?: string;
};

const Argon: React.FC<ArgonProps> = ({ product, className }) => {
  const { t } = useTranslation('common');
  const { name, image, quantity, min_price, max_price, product_type } =
    product ?? {};
  const { price, basePrice, discount } = usePrice({
    amount: product.sale_price ? product.sale_price : product.price!,
    baseAmount: product.price,
  });
  const { price: minPrice } = usePrice({
    amount: min_price,
  });
  const { price: maxPrice } = usePrice({
    amount: max_price,
  });

  const { openModal } = useModalAction();

  function handleProductQuickView() {
    return openModal('PRODUCT_DETAILS', product.slug);
  }

  return (
    <article
      className={cn(
        'product-card cart-type-argon h-full transform overflow-hidden rounded bg-light shadow-downfall-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-downfall-lg',
        className
      )}
      onClick={handleProductQuickView}
      role="button"
    >
      <div className="relative flex h-48 w-auto items-center justify-center sm:h-52">
        <span className="sr-only">{t('text-product-image')}</span>
        <Image
          src={image?.original ?? productPlaceholder}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="product-image"
        />

        {discount && (
          <div className="absolute top-3 rounded bg-accent px-1.5 text-xs font-semibold leading-6 text-light ltr:left-3 rtl:right-3 sm:px-2 md:top-[22px] md:px-2.5 ltr:md:left-4 rtl:md:right-4">
            {discount}
          </div>
        )}

        <div className="absolute top-3 ltr:right-3 rtl:left-3 md:top-4 ltr:md:right-4 rtl:md:left-4">
          {product_type.toLowerCase() === 'variable' ? (
            <>
              {Number(quantity) > 0 && (
                <button
                  onClick={handleProductQuickView}
                  className="flex h-7 w-7 items-center justify-center rounded border border-border-200 bg-light text-sm text-heading transition-colors hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-none md:h-9 md:w-9"
                >
                  <PlusIcon className="h-5 w-5 stroke-2" />
                </button>
              )}
            </>
          ) : (
            <>
              {Number(quantity) > 0 && (
                <AddToCart variant="argon" data={product} />
              )}
            </>
          )}

          {Number(quantity) <= 0 && (
            <div className="rounded bg-red-500 px-2 py-1 text-xs text-light">
              {t('text-out-stock')}
            </div>
          )}
        </div>
      </div>
      {/* End of product image */}

      <header className="p-3 md:p-6">
        {product_type.toLowerCase() === 'variable' ? (
          <div className="mb-2">
            <span className="text-sm font-semibold text-heading md:text-base">
              {minPrice}
            </span>
            <span> - </span>
            <span className="text-sm font-semibold text-heading md:text-base">
              {maxPrice}
            </span>
          </div>
        ) : (
          <div className="mb-2 flex items-center">
            <span className="text-sm font-semibold text-heading md:text-base">
              {price}
            </span>
            {basePrice && (
              <del className="text-xs text-body ltr:ml-2 rtl:mr-2 md:text-sm">
                {basePrice}
              </del>
            )}
          </div>
        )}
        {/* End of product price */}

        <h3 className="text-xs text-body md:text-sm">{name}</h3>
        {/* End of product title */}
      </header>
    </article>
  );
};

export default Argon;
