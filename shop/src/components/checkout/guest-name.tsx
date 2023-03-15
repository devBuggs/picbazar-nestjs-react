import React from 'react';
import { guestNameAtom } from '@/store/checkout';
import { useAtom } from 'jotai';
import Input from '@/components/ui/forms/input';
function GuestName({ count, label }: { count: number; label: string }) {
    const [name, setName] = useAtom(guestNameAtom);
    return (
        <div className="p-5 bg-light shadow-700 md:p-8">
            <div className="flex items-center justify-between mb-5 md:mb-8">
                <div className="flex items-center space-x-3 rtl:space-x-reverse md:space-x-4">
                    <span className="flex items-center justify-center w-8 h-8 text-base rounded-full bg-accent text-light lg:text-xl">
                        {count}
                    </span>
                    <p className="text-lg capitalize text-heading lg:text-xl">{label}</p>
                </div>
            </div>
            <div className="block">
                <Input
                    //@ts-ignore

                    value={name}
                    name="guestName"
                    onChange={(e) => setName(e.target.value)}
                    variant="outline"
                />
            </div>
        </div>
    );
}
export default GuestName;