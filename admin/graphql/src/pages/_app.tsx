import type { AppProps /*, AppContext */ } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/main.css';
import { useApollo } from '@/utils/apollo';
import { UIProvider } from '@/contexts/ui.context';
import { SettingsProvider } from '@/contexts/settings.context';
import { useSettingsQuery } from '@/graphql/settings.graphql';
import ErrorMessage from '@/components/ui/error-message';
import PageLoader from '@/components/ui/page-loader/page-loader';
import { ToastContainer } from 'react-toastify';
import { appWithTranslation } from 'next-i18next';
import DefaultSeo from '@/components/ui/default-seo';
import ManagedModal from '@/components/ui/modal/managed-modal';
import { ModalProvider } from '@/components/ui/modal/modal.context';
import PrivateRoute from '@/utils/private-route';
import { CartProvider } from '@/contexts/quick-cart/cart.context';
import { useRouter } from 'next/router';
import { Config } from '@/config';

const Noop: React.FC = ({ children }) => <>{children}</>;

const AppSettings: React.FC = (props) => {
  const { locale } = useRouter();
  const { data, loading, error } = useSettingsQuery({
    variables: { language: locale },
  });
  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  return <SettingsProvider initialValue={data?.settings?.options} {...props} />;
};

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);
  const Layout = (Component as any).Layout || Noop;
  const authProps = (Component as any).authenticate;
  const { locale } = useRouter();
  const dir = Config.getDirection(locale);

  return (
    <div dir={dir}>
      <ApolloProvider client={apolloClient}>
        <AppSettings>
          <UIProvider>
            <ModalProvider>
              <CartProvider>
                <>
                  <DefaultSeo />
                  {authProps ? (
                    <PrivateRoute authProps={authProps}>
                      <Layout {...pageProps}>
                        <Component {...pageProps} />
                      </Layout>
                    </PrivateRoute>
                  ) : (
                    <Layout {...pageProps}>
                      <Component {...pageProps} />
                    </Layout>
                  )}
                  <ToastContainer autoClose={2000} theme="colored" />
                  <ManagedModal />
                </>
              </CartProvider>
            </ModalProvider>
          </UIProvider>
        </AppSettings>
      </ApolloProvider>
    </div>
  );
};

export default appWithTranslation(CustomApp);
