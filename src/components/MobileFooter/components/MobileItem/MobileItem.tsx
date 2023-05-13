'use client'
import {MobileItemProps} from "@/components/MobileFooter/components/MobileItem/types";
import clsx from "clsx";
import Link from "next/link";
import React from 'react';

const MobileItem: React.FC<MobileItemProps> = (
    {
        label,
        href,
        icon: Icon,
        onClick,
        active,
    }
) => {

    const handleClick = () => {
        onClick && onClick()
    }

    return (
        <Link
            onClick={handleClick}
            href={href}
            className={clsx(`
                group flex flex-1 gap-x-3 text-sm leading-6 font-semibold justify-center p-4 
                hover:text-black hover:bg-gray-100 transition
            `,
                active ? 'text-black bg-gray-100' : 'text-gray-500'
            )}
        >
            <Icon className='h-6 w-6'/>
        </Link>
    );
};

export default MobileItem;