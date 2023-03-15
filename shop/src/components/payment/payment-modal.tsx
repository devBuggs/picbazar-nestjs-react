import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import StripePaymentModal from '@/components/payment/stripe/stripe-payment-modal';
import Modal from '@/components/ui/modal/modal';
import dynamic from 'next/dynamic';

const RazorpayPaymentModal = dynamic(
  () => import('@/components/payment/razorpay/razorpay-payment-modal'),
  { ssr: false }
);

const PAYMENTS_FORM_COMPONENTS: any = {
  STRIPE: {
    component: StripePaymentModal,
    type: 'custom',
  },
  RAZORPAY: {
    component: RazorpayPaymentModal,
    type: 'default',
  },
};

const PaymentModal = () => {
  const {
    isOpen,
    data: { paymentGateway, paymentIntentInfo, trackingNumber },
  } = useModalState();
  const { closeModal } = useModalAction();
  const PaymentMethod = PAYMENTS_FORM_COMPONENTS[paymentGateway?.toUpperCase()];
  const PaymentComponent = PaymentMethod?.component;
  const paymentModalType = PaymentMethod?.type;

  return paymentModalType === 'custom' ? (
    <Modal open={isOpen} onClose={closeModal}>
      <PaymentComponent
        paymentIntentInfo={paymentIntentInfo}
        trackingNumber={trackingNumber}
        paymentGateway={paymentGateway}
      />
    </Modal>
  ) : (
    <PaymentComponent
      paymentIntentInfo={paymentIntentInfo}
      trackingNumber={trackingNumber}
      paymentGateway={paymentGateway}
    />
  );
};

export default PaymentModal;
