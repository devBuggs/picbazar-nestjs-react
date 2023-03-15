import QuestionList from '@/components/question/question-list';
import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import { useState } from 'react';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QuestionPaginator, SortOrder, QueryQuestionsOrderByColumn } from '__generated__/__types__';
import { useQuestionsQuery } from '@/graphql/questions.graphql';

export default function Questions() {
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useQuestionsQuery({
    variables: {
      first: 15,
      orderBy: [
        {
          column: QueryQuestionsOrderByColumn.CreatedAt,
          order: SortOrder.Desc,
        },
      ],
      page,
    },
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }

  console.log('data', data?.all_questions);

  return (
    <>
      <Card className="flex flex-col mb-8">
        <div className="flex flex-col items-center w-full md:flex-row">
          <h1 className="text-xl font-semibold text-heading">
            {t('common:sidebar-nav-item-questions')}
          </h1>
        </div>
      </Card>
      <QuestionList
        questions={data?.all_questions as QuestionPaginator}
        onPagination={handlePagination}
        refetch={refetch}
      />
    </>
  );
}
Questions.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common', 'table'])),
  },
});
