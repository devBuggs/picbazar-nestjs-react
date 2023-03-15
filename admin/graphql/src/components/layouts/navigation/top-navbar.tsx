import Logo from '@/components/ui/logo';
import { useUI } from '@/contexts/ui.context';
import AuthorizedMenu from './authorized-menu';
import LinkButton from '@/components/ui/link-button';
import { NavbarIcon } from '@/components/icons/navbar-icon';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import {
  adminAndOwnerOnly,
  getAuthCredentials,
  hasAccess,
} from '@/utils/auth-utils';
import LanguageSwitcher from './language-switer';
import { Config } from '@/config';
import { Routes } from '@/config/routes';

const Navbar = () => {
  const { t } = useTranslation();
  const { toggleSidebar } = useUI();
  const { enableMultiLang } = Config;
  const { permissions } = getAuthCredentials();

  return (
    <header className="bg-white shadow fixed w-full z-40">
      <nav className="px-5 md:px-8 py-4 flex items-center justify-between">
        {/* <!-- Mobile menu button --> */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={toggleSidebar}
          className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent lg:hidden"
        >
          <NavbarIcon />
        </motion.button>

        <div className="hidden md:flex ms-5 me-auto">
          <Logo />
        </div>

        <div className="flex items-center space-s-8">
          {hasAccess(adminAndOwnerOnly, permissions) && (
            <LinkButton
              href={Routes.shop.create}
              className="ms-4 md:ms-6"
              size="small"
            >
              {t('common:text-create-shop')}
            </LinkButton>
          )}
          {enableMultiLang ? <LanguageSwitcher /> : null}
          <AuthorizedMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
