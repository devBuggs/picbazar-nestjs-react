import { PencilIcon } from '@/components/icons/pencil-icon';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { formatAddress } from '@/utils/format-address';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

interface AddressProps {
  address: any;
  checked: boolean;
  userId: string;
}

const AddressCard: React.FC<AddressProps> = ({ checked, address, userId }) => {
  const { t } = useTranslation();
  const { openModal } = useModalAction();

  function onEdit() {
    openModal('ADD_OR_UPDATE_ADDRESS', { customerId: userId, address });
  }

  return (
    <div
      className={classNames(
        'group relative h-full cursor-pointer overflow-hidden rounded border p-4 hover:border-accent',
        {
          'border-accent shadow-sm': checked,
          'border-transparent bg-gray-100': !checked,
        }
      )}
    >
      <p className="mb-3 truncate text-sm font-semibold capitalize text-heading">
        {address.title}
      </p>
      <p className="group flex flex-col text-sm text-sub-heading">
        {formatAddress(address.address)}
      </p>
      <div className="absolute top-4 flex opacity-0 end-4 space-s-2 group-hover:opacity-100">
        {onEdit && (
          <button
            className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-light"
            onClick={onEdit}
          >
            <span className="sr-only">{t('text-edit')}</span>
            <PencilIcon className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
