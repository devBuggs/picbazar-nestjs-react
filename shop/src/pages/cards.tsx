import Seo from '@/components/seo/seo';
import DashboardLayout from '@/layouts/_dashboard';
import MyCards from '@/components/card/my-cards';
import Card from '@/components/ui/cards/card';
import { useSettings } from '@/framework/settings';
import {PaymentGateway} from '@/types';

export { getStaticProps } from '@/framework/general.ssr';

const MyCardsPage = () => {
  const { settings } = useSettings();

  // Make it dynamic
  if (![PaymentGateway.STRIPE]?.includes(settings?.paymentGateway?.toUpperCase() as PaymentGateway)) {
    return null;
  }

  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <Card className="shadow-n w-full self-stretch md:p-16 md:pt-12">
        <MyCards />
      </Card>
    </>
  );
};

MyCardsPage.authenticationRequired = true;

MyCardsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MyCardsPage;
