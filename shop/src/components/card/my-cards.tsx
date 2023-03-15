import CardViewHeader from './card-view-header';
import CardsView from './card-view';
import { useCards } from '@/framework/card';
import ErrorMessage from '@/components/ui/error-message';
import Spinner from '@/components/ui/loaders/spinner/spinner';

const MyCards: React.FC = () => {
  const { cards, isLoading, error } = useCards();

  if (isLoading) {
    return <Spinner showText={false} />;
  }

  if (error) return <ErrorMessage message={error?.message} />;

  return (
    <>
      <CardViewHeader />
      <CardsView payments={cards} />
    </>
  );
};

export default MyCards;
