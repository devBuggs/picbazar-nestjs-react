import { useModalAction } from '@/components/ui/modal/modal.context';
import { PlusIcon } from '@/components/icons/plus-icon';
import { useTranslation } from 'next-i18next';
import { PaymentGateway, PaymentIntentInfo } from '@/types';

interface Props {
  paymentIntentInfo: PaymentIntentInfo;
  trackingNumber: string;
  paymentGateway: PaymentGateway;
}

const SavedCardViewHeader: React.FC<Props> = ({
  paymentIntentInfo,
  trackingNumber,
  paymentGateway,
}) => {
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');

  const handleAddNewCard = () => {
    openModal('USE_NEW_PAYMENT', {
      paymentIntentInfo,
      trackingNumber,
      paymentGateway,
    });
  };
  return (
    <>
      <div className="mb-8 flex items-center justify-between sm:mb-10">
        <h1 className="text-center text-lg font-semibold text-heading sm:text-xl">
          {t('profile-sidebar-my-cards')}
        </h1>
        <button
          className="flex items-center text-sm font-semibold text-accent"
          onClick={handleAddNewCard}
        >
          <PlusIcon className="mr-1" width={16} height={16} />
          {t('profile-add-cards')}
        </button>
      </div>
    </>
  );
};

export default SavedCardViewHeader;
