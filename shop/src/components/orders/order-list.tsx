import Button from '@/components/ui/button';
import Scrollbar from '@/components/ui/scrollbar';
import { useTranslation } from 'next-i18next';
import OrderCard from './order-card';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import type { Order } from '@/types';

const selectedOrderAtom = atom<Order | null>(null);
export function useSelectedOrder() {
  return useAtom(selectedOrderAtom);
}

export default function OrderList({
  orders,
  hasMore,
  isLoadingMore,
  loadMore,
}: {
  orders: Order[];
  hasMore: boolean;
  isLoadingMore: boolean;
  loadMore: () => void;
}) {
  const { t } = useTranslation('common');
  const [selectedOrder, setSelectedOrder] = useSelectedOrder();
  useEffect(() => {
    if (!selectedOrder && orders.length) {
      setSelectedOrder(orders[0]);
    }
  }, [orders, selectedOrder, setSelectedOrder]);

  return (
    <div className="h-[80vh] min-h-[670px] w-full ltr:pr-5 rtl:pl-5 md:w-1/3 md:shrink-0 ltr:lg:pr-8 rtl:lg:pl-8">
      <div className="flex h-full flex-col bg-white pb-5 md:border md:border-border-200">
        <h3 className="py-5 px-5 text-xl font-semibold text-heading">
          {t('profile-sidebar-orders')}
        </h3>
        <Scrollbar className="w-full" style={{ height: 'calc(100% - 80px)' }}>
          <div className="px-5">
            {orders.map((order: any, index: number) => (
              <OrderCard
                key={index}
                order={order}
                onClick={() => setSelectedOrder(order)}
                isActive={order?.id === selectedOrder?.id}
              />
            ))}
            {hasMore && (
              <div className="mt-8 flex justify-center lg:mt-12">
                <Button
                  loading={isLoadingMore}
                  onClick={loadMore}
                  className="h-11 text-sm font-semibold md:text-base"
                >
                  {t('text-load-more')}
                </Button>
              </div>
            )}
          </div>
        </Scrollbar>
      </div>
    </div>
  );
}
