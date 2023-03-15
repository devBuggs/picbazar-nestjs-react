import { useState } from 'react';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useVerifyCouponMutation } from '@/graphql/coupons.graphql';
import { useTranslation } from 'next-i18next';
import { couponAtom } from '@/contexts/checkout';
import { useAtom } from 'jotai';

const Coupon = ({ subtotal }: { subtotal: number }) => {
  const { t } = useTranslation('common');
  const [hasCoupon, setHasCoupon] = useState(false);
  const [coupon, applyCoupon] = useAtom(couponAtom);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [verifyCoupon, { loading }] = useVerifyCouponMutation({
    onCompleted: (data) => {
      if (data?.verifyCoupon?.is_valid) {
        //@ts-ignore
        applyCoupon(data?.verifyCoupon?.coupon);
        setHasCoupon(false);
        return;
      }
      if (!data?.verifyCoupon?.is_valid) {
        setError('code', {
          type: 'manual',
          message: t(`common:${data?.verifyCoupon?.message}`),
        });
      }
    },
  });

  if (!hasCoupon && !coupon) {
    return (
      <p
        role="button"
        className="text-xs font-bold transition duration-200 text-body hover:text-accent"
        onClick={() => setHasCoupon(true)}
      >
        {t('text-have-coupon')}
      </p>
    );
  }

  function onSubmit(value: any) {
    verifyCoupon({
      variables: {
        code: value.code,
        sub_total: subtotal,
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col w-full pt-1 sm:flex-row"
    >
      <Input
        {...register('code', { required: 'text-coupon-required' })}
        placeholder={t('text-enter-coupon')}
        variant="outline"
        className="flex-1 mb-4 sm:mb-0 sm:me-4"
        dimension="small"
        showLabel={false}
        error={t(errors?.code?.message!)}
      />
      <Button
        loading={loading}
        disabled={loading}
        size="small"
        className="w-full sm:w-40 lg:w-auto mt-0.5"
      >
        {t('text-apply')}
      </Button>
    </form>
  );
};

export default Coupon;
