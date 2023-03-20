import { useState } from 'react';
import Pagination from '@/components/ui/pagination';
import Image from 'next/image';
import { Table } from '@/components/ui/table';
import ActionButtons from '@/components/common/action-buttons';
import { siteSettings } from '@/settings/site.settings';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import Badge from '@/components/ui/badge/badge';
import { ShopPaginator, SortOrder } from '@/types';
import TitleWithSort from '@/components/ui/title-with-sort';
// import Link from '@/components/ui/link';
import { PosWebMenu } from '@/types';
import Button from '../ui/button';
import Link from 'next/link'

type Iprops = {
    pos_web_menu: PosWebMenu[] | undefined;
}

const PosWebMenu = ({
    pos_web_menu,

}: Iprops) => {
    const { t } = useTranslation();
    const { alignLeft, alignRight } = useIsRTL();

    console.info("pos_web_menu : ", pos_web_menu);

    const PosWebMenus = [
        { id: 1, label: "POS PRODUCT ENTRY", style: {}, actionType: 'create', pathName: '/pos_web/pos' },
        { id: 2, label: "EDIT POS PRODUCT", style: {}, actionType: 'edit', pathName: '/pos_web/pos' },
        { id: 3, label: "WEB PRODUCT ENTRY", style: {}, actionType: 'create', pathName: '/pos_web/web' },
        { id: 4, label: "EDIT WEB PRODUCT", style: {}, actionType: 'edit', pathName: '/pos_web/web' },
        { id: 5, label: "POS TO WEB CONVERTER", style: {}, actionType: 'convert', pathName: '/pos_web/pos-to-web' },
        { id: 6, label: "LIST ALL PRODUCT", style: { bg: 'bg-green-700', color: 'text-white	' }, actionType: 'list' }
    ]

    return (
        <>
            <div className="mb-6 overflow-hidden rounded shadow flex flex-col p-5 ">
                {
                    PosWebMenus.map(item => {
                        return <Link
                            href={{
                            pathname: item?.pathName ?? '#',
                            query: { action: item?.actionType },
                            }}
                        >
                            <Button 
                                onClick={() => console.log("click")}
                                key={item.id}
                                className={`mb-2 ${item.style ? item.style.bg : ''}`}
                                >{item.label}</Button> 
                        </Link>
                    })
                }
            </div>
        </>
    );
};

export default PosWebMenu;


