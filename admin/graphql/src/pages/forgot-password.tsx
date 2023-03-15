import ForgotPasswordForm from '@/components/auth/forget-password/forget-password';
import AuthPageLayout from '@/components/layouts/auth-layout';
import { getAuthCredentials, isAuthenticated } from '@/utils/auth-utils';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { Routes } from '@/config/routes';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'form'])),
  },
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { token, permissions } = getAuthCredentials();
  if (isAuthenticated({ token, permissions })) {
    router.replace(Routes.dashboard);
  }
  const { t } = useTranslation();
  return (
    <AuthPageLayout>
      <h3 className="text-center text-base italic text-body mb-6 mt-4">
        {t('form:form-title-forgot-password')}
      </h3>
      <ForgotPasswordForm />
    </AuthPageLayout>
  );
}
