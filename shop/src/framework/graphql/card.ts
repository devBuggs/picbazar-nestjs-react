import {
  useAddNewCardMutation,
  useCardsQuery,
  useDeleteCardMutation,
  useSetDefaultPaymentMethodMutation,
} from '@/framework/gql/card.graphql';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import { useModalAction } from '@/components/ui/modal/modal.context';
import {AddNewCardInput} from '../../../__generated__/__types__';
import { useUser } from '@/framework/user';

export function useCards() {
  const { isAuthorized } = useUser();

  const { data, loading, error } = useCardsQuery({
    skip: !isAuthorized
  });

  return {
    cards: data?.cards ?? [],
    isLoading: loading,
    error,
  };
}

export const useDeleteCard = () => {
  const { t } = useTranslation();
  const { closeModal } = useModalAction();
  const [deleteCardMutation, { loading, error }] = useDeleteCardMutation({
    refetchQueries: ['Cards'],
    onCompleted: () => {
      closeModal();
      toast.success(t('common:card-successfully-deleted'));
    },
  });

  function deleteCard({ id }: { id: string }) {
    deleteCardMutation({
      variables: {
        id,
      },
    });
  }

  return {
    deleteCard,
    isLoading: loading,
    error,
  };
};

export function useAddCards() {
  const { t } = useTranslation();
  const { closeModal } = useModalAction();
  const [addNewCardMutation, { loading, error }] = useAddNewCardMutation({
    refetchQueries: ['Cards'],
      onCompleted: () => {
        closeModal();
        toast.success(t('common:card-successfully-add'), {
          toastId: 'success',
        });
      },
      onError: (error) => {
        const {
          response: { data },
        }: any = error ?? {};

        toast.error(t(data?.message), {
          toastId: 'error',
        });
      },
  });

  function addNewCard(input: AddNewCardInput){
    addNewCardMutation({
      variables: {
        input
      }
    })
  }

  return {
    addNewCard,
    isLoading: loading,
    error
  }
}

export function useDefaultPaymentMethod() {
  const { t } = useTranslation();

  const [setDefaultPaymentMethodMutation, { loading, error }] =
    useSetDefaultPaymentMethodMutation({
      refetchQueries: ['Cards'],
      onCompleted: () => {},
      onError: () => {
        toast.success(t('common:set-default-card-message'));
      },
    });

  function setDefaultPayment({method_id}: {method_id: string}) {
    setDefaultPaymentMethodMutation({
      variables: {
        method_id,
      },
    });
  }

  return {
    createDefaultPaymentMethod: setDefaultPayment,
    isLoading: loading,
    error,
  };
}
