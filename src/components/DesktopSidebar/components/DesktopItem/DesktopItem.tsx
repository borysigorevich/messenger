'use client'
import {DesktopItemProps} from "@/components/DesktopSidebar/components/DesktopItem/types";
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react';

export const DesktopItem: React.FC<DesktopItemProps> = (
    {
        href,
        icon: Icon,
        onClick,
        label,
        active,
    }
) => {

    const handleClick = () => {
        if (onClick) onClick()
    }

    return (
        <li onClick={handleClick}>
            <Link
                href={href}
                className={clsx(
                    `
                    flex group gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold hover:text-black 
                    hover:bg-gray-100 transition cursor-pointer
                    `,
                    active ? 'text-black bg-gray-100' : 'text-gray-500'
                )}
            >
                <Icon className='h-6 w-6 shrink-0'/>
                <span className='sr-only'>{label}</span>
            </Link>
        </li>
    );
};