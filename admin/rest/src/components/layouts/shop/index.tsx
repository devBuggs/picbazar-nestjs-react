import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/layouts/navigation/top-navbar';
import { getAuthCredentials, hasAccess } from '@/utils/auth-utils';
import SidebarItem from '@/components/layouts/navigation/sidebar-item';
import { siteSettings } from '@/settings/site.settings';
import { useTranslation } from 'next-i18next';
import MobileNavigation from '@/components/layouts/navigation/mobile-navigation';

const ShopLayout: React.FC = ({ children }) => {
  const { t } = useTranslation();
  const {
    query: { shop },
    locale,
  } = useRouter();

  const { permissions: currentUserPermissions } = getAuthCredentials();

  const SidebarItemMap = () => (
    <Fragment>
      {siteSettings.sidebarLinks.shop.map(
        ({ href, label, icon, permissions }) => {
          if (!hasAccess(permissions, currentUserPermissions)) return null;
          return (
            <SidebarItem
              key={label}
              href={href(shop?.toString()!)}
              label={t(label)}
              icon={icon}
            />
          );
        }
      )}
    </Fragment>
  );

  const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';

  return (
    <div
      className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150"
      dir={dir}
    >
      <Navbar />
      <MobileNavigation>
        <SidebarItemMap />
      </MobileNavigation>

      <div className="flex flex-1 pt-20">
        <aside className="xl:w-76 ltr:left-0 ltr:right-auto rtl:right-0 rtl:left-auto fixed bottom-0 hidden h-full w-72 overflow-y-auto bg-white px-4 pt-22 shadow lg:block">
          <div className="flex flex-col space-y-6 py-3">
            <SidebarItemMap />
          </div>
        </aside>
        <main className="ltr:lg:pl-72 ltr:xl:pl-76 rtl:lg:pr-72 rtl:xl:pr-76 rtl:lg:pl-0 w-full">
          <div className="h-full p-5 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};
export default ShopLayout;
