import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import { ChevronDown } from '@/components/icons/chevronDownIcon';
import Link from '@/components/ui/link';
import { PlusIcon } from '@/components/icons/plus-icon';
import { EditIcon } from '@/components/icons/edit';

export type LanguageListBoxProps = {
  title: string;
  items: any;
  translate: string;
  slug: string;
  id: string;
  routes: any;
};

const LanguageListbox = ({
  title,
  items,
  translate,
  slug,
  routes,
}: LanguageListBoxProps) => {
  const { t } = useTranslation('common');
  const {
    locale,
    query: { shop },
  } = useRouter();

  const currentSelectedItem = locale
    ? items?.find((o: any) => o?.value === locale)!
    : items[2];

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="text-left font-medium text-black w-full p-4 border-b border-solid border-[#E5E5EB] bg-white flex items-center justify-between">
            {title}
            <span className="text-[#8A8F9C]">
              <ChevronDown
                className={`${
                  open ? 'rotate-180 transform origin-center' : ''
                } h-4 w-4`}
              />
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className="py-2">
            {items?.map((option: any, index: string) => (
              <span
                key={`language-${index}`}
                className={`flex items-center cursor-pointer relative px-4 py-2 transition-all hover:bg-white ${
                  currentSelectedItem?.id === option?.id ? 'bg-white' : ''
                }`}
              >
                {option?.icon}
                <span className="ltr:ml-3 rtl:mr-3">{t(option?.name)}</span>
                {translate === 'true' ? (
                  <span className="ltr:ml-auto rtl:mr-auto cursor-pointer text-base transition duration-200 hover:text-heading">
                    <Link
                      href={routes.edit(slug, option?.id, shop)}
                      key={option?.id}
                      locale={false}
                      className="absolute top-0 left-0 w-full h-full"
                    ></Link>
                    <EditIcon width={16} />
                  </span>
                ) : (
                  <>
                    <span className="ltr:ml-auto rtl:mr-auto cursor-pointer text-base transition duration-200 hover:text-heading">
                      <Link
                        href={routes.translate(slug, option?.id, shop)}
                        key={option?.id}
                        locale={false}
                        className="absolute top-0 left-0 w-full h-full"
                      ></Link>
                      <PlusIcon width={24} />
                    </span>
                  </>
                )}
              </span>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default LanguageListbox;
