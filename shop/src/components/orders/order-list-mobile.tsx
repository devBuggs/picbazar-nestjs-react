import type { Order } from '@/types';
import Button from '@/components/ui/button';
import { useTranslation } from 'next-i18next';
import Collapse from 'rc-collapse';
import 'rc-collapse/assets/index.css';
import OrderCard from './order-card';
import { useSelectedOrder } from './order-list';
import OrderDetails from './order-details';

interface OrdersWithLoaderProps {
  hasNextPage: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  orders: Order[];
  loadingStatus?: boolean;
}

const OrderListMobile: React.FC<OrdersWithLoaderProps> = ({
  hasNextPage,
  isLoadingMore,
  onLoadMore,
  orders,
  loadingStatus
}) => {
  const { t } = useTranslation('common');
  const [selectedOrder, setSelectedOrder] = useSelectedOrder();

  return (
    <div className="flex w-full flex-col lg:hidden">
      <div className="flex h-full w-full flex-col px-0 pb-5">
        <h3 className="pb-5 text-xl font-semibold text-heading">
          {t('profile-sidebar-orders')}
        </h3>
        <Collapse
          accordion={true}
          defaultActiveKey="active"
          expandIcon={() => null}
        >
          {orders.map((order, index: number) => (
            <Collapse.Panel
              header={
                <OrderCard
                  key={`mobile_${index}`}
                  order={order}
                  onClick={() => setSelectedOrder(order)}
                  isActive={order?.id === selectedOrder?.id}
                />
              }
              headerClass="accordion-title"
              key={index}
              className="mb-4"
            >
              {selectedOrder && (
                <OrderDetails
                  order={orders.find(({ id }) => id === selectedOrder.id)!}
                  loadingStatus={loadingStatus}
                />
              )}
            </Collapse.Panel>
          ))}

          {hasNextPage && (
            <div className="mt-8 flex justify-center">
              <Button
                loading={isLoadingMore}
                onClick={onLoadMore}
                className="h-11 text-sm font-semibold md:text-base"
              >
                {t('text-load-more')}
              </Button>
            </div>
          )}
        </Collapse>
      </div>
    </div>
  );
};

export default OrderListMobile;
