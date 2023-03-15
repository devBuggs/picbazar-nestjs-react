import { useTranslation } from 'next-i18next';

const CashOnDelivery = () => {
  const { t } = useTranslation('common');
  return (
    <span className="block text-sm text-body">{t('text-cod-message')}</span>
  );
};
export default CashOnDelivery;
