'use client'
import {AvatarProps} from "@/components/Avatar/types";
import Image from 'next/image'
import React from 'react';

export const Avatar: React.FC<AvatarProps> = (
    {
        currentUser
    }
) => {
    return (
        <div className='relative flex items-center'>
            <div className='relative inline-block rounded-full overflow-hidden h-9 w-9 lg:w-11 lg:h-11'>
                <Image
                    src={currentUser?.image || '/images/placeholder.jpg'}
                    alt='avatar'
                    fill
                />
            </div>
            <span
                className='absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3'
            />
        </div>
    );
};