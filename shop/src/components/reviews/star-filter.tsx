import Select from '@/components/ui/select/select';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsRTL } from '@/lib/locals';
interface Plan {
  id: number | string;
  key: string;
  label: string;
  value: number | string;
}
const plans: Plan[] = [
  {
    id: '1',
    key: 'sorting',
    label: 'All Star',
    value: 'default',
  },
  {
    id: '2',
    key: 'sorting',
    label: '5 Star',
    value: '5',
  },
  {
    id: '3',
    key: 'sorting',
    label: '4 Star',
    value: '4',
  },
  {
    id: '4',
    key: 'sorting',
    label: '3 Star',
    value: '3',
  },
  {
    id: '5',
    key: 'sorting',
    label: '2 Star',
    value: '2',
  },
  {
    id: '6',
    key: 'sorting',
    label: '1 Star',
    value: '1',
  },
];

const StarFilter = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { isRTL } = useIsRTL();
  const [selected, setSelected] = useState(
    () => plans.find((plan) => plan.value === router.query.rating) ?? plans[0]
  );

  useEffect(() => {
    if (!router.query.rating) {
      setSelected(plans[0]);
    }
  }, [router.query.rating]);

  function handleChange(values: Plan) {
    const { value } = values;
    const { rating, ...restQuery } = router.query;
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...restQuery,
          ...(value === 'default' ? {} : { rating: value }),
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
        {t('text-filter')} :
      </span>
      <Select
        defaultValue={selected}
        // value={selected}
        isRtl={isRTL}
        isMinimal={true}
        isSearchable={false}
        options={plans}
        width={100}
        // @ts-ignore
        onChange={handleChange}
      />
    </div>
  );
};

export default StarFilter;
