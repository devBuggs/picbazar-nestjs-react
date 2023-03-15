import StripeCardForm from '@/components/card/stripe/stripe-card-form';
import { useModalState } from '@/components/ui/modal/modal.context';

const CARDS_FORM_COMPONENTS: any = {
  STRIPE: {
    component: StripeCardForm,
  },
};

const AddNewCardModal = () => {
  const {
    data: { paymentGateway },
  } = useModalState();

  const PaymentMethod = CARDS_FORM_COMPONENTS[paymentGateway?.toUpperCase()];
  const CardFormComponent = PaymentMethod?.component;

  return <CardFormComponent />;
};

export default AddNewCardModal;
