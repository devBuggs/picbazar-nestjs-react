import { siteSettings } from '@/config/site';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import DrawerWrapper from '@/components/ui/drawer/drawer-wrapper';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';
import { useLogout, useUser } from '@/framework/user';

export default function MobileAuthorizedMenu() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { me } = useUser();
  const [_, closeSidebar] = useAtom(drawerAtom);
  const { mutate: logout } = useLogout();

  function handleClick(path: string) {
    router.push(path);
    closeSidebar({ display: false, view: '' });
  }

  return (
    <DrawerWrapper>
      <ul className="flex-grow">
        <li className="flex w-full items-center justify-between border-t border-dashed border-border-200 bg-gray-100 px-5 pt-3 text-sm font-semibold capitalize text-body focus:outline-none ltr:text-left rtl:text-right md:px-8">
          <span>{t('text-total-points')}</span>
          <span>{me?.wallet?.total_points ?? 0}</span>
        </li>
        <li className="flex w-full items-center justify-between bg-gray-100 px-5 pt-3 text-sm font-semibold capitalize text-body focus:outline-none ltr:text-left rtl:text-right md:px-8">
          <span>{t('text-points-used')}</span>
          <span>{me?.wallet?.points_used ?? 0}</span>
        </li>
        <li className="flex w-full items-center justify-between border-b border-dashed border-border-200 bg-gray-100 px-5 py-3 text-sm font-semibold capitalize text-body focus:outline-none ltr:text-left rtl:text-right md:px-8">
          <span>{t('text-available-points')}</span>
          <span>{me?.wallet?.available_points ?? 0}</span>
        </li>

        {siteSettings.authorizedLinksMobile.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <span
              className="block cursor-pointer px-5 py-3 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent md:px-8"
              onClick={() => handleClick(href)}
            >
              {t(label)}
            </span>
          </li>
        ))}

        <li>
          <span
            className="block cursor-pointer px-5 py-3 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent md:px-8"
            onClick={() => logout()}
          >
            {t('auth-menu-logout')}
          </span>
        </li>
      </ul>
    </DrawerWrapper>
  );
}
