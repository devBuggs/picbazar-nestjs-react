import { atom, useAtom } from 'jotai';

const headerSearchAtom = atom(false);

export function useHeaderSearch() {
  const [headerSearch, setHeaderSearch] = useAtom(headerSearchAtom);
  return {
    show: headerSearch,
    toggle: () => setHeaderSearch(!headerSearch),
    showHeaderSearch: () => setHeaderSearch(true),
    hideHeaderSearch: () => setHeaderSearch(false),
  };
}
