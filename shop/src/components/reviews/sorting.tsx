import Select from '@/components/ui/select/select';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsRTL } from '@/lib/locals';
interface Plan {
  id: number | string;
  key: string;
  label: string;
  value: string;
  orderBy: string;
  sortedBy: 'ASC' | 'DESC';
}
const plans: Plan[] = [
  {
    id: '1',
    key: 'sorting',
    label: 'Recent',
    value: 'created_at',
    orderBy: 'created_at',
    sortedBy: 'DESC',
  },
  {
    id: '2',
    key: 'sorting',
    label: 'Ratings: Low to High',
    value: 'l2h',
    orderBy: 'rating',
    sortedBy: 'ASC',
  },
  {
    id: '3',
    key: 'sorting',
    label: 'Ratings: High to Low',
    value: 'h2l',
    orderBy: 'rating',
    sortedBy: 'DESC',
  },
];

const Sorting = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { isRTL } = useIsRTL();
  const [selected, setSelected] = useState(
    () =>
      plans.find((plan) => plan.orderBy === router.query.orderBy) ?? plans[0]
  );

  useEffect(() => {
    if (!router.query.orderBy) {
      setSelected(plans[0]);
    }
  }, [router.query.orderBy]);

  function handleChange(values: Plan) {
    const { orderBy, sortedBy } = values;
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          orderBy,
          sortedBy,
        },
      },
      undefined,
      { scroll: false }
    );
    setSelected(values);
  }

  return (
    <div className="flex items-center">
      <span className="min-w-[50px] text-sm text-body ltr:mr-2 rtl:ml-2">
        {t('text-sort-by')} :
      </span>
      <Select
        defaultValue={selected}
        isRtl={isRTL}
        isMinimal={true}
        isSearchable={false}
        options={plans}
        width={200}
        // @ts-ignore
        onChange={handleChange}
      />
    </div>
  );
};

export default Sorting;
