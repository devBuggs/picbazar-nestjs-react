import Coupon from '@/components/checkout/coupon';
import usePrice from '@/lib/use-price';
import EmptyCartIcon from '@/components/icons/empty-cart';
import { CloseIcon } from '@/components/icons/close-icon';
import { useTranslation } from 'next-i18next';
import { useCart } from '@/store/quick-cart/cart.context';
import {
  calculatePaidTotal,
  calculateTotal,
} from '@/store/quick-cart/cart.utils';
import { useAtom } from 'jotai';
import {
  couponAtom,
  discountAtom,
  payableAmountAtom,
  verifiedResponseAtom,
  walletAtom,
} from '@/store/checkout';
import ItemCard from '@/components/checkout/item/item-card';
import { ItemInfoRow } from '@/components/checkout/item/item-info-row';
import PaymentGrid from '@/components/checkout/payment/payment-grid';
import { PlaceOrderAction } from '@/components/checkout/place-order-action';
import Wallet from '@/components/checkout/wallet/wallet';
import { useSettings } from '@/framework/settings';
import cn from 'classnames';
import { CouponType } from '@/types';

interface Props {
  className?: string;
}
const VerifiedItemList: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation('common');
  const { items, isEmpty: isEmptyCart } = useCart();
  const [verifiedResponse] = useAtom(verifiedResponseAtom);
  const [coupon, setCoupon] = useAtom(couponAtom);
  const [discount] = useAtom(discountAtom);
  const [payableAmount] = useAtom(payableAmountAtom);
  const [use_wallet] = useAtom(walletAtom);
  const {
    settings: { freeShippingAmount, freeShipping },
  } = useSettings();

  const available_items = items?.filter(
    (item) => !verifiedResponse?.unavailable_products?.includes(item.id)
  );

  const { price: tax } = usePrice(
    verifiedResponse && {
      amount: verifiedResponse.total_tax ?? 0,
    }
  );

  const { price: shipping } = usePrice(
    verifiedResponse && {
      amount: verifiedResponse.shipping_charge ?? 0,
    }
  );
  const base_amount = calculateTotal(available_items);
  const { price: sub_total } = usePrice(
    verifiedResponse && {
      amount: base_amount,
    }
  );
  // Calculate Discount base on coupon type
  let calculateDiscount = 0;
  
  switch (coupon?.type) {
    case CouponType.PERCENTAGE:
      calculateDiscount = (base_amount * Number(discount)) / 100
      break;
    case CouponType.FREE_SHIPPING:
      calculateDiscount =  verifiedResponse ? verifiedResponse.shipping_charge : 0
      break;
    default:
      calculateDiscount = Number(discount)
  }

  const { price: discountPrice } = usePrice(
    //@ts-ignore
    discount && {
      amount: Number(calculateDiscount),
    }
  );
  let freeShippings = freeShipping && Number(freeShippingAmount) <= base_amount
  const totalPrice = verifiedResponse
    ? calculatePaidTotal(
      {
        totalAmount: base_amount,
        tax: verifiedResponse?.total_tax,
        shipping_charge: freeShippings ? 0 : verifiedResponse?.shipping_charge,
      },
      Number(calculateDiscount)
    )
    : 0;
  const { price: total } = usePrice(
    verifiedResponse && {
      amount: totalPrice,
    }
  );
  return (
    <div className={className}>
      <div className="flex flex-col pb-2 border-b border-border-200">
        {!isEmptyCart ? (
          items?.map((item) => {
            const notAvailable = verifiedResponse?.unavailable_products?.find(
              (d: any) => d === item.id
            );
            return (
              <ItemCard
                item={item}
                key={item.id}
                notAvailable={!!notAvailable}
              />
            );
          })
        ) : (
          <EmptyCartIcon />
        )}
      </div>

      <div className="mt-4 space-y-2">
        <ItemInfoRow title={t('text-sub-total')} value={sub_total} />
        <ItemInfoRow title={t('text-tax')} value={tax} />
        <div className="flex justify-between">
          <p className="text-sm text-body">{t('text-shipping')} <span className='text-xs font-semibold text-accent'>{freeShippings && `(${t('text-free-shipping')})`}</span></p>
          <span className="text-sm text-body"> {shipping}</span>
        </div>
        {discount && coupon ? (
          <div className="flex justify-between">
            <p className="flex items-center gap-1 text-sm text-body ltr:mr-2 rtl:ml-2">
              {t('text-discount')} <span className='-mt-px text-xs font-semibold text-accent'>{coupon?.type === CouponType.FREE_SHIPPING && `(${t('text-free-shipping')})` }</span>
            </p>
            <span className="flex items-center text-xs font-semibold text-red-500 ltr:mr-auto rtl:ml-auto">
              ({coupon?.code})
              <button onClick={() => setCoupon(null)}>
                <CloseIcon className="w-3 h-3 ltr:ml-2 rtl:mr-2 mt-0.5" />
              </button>
            </span>
            <span className="flex items-center gap-1 text-sm text-body">{calculateDiscount > 0 ? <span className='-mt-0.5'>-</span>: null} {discountPrice}</span>
          </div>
        ) : (
          <div className="mt-5 !mb-4 flex justify-between">
            <Coupon subtotal={base_amount} />
          </div>
        )}
        <div className="flex justify-between pt-3 border-t-4 border-double border-border-200">
          <p className="text-base font-semibold text-heading">
            {t('text-total')}
          </p>
          <span className="text-base font-semibold text-heading">{total}</span>
        </div>
      </div>
      {verifiedResponse && (
        <Wallet
          totalPrice={totalPrice}
          walletAmount={verifiedResponse.wallet_amount}
          walletCurrency={verifiedResponse.wallet_currency}
        />
      )}
      {use_wallet && !Boolean(payableAmount) ? null : (
        <PaymentGrid className="p-5 mt-10 border border-gray-200 bg-light" />
      )}
      <PlaceOrderAction>{t('text-place-order')}</PlaceOrderAction>
    </div>
  );
};

export default VerifiedItemList;
