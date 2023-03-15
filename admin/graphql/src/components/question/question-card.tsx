import ActionButtons from '@/components/common/action-buttons';

type QuestionCardProps = {
  className?: any;
  record: any;
  id: any;
};

const QuestionCard: React.FC<QuestionCardProps> = ({ record, id }) => {
  const { question, answer } = record;

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-heading text">
        <span className="inline-block uppercase me-1">Q:</span>
        {question}{' '}
      </h3>
      {answer ? (
        <p className="text-sm">
          <span className="inline-block font-semibold uppercase me-1 text-heading">
            A:
          </span>
          {answer}
        </p>
      ) : (
        <ActionButtons id={id} showReplyQuestion={true} />
      )}
    </div>
  );
};

export default QuestionCard;
