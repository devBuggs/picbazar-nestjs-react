const StatusColor = (status: string) => {
  let bg_class = '';
  if (
    status?.toLowerCase() === 'order-pending' ||
    status?.toLowerCase() === 'payment-pending'
  ) {
    bg_class = 'bg-[#EAB308]';
  } else if (
    status?.toLowerCase() === 'order-processing' ||
    status?.toLowerCase() === 'payment-processing'
  ) {
    bg_class = 'bg-[#F59E0B]';
  } else if (
    status?.toLowerCase() === 'order-completed' ||
    status?.toLowerCase() === 'payment-success'
  ) {
    bg_class = 'bg-accent';
  } else if (
    status?.toLowerCase() === 'order-cancelled' ||
    status?.toLowerCase() === 'payment-reversal'
  ) {
    bg_class = 'bg-[#9CA3AF]';
  } else if (
    status?.toLowerCase() === 'order-failed' ||
    status?.toLowerCase() === 'payment-failed'
  ) {
    bg_class = 'bg-[#EF4444]';
  } else if (status?.toLowerCase() === 'order-at-local-facility') {
    bg_class = 'bg-[#10B981]';
  } else if (status?.toLowerCase() === 'order-out-for-delivery') {
    bg_class = 'bg-[#D9D9D9]';
  } else {
    bg_class = 'bg-accent';
  }

  return bg_class;
};

export default StatusColor;
