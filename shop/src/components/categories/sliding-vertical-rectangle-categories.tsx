import BakeryCategoryLoader from '@/components/ui/loaders/bakery-categories-loader';
import NotFound from '@/components/ui/not-found';
import SolidBoxedCategoryMenu from '@/components/ui/solid-boxed-categoty';
import type { Category } from '@/types';

interface SlidingVerticalRectangleCategoriesProps {
  notFound: boolean;
  loading: boolean;
  categories: Category[];
}

const SlidingVerticalRectangleCategories: React.FC<
  SlidingVerticalRectangleCategoriesProps
> = ({ notFound, categories, loading }) => {
  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="mt-8 flex h-52 w-full justify-center px-2">
          <BakeryCategoryLoader />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full bg-gray-100">
      {!notFound ? (
        <div className="px-4 pt-5 lg:p-8 lg:pb-0">
          <SolidBoxedCategoryMenu items={categories} className="py-8" />
        </div>
      ) : (
        <div className="min-h-full px-9 pt-6 pb-8 lg:p-8">
          <NotFound text="text-no-category" className="h-96" />
        </div>
      )}
    </div>
  );
};

export default SlidingVerticalRectangleCategories;
