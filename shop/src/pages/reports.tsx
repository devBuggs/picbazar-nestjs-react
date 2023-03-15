import Card from '@/components/ui/cards/card';
import Seo from '@/components/seo/seo';
import DashboardLayout from '@/layouts/_dashboard';
import MyReports from '@/components/reports/report-view';
export { getStaticProps } from '@/framework/general.ssr';

const MyReportsPage = () => {
  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <Card className="w-full self-stretch shadow-none sm:shadow">
        <MyReports />
      </Card>
    </>
  );
};

MyReportsPage.authenticationRequired = true;

MyReportsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MyReportsPage;
