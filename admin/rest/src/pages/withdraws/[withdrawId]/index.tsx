import { adminOnly } from '@/utils/auth-utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Loader from '@/components/ui/loader/loader';
import ErrorMessage from '@/components/ui/error-message';
import Button from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import SelectInput from '@/components/ui/select-input';
import ValidationError from '@/components/ui/form-validation-error';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import AdminLayout from '@/components/layouts/admin';
import { useWithdrawQuery } from '@/data/withdraw';
import { useApproveWithdrawMutation } from '@/data/withdraw';
import Card from '@/components/common/card';

type FormValues = {
  status: any;
};
const WithdrawStatus = [
  {
    name: 'Approved',
    id: 'approved',
  },
  {
    name: 'On Hold',
    id: 'on_hold',
  },
  {
    name: 'Processing',
    id: 'processing',
  },
  {
    name: 'Pending',
    id: 'pending',
  },
  {
    name: 'Rejected',
    id: 'rejected',
  },
];

const Withdraw = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    query: { withdrawId },
  } = router;

  const {
    withdraw,
    error,
    isLoading: loading,
  } = useWithdrawQuery({ id: withdrawId as string });

  useEffect(() => {
    if (withdraw?.status) {
      setValue(
        'status',
        WithdrawStatus?.find((status) => status.id === withdraw?.status)
      );
    }
  }, [withdraw?.status]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const { mutate: approveWithdraw, isLoading: approving } =
    useApproveWithdrawMutation();

  function handleApproveWithdraw({ status }: any) {
    approveWithdraw({
      id: withdrawId as string,
      status: status.id,
    });
  }

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <h3 className="mb-6 w-full text-xl font-semibold text-heading">
        {t('common:text-withdrawal-info')}
      </h3>
      <Card className="flex flex-col">
        <div className="flex flex-col items-start md:flex-row">
          <form
            onSubmit={handleSubmit(handleApproveWithdraw)}
            className="mb-5 flex w-full items-start ms-auto md:order-2 md:mb-0 md:w-1/2 md:ps-3"
          >
            <div className="z-20 w-full me-5">
              <SelectInput
                name="status"
                control={control}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.id}
                options={WithdrawStatus}
                placeholder={t('form:input-placeholder-order-status')}
                rules={{
                  required: 'Status is required',
                }}
              />

              <ValidationError message={t(errors?.status?.message)} />
            </div>
            <Button loading={approving}>
              <span className="hidden sm:block">
                {t('form:button-label-change-status')}
              </span>
              <span className="block sm:hidden">
                {t('form:form:button-label-change')}
              </span>
            </Button>
          </form>

          <div className="w-full md:order-1 md:w-1/2 md:pe-3">
            <div className="mb-2 flex items-center justify-start">
              <div className="flex w-4/12 flex-shrink-0 justify-between text-sm text-body me-5">
                <span>{t('common:text-amount')}</span>
                <span>:</span>
              </div>
              <div className="flex w-full items-center rounded border border-gray-300 px-4 py-3 xl:w-5/12">
                <span className="font-semibold text-heading">
                  {withdraw?.amount}
                </span>
              </div>
            </div>

            <div className="mb-2 flex items-center">
              <div className="flex w-4/12 flex-shrink-0 justify-between text-sm text-body me-5">
                <span>{t('common:text-payment-method')}</span>
                <span>:</span>
              </div>
              <span className="w-full text-sm font-semibold text-heading">
                {withdraw?.payment_method ?? 'N/A'}
              </span>
            </div>

            <div className="flex items-center">
              <div className="flex w-4/12 flex-shrink-0 justify-between text-sm text-body me-5">
                <span>{t('common:text-status')}</span>
                <span>:</span>
              </div>
              <span className="w-full text-sm font-semibold text-heading">
                {
                  WithdrawStatus?.find(
                    (status) => status.id === withdraw?.status
                  )?.name
                }
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {withdraw?.details && (
          <Card className="flex flex-col">
            <div className="mb-2 text-sm font-semibold text-heading">
              <span>{t('common:text-details')} :</span>
            </div>

            <span className="text-sm text-body">{withdraw?.details}</span>
          </Card>
        )}

        {withdraw?.note && (
          <Card className="flex flex-col">
            <div className="mb-2 text-sm font-semibold text-heading">
              <span>{t('common:text-note')} :</span>
            </div>

            <span className="text-sm text-body">{withdraw?.note}</span>
          </Card>
        )}
      </div>
    </>
  );
};

export default Withdraw;

Withdraw.authenticate = {
  permissions: adminOnly,
};
Withdraw.Layout = AdminLayout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['table', 'common', 'form'])),
  },
});
