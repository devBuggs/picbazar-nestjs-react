import Card from '@/components/ui/cards/card';
import Seo from '@/components/seo/seo';
import WishlistProducts from '@/components/products/wishlist-products';
import { useWindowSize } from '@/lib/use-window-size';
import dynamic from 'next/dynamic';
import DashboardLayout from '@/layouts/_dashboard';

export { getStaticProps } from '@/framework/general.ssr';
const CartCounterButton = dynamic(
  () => import('@/components/cart/cart-counter-button'),
  { ssr: false }
);
const MyWishlistPage = () => {
  const { width } = useWindowSize();
  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <Card className="w-full shadow-none sm:shadow">
        <WishlistProducts />
      </Card>
      {width > 1023 && <CartCounterButton />}
    </>
  );
};

MyWishlistPage.authenticationRequired = true;

MyWishlistPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MyWishlistPage;
