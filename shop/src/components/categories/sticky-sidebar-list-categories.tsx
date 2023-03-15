import Scrollbar from '@/components/ui/scrollbar';
import NotFound from '@/components/ui/not-found';
import TreeMenu from '@/components/ui/tree-menu';
import CategoriesLoader from '@/components/ui/loaders/categories-loader';
import { isMobile } from 'react-device-detect';
import type { Category } from '@/types';

interface StickySidebarListCategoriesProps {
  notFound: boolean;
  loading: boolean;
  categories: Category[];
  className?: string;
}

const StickySidebarListCategories: React.FC<
  StickySidebarListCategoriesProps
> = ({ notFound, categories, loading, className }) => {
  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="mt-8 w-72 px-2">
          <CategoriesLoader />
        </div>
      </div>
    );
  }
  return (
    <aside
      className={`hidden h-full bg-light lg:sticky lg:top-22 xl:block xl:w-72 ${className}`}
    >
      {!isMobile && (
        <div className="max-h-full flex-grow overflow-hidden">
          <Scrollbar
            className="max-h-screen w-full"
            style={{ height: 'calc(100vh - 5.35rem)' }}
          >
            {!notFound ? (
              <div className="px-5">
                <TreeMenu items={categories} className="xl:py-8" />
              </div>
            ) : (
              <div className="min-h-full w-full px-9 pt-6 pb-8 lg:p-8">
                <NotFound text="text-no-category" className="h-96" />
              </div>
            )}
          </Scrollbar>
        </div>
      )}

      {isMobile && (
        <div className="max-h-full flex-grow overflow-hidden">
          {!notFound ? (
            <div className="px-5">
              <TreeMenu items={categories} className="xl:py-8" />
            </div>
          ) : (
            <div className="min-h-full w-full px-9 pt-6 pb-8 lg:p-8">
              <NotFound text="text-no-category" className="h-96" />
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default StickySidebarListCategories;
