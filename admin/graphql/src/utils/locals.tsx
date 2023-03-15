// import { useRouter } from "next/router";
// const localeRTLList = ["ar", "he"];
// export function useIsRTL() {
//   const { locale } = useRouter();
//   if (locale && localeRTLList.includes(locale)) {
//     return { isRTL: true, alignLeft: "right", alignRight: "left" };
//   }
//   return { isRTL: false, alignLeft: "left", alignRight: "right" };
// }

import { useRouter } from 'next/router';
import { SAFlag } from '@/components/icons/flags/SAFlag';
import { CNFlag } from '@/components/icons/flags/CNFlag';
import { USFlag } from '@/components/icons/flags/USFlag';
import { DEFlag } from '@/components/icons/flags/DEFlag';
import { ILFlag } from '@/components/icons/flags/ILFlag';
import { ESFlag } from '@/components/icons/flags/ESFlag';

const localeRTLList = ['ar', 'he'];
export function useIsRTL() {
  const { locale } = useRouter();
  if (locale && localeRTLList.includes(locale)) {
    return { isRTL: true, alignLeft: 'right', alignRight: 'left' };
  }
  return { isRTL: false, alignLeft: 'left', alignRight: 'right' };
}

export let languageMenu = [
  {
    id: 'ar',
    name: 'عربى',
    value: 'ar',
    icon: <SAFlag width="20px" height="15px" />,
  },
  {
    id: 'zh',
    name: '中国人',
    value: 'zh',
    icon: <CNFlag width="20px" height="15px" />,
  },
  {
    id: 'en',
    name: 'English',
    value: 'en',
    icon: <USFlag width="20px" height="15px" />,
  },
  {
    id: 'de',
    name: 'Deutsch',
    value: 'de',
    icon: <DEFlag width="20px" height="15px" />,
  },
  {
    id: 'he',
    name: 'rעברית',
    value: 'he',
    icon: <ILFlag width="20px" height="15px" />,
  },
  {
    id: 'es',
    name: 'Español',
    value: 'es',
    icon: <ESFlag width="20px" height="15px" />,
  },
];
