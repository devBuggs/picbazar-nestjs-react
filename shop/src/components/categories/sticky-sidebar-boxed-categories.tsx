import Scrollbar from '@/components/ui/scrollbar';
import NotFound from '@/components/ui/not-found';
import CategoriesLoader from '@/components/ui/loaders/categories-loader';
import OutlinedBoxedCategoryMenu from '@/components/ui/outlined-boxed-category';
import type { Category } from '@/types';

interface StickySidebarBoxedCategoriesProps {
  notFound: boolean;
  loading: boolean;
  categories: Category[];
  className?: string;
}
const StickySidebarBoxedCategories: React.FC<
  StickySidebarBoxedCategoriesProps
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
      className={`hidden h-full w-full bg-light lg:sticky lg:top-22 lg:w-[380px] lg:bg-gray-100 xl:block ${className}`}
    >
      <Scrollbar style={{ maxHeight: 'calc(100vh - 88px)' }}>
        <div className="p-5">
          {!notFound ? (
            <div className="grid grid-cols-2 gap-4">
              <OutlinedBoxedCategoryMenu items={categories} className="py-8" />
            </div>
          ) : (
            <div className="min-h-full px-4 pt-6 pb-8 lg:p-8">
              <NotFound text="text-no-category" className="h-96" />
            </div>
          )}
        </div>
      </Scrollbar>
    </aside>
  );
};

export default StickySidebarBoxedCategories;
