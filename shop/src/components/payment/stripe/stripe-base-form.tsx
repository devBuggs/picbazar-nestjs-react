import Button from '@/components/ui/button';
import { useTranslation } from 'next-i18next';
import Label from '@/components/ui/forms/label';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import Input from '@/components/ui/forms/input';
import Checkbox from '@/components/ui/forms/checkbox/checkbox';
import Alert from '@/components/ui/alert';
import isEmpty from 'lodash/isEmpty';
import { useUser } from '@/framework/user';

interface Props {
  handleSubmit: any;
  type: 'checkout' | 'save_card';
  loading: boolean;
  changeSaveCard?: any;
  saveCard?: any;
  changeDefaultCard?: any;
  defaultCard?: any;
  cardError: any;
}

const StripeBaseForm: React.FC<Props> = ({
  handleSubmit,
  type = 'save_card',
  loading = false,
  changeSaveCard,
  saveCard,
  changeDefaultCard,
  defaultCard,
  cardError,
}) => {
  const { t } = useTranslation('common');
  const { isAuthorized } = useUser();

  const cardInputStyle = {
    base: {
      '::placeholder': {
        color: '#000000',
      },
    },
  };

  return (
    <div className="payment-modal relative h-full w-screen max-w-md overflow-hidden rounded-[10px] bg-light md:h-auto md:min-h-0 lg:max-w-[46rem]">
      <div className="p-6 lg:p-12">
        {!isEmpty(cardError) ? (
          <Alert className="mb-4" message={cardError} variant="error" />
        ) : (
          ''
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label>
              <span className="mb-2 block text-sm font-semibold text-black">
                {t('text-name')}
              </span>
              <Input
                name="owner_name"
                placeholder={t('text-name')}
                required
                inputClassName="h-auto rounded border border-solid border-[#D4D8DD] bg-white py-[14px] px-4 text-black transition-all duration-300 focus:shadow-none"
              />
            </label>
          </div>
          <div>
            <Label className="mb-0 block">
              <span className="mb-2 block text-sm font-semibold text-black">
                {t('text-card-number')}
              </span>
              <CardNumberElement
                options={{
                  showIcon: true,
                  style: cardInputStyle,
                  placeholder: t('text-card-number'),
                }}
                className="h-auto rounded border border-solid border-[#D4D8DD] bg-white py-[14px] px-4 text-black transition-all duration-300"
              />
            </Label>
          </div>

          <div className="flex flex-wrap gap-5 lg:flex-nowrap">
            <Label className="mb-0 max-w-full basis-full lg:max-w-[50%] lg:basis-1/2">
              <span className="mb-2 block text-sm font-semibold text-black">
                {t('text-card-expiry')}
              </span>
              <CardExpiryElement
                options={{
                  style: cardInputStyle,
                  placeholder: t('text-expire-date-placeholder'),
                }}
                className="h-auto rounded border border-solid border-[#D4D8DD] bg-white py-[14px] px-4 text-black transition-all duration-300"
              />
            </Label>

            <Label className="mb-0 max-w-full basis-full lg:max-w-[50%] lg:basis-1/2">
              <span className="mb-2 block text-sm font-semibold text-black">
                {t('text-card-cvc')}
              </span>
              <CardCvcElement
                options={{
                  style: cardInputStyle,
                  placeholder: t('text-card-cvc'),
                }}
                className="h-auto rounded border border-solid border-[#D4D8DD] bg-white py-[14px] px-4 text-black transition-all duration-300"
              />
            </Label>
          </div>

          {isAuthorized && type === 'checkout' && (
            <Checkbox
              name="save_card"
              label={t('text-save-card')}
              className="mt-3"
              onChange={changeSaveCard}
              checked={saveCard}
            />
          )}

          {isAuthorized && type === 'save_card' && (
            <Checkbox
              name="make_default_card"
              label={t('text-add-default-card')}
              className="mt-3"
              onChange={changeDefaultCard}
              checked={defaultCard}
            />
          )}

          <div className="lg:mt-4">
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="StripePay px-11 text-sm shadow-none"
            >
              {type === 'checkout' ? t('text-pay') : t('text-save')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StripeBaseForm;
