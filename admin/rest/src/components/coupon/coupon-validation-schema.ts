import * as yup from 'yup';
import { CouponType } from '@/types';

export const couponValidationSchema = yup.object().shape({
  code: yup.string().required('form:error-coupon-code-required'),
  type: yup
    .string()
    .oneOf([CouponType.FIXED, CouponType.PERCENTAGE, CouponType.FREE_SHIPPING])
    .required('form:error-type-required'),
  amount: yup
    .number()
    .moreThan(-1, 'form:error-coupon-amount-must-positive')
    .typeError('form:error-amount-number'),
  minimum_cart_amount: yup
    .number()
    .moreThan(-1, 'form:error-minimum-coupon-amount-must-positive')
    .typeError('form:error-minimum-coupon-amount-number'),
  expire_at: yup.string().required('form:error-expire-date-required'),
  active_from: yup.string().required('form:error-active-date-required'),
});
