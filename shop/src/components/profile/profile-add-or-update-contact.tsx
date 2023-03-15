import { useTranslation } from 'next-i18next';
import { useModalState } from '@/components/ui/modal/modal.context';
import OtpForm from '@/components/otp/otp-form';
import { useUpdateUser } from '@/framework/user';

const ProfileAddOrUpdateContact = () => {
  const { t } = useTranslation('common');
  const {
    data: { customerId, contact, profileId },
  } = useModalState();
  const { mutate: updateProfile } = useUpdateUser();

  function onContactUpdate({ phone_number }: { phone_number: string }) {
    if (!customerId) {
      return false;
    }
    updateProfile({
      id: customerId,
      profile: {
        id: profileId,
        contact: phone_number,
      },
    });
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-light p-5 sm:p-8 md:min-h-0 md:rounded-xl">
      <h1 className="mb-5 text-center text-sm font-semibold text-heading sm:mb-6">
        {contact ? t('text-update') : t('text-add-new')}{' '}
        {t('text-contact-number')}
      </h1>
      <OtpForm phoneNumber={contact} onVerifySuccess={onContactUpdate} />
    </div>
  );
};

export default ProfileAddOrUpdateContact;
