import { Routes } from '@/config/routes';
import { PaymentGateway } from '@/types';

export const siteSettings = {
  name: 'PickBazar',
  description: '',
  logo: {
    url: '/logo.svg',
    alt: 'PickBazar',
    href: '/grocery',
    width: 128,
    height: 40,
  },
  defaultLanguage: 'en',
  currencyCode: 'USD',
  product: {
    placeholderImage: '/product-placeholder.svg',
    cardMaps: {
      grocery: 'Krypton',
      furniture: 'Radon',
      bag: 'Oganesson',
      makeup: 'Neon',
      book: 'Xenon',
      medicine: 'Helium',
      default: 'Argon',
    },
  },
  authorizedLinks: [
    { href: Routes.profile, label: 'auth-menu-profile' },
    { href: Routes.orders, label: 'auth-menu-my-orders' },
    { href: Routes.wishlists, label: 'profile-sidebar-my-wishlist' },
    { href: Routes.checkout, label: 'auth-menu-checkout' },
  ],
  authorizedLinksMobile: [
    { href: Routes.profile, label: 'auth-menu-profile' },
    { href: Routes.orders, label: 'auth-menu-my-orders' },
    { href: Routes.cards, label: 'profile-sidebar-my-cards' },
    { href: Routes.wishlists, label: 'profile-sidebar-my-wishlist' },
    { href: Routes.refunds, label: 'text-my-refunds' },
    { href: Routes.checkout, label: 'auth-menu-checkout' },
    { href: Routes.changePassword, label: 'profile-sidebar-password' },
  ],
  dashboardSidebarMenu: [
    {
      href: Routes.profile,
      label: 'profile-sidebar-profile',
    },
    {
      href: Routes.changePassword,
      label: 'profile-sidebar-password',
    },
    {
      href: Routes.orders,
      label: 'profile-sidebar-orders',
    },
    {
      href: Routes.downloads,
      label: 'profile-sidebar-downloads',
    },
    {
      href: Routes.wishlists,
      label: 'profile-sidebar-my-wishlist',
    },
    {
      href: Routes.questions,
      label: 'profile-sidebar-my-questions',
    },
    {
      href: Routes.refunds,
      label: 'text-my-refunds',
    },
    {
      href: Routes.reports,
      label: 'profile-sidebar-my-reports',
    },
    {
      href: Routes.cards,
      label: 'profile-sidebar-my-cards',
      // MultiPayment: Make it dynamic or from mapper
      cardsPayment: [PaymentGateway.STRIPE],
    },
    {
      href: Routes.help,
      label: 'profile-sidebar-help',
    },
    {
      href: Routes.logout,
      label: 'profile-sidebar-logout',
    },
  ],
  sellingAdvertisement: {
    image: {
      src: '/selling.png',
      alt: 'Selling Advertisement',
    },
  },
  cta: {
    mockup_img_src: '/mockup-img.png',
    play_store_link: '/',
    app_store_link: '/',
  },
  footer: {
    copyright: {
      name: 'RedQ, Inc',
      href: 'https://redq.io/',
    },
    address: '2429 River Drive, Suite 35 Cottonhall, CA 2296 United Kingdom',
    email: 'dummy@dummy.com',
    phone: '+1 256-698-0694',
    menus: [
      {
        title: 'text-explore',
        links: [
          {
            name: 'text-about-us',
            href: '/',
          },
          {
            name: 'text-sitemap',
            href: '/',
          },
          {
            name: 'text-bookmarks',
            href: '/',
          },
          {
            name: 'text-sign-join',
            href: '/',
          },
        ],
      },
      {
        title: 'text-customer-service',
        links: [
          {
            name: 'text-faq-help',
            href: Routes.help,
          },
          {
            name: 'text-returns',
            href: '/',
          },
          {
            name: 'text-accessibility',
            href: '/',
          },
          {
            name: 'text-contact-us',
            href: Routes.contactUs,
          },
          {
            name: 'text-store-pickup',
            href: '/',
          },
        ],
      },
      {
        title: 'text-our-information',
        links: [
          {
            name: 'text-privacy-update',
            href: Routes.privacy,
          },
          {
            name: 'text-terms-condition',
            href: Routes.terms,
          },
          {
            name: 'text-return-policy',
            href: '/',
          },
          {
            name: 'text-sitemap',
            href: '/',
          },
        ],
      },
    ],
    payment_methods: [
      {
        img: '/payment/master.png',
        url: '/',
      },
      {
        img: '/payment/skrill.png',
        url: '/',
      },
      {
        img: '/payment/paypal.png',
        url: '/',
      },
      {
        img: '/payment/visa.png',
        url: '/',
      },
      {
        img: '/payment/discover.png',
        url: '/',
      },
    ],
  },
};
