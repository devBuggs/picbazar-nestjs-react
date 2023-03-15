import Link from '@/components/ui/link';
import { Image } from '@/components/ui/image';
import cn from 'classnames';
import usePrice from '@/lib/use-price';
import { useTranslation } from 'next-i18next';
import { Routes } from '@/config/routes';
import { productPlaceholder } from '@/lib/placeholders';

type KryptonProps = {
  product: any;
  className?: string;
};

const Krypton: React.FC<KryptonProps> = ({ product, className }) => {
  const { t } = useTranslation('common');
  const { name, image, slug, min_price, max_price, product_type } =
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

  return (
    <Link href={Routes.product(slug)}>
      <article
        className={cn(
          'product-card cart-type-krypton h-full cursor-pointer overflow-hidden rounded border border-border-200 bg-light transition-shadow duration-200 hover:shadow-sm',
          className
        )}
      >
        <div className="relative flex h-48 w-auto items-center justify-center sm:h-64">
          <span className="sr-only">{t('text-product-image')}</span>
          <Image
            src={image?.original ?? productPlaceholder}
            alt={name}
            layout="fill"
            objectFit="contain"
            className="product-image"
          />
          {discount && (
            <div className="absolute top-3 rounded-full bg-yellow-500 px-2 text-xs font-semibold leading-6 text-light ltr:right-3 rtl:left-3 md:top-4 md:px-2.5 ltr:md:right-4 rtl:md:left-4">
              {discount}
            </div>
          )}
        </div>
        {/* End of product image */}

        <header className="p-3 text-center md:p-6">
          <h3 className="mb-2 truncate text-sm font-semibold text-heading">
            {name}
          </h3>
          {/* End of product title */}

          {product_type.toLowerCase() === 'variable' ? (
            <div>
              <span className="text-sm text-sub-heading">{minPrice}</span>
              <span> - </span>
              <span className="text-sm text-sub-heading">{maxPrice}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-sm text-sub-heading">{price}</span>
              {basePrice && (
                <del className="text-sm text-muted ltr:ml-2 rtl:mr-2">
                  {basePrice}
                </del>
              )}
            </div>
          )}
        </header>
      </article>
    </Link>
  );
};

export default Krypton;
