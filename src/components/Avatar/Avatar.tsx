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
        <div className='relative'>
            <div className='relative inline-block rounded-full overflow-hidden h-9 w-9 lg:w-11 lg:h-11'>
                <Image
                    src={currentUser?.image || '/images/placeholder.jpg'}
                    alt='avatar'
                    fill
                />
            </div>
        </div>
    );
};