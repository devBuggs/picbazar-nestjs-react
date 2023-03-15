import Card from '@/components/ui/cards/card';
import Seo from '@/components/seo/seo';
import DashboardLayout from '@/layouts/_dashboard';
import MyQuestions from '@/components/questions/my-questions';
export { getStaticProps } from '@/framework/general.ssr';

const MyQuestionsPage = () => {
  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <Card className="w-full shadow-none sm:shadow">
        <MyQuestions />
      </Card>
    </>
  );
};

MyQuestionsPage.authenticationRequired = true;

MyQuestionsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MyQuestionsPage;
