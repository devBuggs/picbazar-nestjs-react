import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteQuestionMutation } from '@/graphql/questions.graphql';

const QuestionDeleteView = () => {
  const [deleteQuestionById, { loading }] = useDeleteQuestionMutation({
    //@ts-ignore
    update(cache, { data: { deleteQuestion } }) {
      cache.modify({
        fields: {
          tags(existingRefs, { readField }) {
            return existingRefs.data.filter(
              (ref: any) => deleteQuestion.id !== readField('id', ref)
            );
          },
        },
      });
    },
  });

  const { data } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    deleteQuestionById({ variables: { id: data?.id } });
    closeModal();
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default QuestionDeleteView;
