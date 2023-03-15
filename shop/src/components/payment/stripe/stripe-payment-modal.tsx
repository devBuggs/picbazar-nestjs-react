import { PaymentGateway, PaymentIntentInfo } from '@/types';
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '@/lib/get-stripejs';
import StripePaymentForm from '@/components/payment/stripe/stripe-payment-form';
import SavedCardViewHeader from '@/components/payment/saved-card-view-header';
import StripeSavedCardsList from '@/components/payment/stripe/stripe-saved-cards-list';
import { useCards } from '@/framework/card';
import React from 'react';
import ErrorMessage from '@/components/ui/error-message';
import Spinner from '@/components/ui/loaders/spinner/spinner';

interface Props {
  paymentIntentInfo: PaymentIntentInfo;
  trackingNumber: string;
  paymentGateway: PaymentGateway;
}

const StripePaymentModal: React.FC<Props> = ({
  paymentIntentInfo,
  trackingNumber,
  paymentGateway,
}) => {
  const { cards, isLoading, error } = useCards();

  if (isLoading) {
    return (
      <div className="h-96 w-screen max-w-md rounded-xl bg-white p-12 lg:w-full lg:min-w-[48rem]">
        <Spinner className="!h-full" showText={false} />
      </div>
    );
  }

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <Elements stripe={getStripe()}>
      {cards?.length > 0 ? (
        <div className="w-full max-w-4xl rounded-xl bg-white p-6 md:p-12">
          <SavedCardViewHeader
            paymentIntentInfo={paymentIntentInfo}
            trackingNumber={trackingNumber}
            paymentGateway={paymentGateway}
          />
          <StripeSavedCardsList view="modal" payments={cards} />
        </div>
      ) : (
        <StripePaymentForm
          paymentIntentInfo={paymentIntentInfo}
          trackingNumber={trackingNumber}
          paymentGateway={paymentGateway}
        />
      )}
    </Elements>
  );
};

export default StripePaymentModal;
