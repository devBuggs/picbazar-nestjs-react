import { useTranslation } from 'next-i18next';
import { CreateAbusiveReportInput } from '__generated__/__types__';
import { Form } from '@/components/ui/form/form';
import TextArea from '@/components/ui/text-area';
import Button from '@/components/ui/button';
import { useCreateAbuseReportMutation } from '@/graphql/reviews.graphql';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { toast } from 'react-toastify';

export default function AbuseReport({ data }: { data: any }) {
  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();
  const [createAbuseReport, { loading: isLoading }] =
    useCreateAbuseReportMutation({
      onCompleted: () => {
        closeModal();
        toast.success(t('text-abuse-report-submitted'));
      },
    });
  function onSubmit(values: Pick<CreateAbusiveReportInput, 'message'>) {
    createAbuseReport({
      variables: {
        input: {
          ...data,
          ...values,
        },
      },
    });
  }
  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light p-7 md:h-auto md:min-h-0 md:max-w-[590px] md:rounded-xl">
      <Form<CreateAbusiveReportInput> onSubmit={onSubmit}>
        {({ register }) => (
          <div className="space-y-4">
            <TextArea label={t('text-reason')} {...register('message')} />
            <Button loading={isLoading} disabled={isLoading}>
              {t('text-report')}
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}
