import { useAddCards } from '@/framework/card';
import {
  useStripe,
  useElements,
  CardNumberElement,
  Elements,
} from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import StripeBaseForm from '@/components/payment/stripe/stripe-base-form';
import getStripe from '@/lib/get-stripejs';

const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { addNewCard, isLoading } = useAddCards();
  const [defaultCard, setDefaultCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const cardElement = elements.getElement(CardNumberElement)!;

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: event?.target?.owner_name?.value as string,
        },
      });
    if (paymentMethodError) {
      setCardError(paymentMethodError?.message as string);
      setLoading(false);
    } else {
      setLoading(false);
      await addNewCard({
        method_key: paymentMethod?.id as string,
        default_card: defaultCard as boolean,
      });
    }
  };

  const changeDefaultCard = () => {
    setDefaultCard(!defaultCard);
  };

  useEffect(() => {
    if (!isEmpty(cardError)) {
      setTimeout(() => {
        setCardError('');
      }, 5000);
    }
  }, [cardError]);

  return (
    <StripeBaseForm
      handleSubmit={handleSubmit}
      type={'save_card'}
      loading={loading || isLoading}
      cardError={cardError}
      defaultCard={defaultCard}
      changeDefaultCard={changeDefaultCard}
    />
  );
};

const StripeCardForm = () => {
  return (
    <Elements stripe={getStripe()}>
      <CardForm />
    </Elements>
  );
};

export default StripeCardForm;
