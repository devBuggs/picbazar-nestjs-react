import ProgressBox from '@/components/ui/progress-box/progress-box';
import { OrderStatus, PaymentStatus } from '@/types/custom-types';
import { filterOrderStatus, ORDER_STATUS } from '@/utils/order-status';

interface Props {
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
}

const OrderStatusProgressBox = ({ paymentStatus, orderStatus }: Props) => {
  const currentStatusIndex =
    ORDER_STATUS.findIndex((o) => o.status === orderStatus) ?? 0;
  const filterStatus = filterOrderStatus(
    ORDER_STATUS,
    paymentStatus!,
    currentStatusIndex
  );

  return (
    <ProgressBox
      data={filterStatus}
      status={orderStatus!}
      filledIndex={currentStatusIndex}
    />
  );
};

export default OrderStatusProgressBox;
