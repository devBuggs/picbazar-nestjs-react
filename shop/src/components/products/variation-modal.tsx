import { useMemo } from 'react';
import { getVariations } from '@/lib/get-variations';
import { isVariationSelected } from '@/lib/is-variation-selected';
import VariationGroups from './details/variation-groups';
import VariationPrice from './details/variation-price';
import isEqual from 'lodash/isEqual';
import {
  AttributesProvider,
  useAttributes,
} from '@/components/products/details/attributes.context';
import { AddToCart } from './add-to-cart/add-to-cart';
import { useProduct } from '@/framework/product';

interface Props {
  product: any;
}

const Variation = ({ product }: Props) => {
  const { attributes } = useAttributes();
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
  return (
    <div className="w-[95vw] max-w-lg rounded-md bg-white p-8">
      <h3 className="mb-2 text-center text-2xl font-semibold text-heading">
        {product?.name}
      </h3>
      <div className="mb-8 flex items-center justify-center">
        <VariationPrice
          selectedVariation={selectedVariation}
          minPrice={product.min_price}
          maxPrice={product.max_price}
        />
      </div>
      <div className="mb-8">
        <VariationGroups variations={variations} />
      </div>
      <AddToCart
        data={product}
        variant="big"
        variation={selectedVariation}
        disabled={selectedVariation?.is_disable || !isSelected}
      />
    </div>
  );
};

const ProductVariation = ({ productSlug }: { productSlug: string }) => {
  const { product, isLoading } = useProduct({
    slug: productSlug,
  });
  if (isLoading || !product) return <div>Loading</div>;
  return (
    <AttributesProvider>
      <Variation product={product} />
    </AttributesProvider>
  );
};

export default ProductVariation;
