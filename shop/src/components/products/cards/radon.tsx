import Link from '@/components/ui/link';
import { Image } from '@/components/ui/image';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Routes } from '@/config/routes';
import { Product } from '@/types';
import { productPlaceholder } from '@/lib/placeholders';
import usePrice from '@/lib/use-price';

type RadonProps = {
  product: Product;
  className?: string;
};

const Radon: React.FC<RadonProps> = ({ product, className }) => {
  const { t } = useTranslation('common');
  const { name, slug, image, author, min_price, max_price, product_type } =
    product ?? {};

  const { price, basePrice, discount } = usePrice({
    amount: product.sale_price ? product.sale_price : product.price!,
    baseAmount: product.price,
  });
  const { price: minPrice } = usePrice({
    amount: min_price!,
  });
  const { price: maxPrice } = usePrice({
    amount: max_price!,
  });

  return (
    <article
      className={cn(
        'product-card cart-type-radon flex h-full flex-col overflow-hidden duration-200',
        className
      )}
    >
      <Link href={Routes.product(slug)} className="cursor-pointer">
        <Image
          src={image?.original ?? productPlaceholder}
          alt={name}
          layout="responsive"
          width={600}
          height={888}
          className="product-image rounded-lg"
        />
      </Link>
      {/* End of product image */}

      <header className="flex shrink-0 flex-col space-y-2 pt-4">
        {name && (
          <Link
            href={Routes.product(slug)}
            className="text-sm font-semibold text-heading transition-colors hover:text-orange-500 md:text-base"
            title={name}
          >
            {name}
          </Link>
        )}

        {author && (
          <span className="text-xs text-gray-400 md:text-sm">
            {t('text-by')}
            <Link
              href={Routes.author(author?.slug!)}
              className="text-body transition-colors hover:text-orange-500 ltr:ml-1 rtl:mr-1"
            >
              {author?.name}
            </Link>
          </span>
        )}

        <div className="flex shrink-0 items-center">
          {product_type.toLowerCase() === 'variable' ? (
            <p className="text-sm font-semibold text-orange-500 md:text-base">
              {minPrice}

              <span className="text-heading"> - </span>

              {maxPrice}
            </p>
          ) : (
            <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
              <span className="text-base font-semibold text-orange-500">
                {price}
              </span>
              {basePrice && (
                <del className="text-xs font-semibold text-gray-400 ltr:mr-2 rtl:ml-2">
                  {basePrice}
                </del>
              )}
              {discount && (
                <div className="text-xs text-accent">
                  ({t('text-save')} {discount})
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      {/* End of product info */}
    </article>
  );
};

export default Radon;
