import { Image } from '@/components/ui/image';
import cn from 'classnames';
import usePrice from '@/lib/use-price';
import { AddToCart } from '@/components/products/add-to-cart/add-to-cart';
import { useTranslation } from 'next-i18next';
import { productPlaceholder } from '@/lib/placeholders';
import { Product } from '@/types';

type OganessonProps = {
  product: Product;
  className?: string;
};

const Oganesson: React.FC<OganessonProps> = ({ product, className }) => {
  const { t } = useTranslation('common');
  const { name, image, quantity } = product ?? {};
  const { price, basePrice, discount } = usePrice({
    amount: product.sale_price ? product.sale_price : product.price!,
    baseAmount: product.price,
  });

  return (
    <article
      className={cn('product-card cart-type-oganesson group h-full', className)}
    >
      <div className="relative flex h-48 w-auto items-center justify-center overflow-hidden rounded bg-light transition-shadow group-hover:shadow-sm sm:h-64">
        <span className="sr-only">{t('text-product-image')}</span>
        <Image
          src={image?.original ?? productPlaceholder}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="product-image"
        />
        {discount && (
          <div className="absolute top-3 rounded bg-accent px-1.5 text-xs font-semibold leading-6 text-light ltr:right-3 rtl:left-3 md:top-[22px] md:px-2 ltr:md:right-4 rtl:md:left-4 lg:px-2.5">
            {discount}
          </div>
        )}
        <div className="absolute bottom-4 ltr:right-4 rtl:left-4">
          {Number(quantity) > 0 ? (
            <AddToCart variant="oganesson" data={product} />
          ) : (
            <div className="rounded bg-red-500 px-2 py-1 text-xs text-light">
              {t('text-out-stock')}
            </div>
          )}
        </div>
      </div>
      {/* End of product image */}

      <header className="py-3.5 px-0.5 md:py-5">
        <div className="mb-2 flex items-center">
          <span className="text-sm font-semibold text-heading md:text-base">
            {price}
          </span>
          {basePrice && (
            <del className="text-xs text-muted ltr:ml-2 rtl:mr-2 md:text-sm">
              {basePrice}
            </del>
          )}
        </div>
        {/* End of product price */}

        <h3 className="truncate text-xs text-body md:text-sm">{name}</h3>
        {/* End of product title */}
      </header>
    </article>
  );
};

export default Oganesson;
