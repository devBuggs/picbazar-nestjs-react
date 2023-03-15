import Scrollbar from '@/components/ui/scrollbar';
import { Menu, Transition } from '@headlessui/react';
import cn from 'classnames';
import { Fragment } from 'react';
import { getIcon } from '@/lib/get-icon';
import { CaretDown } from '@/components/icons/caret-down';
import * as groupIcons from '@/components/icons/groups';
import { useRouter } from 'next/router';
import Link from '@/components/ui/link';
import { ArrowDownIcon } from '@/components/icons/arrow-down';
import { useTypes } from '@/framework/type';
import useHomepage from '@/lib/hooks/use-homepage';
import type { Type } from '@/types';
import { TYPES_PER_PAGE } from '@/framework/client/variables';

interface GroupsMenuProps {
  className?: string;
  groups?: Type[];
  defaultGroup?: Type;
  variant?: 'colored' | 'minimal';
}

const GroupsMenu: React.FC<GroupsMenuProps> = ({
  className,
  groups,
  defaultGroup,
  variant = 'colored',
}) => {
  const router = useRouter();
  const selectedMenu =
    groups?.find((type) => router.asPath.includes(type?.slug)) ?? defaultGroup;
  return (
    <Menu
      as="div"
      className="relative inline-block ltr:text-left rtl:text-right"
    >
      <Menu.Button
        className={cn(
          'flex h-11 shrink-0 items-center text-sm font-semibold text-heading focus:outline-none md:text-base xl:px-4',
          {
            'rounded-lg border border-border-200 bg-gray-50 px-3':
              variant === 'minimal',
            'rounded border-border-200 bg-light xl:min-w-150 xl:border xl:text-accent':
              variant === 'colored',
          },
          className
        )}
      >
        {({ open }) => (
          <>
            {variant === 'colored' && selectedMenu?.icon && (
              <span className="flex h-5 w-5 items-center justify-center ltr:mr-2 rtl:ml-2">
                {getIcon({
                  iconList: groupIcons,
                  iconName: selectedMenu?.icon,
                  className: 'max-h-full max-w-full',
                })}
              </span>
            )}
            <span className="whitespace-nowrap">{selectedMenu?.name}</span>
            <span className="flex pt-1 ltr:ml-auto ltr:pl-2.5 rtl:mr-auto rtl:pr-2.5">
              {variant === 'colored' && (
                <CaretDown
                  className={open ? 'rotate-180 transform' : undefined}
                />
              )}

              {variant === 'minimal' && (
                <ArrowDownIcon
                  className={cn('h-3 w-3', {
                    'rotate-180 transform': open,
                  })}
                />
              )}
            </span>
          </>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className={cn(
            'absolute mt-2 h-56 max-h-56 min-h-40 w-48 overflow-hidden rounded bg-light py-2 shadow-700 focus:outline-none sm:max-h-72 lg:h-72 2xl:h-auto 2xl:max-h-screen',
            {
              'border border-border-200 ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left':
                variant === 'minimal',
              'ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left ltr:xl:right-auto ltr:xl:left-0 ltr:xl:origin-top-left rtl:xl:left-auto rtl:xl:right-0 rtl:xl:origin-top-right':
                variant !== 'minimal',
            }
          )}
        >
          <Scrollbar
            className="h-full w-full"
            options={{
              scrollbars: {
                autoHide: 'never',
              },
            }}
          >
            {groups?.map(({ id, name, slug, icon }) => (
              <Menu.Item key={id}>
                {({ active }) => (
                  // FIX: Add ref to Link component
                  <div>
                    <Link
                      href={`/${slug}`}
                      className={cn(
                        'flex w-full items-center space-x-4 px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none rtl:space-x-reverse',
                        active ? 'text-accent' : 'text-body-dark'
                      )}
                    >
                      {icon && variant === 'colored' && (
                        <span className="flex h-5 w-5 items-center justify-center">
                          {getIcon({
                            iconList: groupIcons,
                            iconName: icon,
                            className: 'max-h-full max-w-full',
                          })}
                        </span>
                      )}
                      <span>{name}</span>
                    </Link>
                  </div>
                )}
              </Menu.Item>
            ))}
          </Scrollbar>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

type GroupsDropdownMenuProps = {
  variant?: 'colored' | 'minimal';
};

const GroupsDropdownMenu: React.FC<GroupsDropdownMenuProps> = ({ variant }) => {
  const { types }: any = useTypes({
    limit: TYPES_PER_PAGE,
  });
  //FIXME: remove this
  const { homePage }: any = useHomepage();
  return (
    <GroupsMenu groups={types} defaultGroup={homePage} variant={variant} />
  );
};

export default GroupsDropdownMenu;
