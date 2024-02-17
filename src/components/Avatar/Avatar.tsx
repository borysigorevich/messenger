'use client';
import { AvatarProps } from '@/components/Avatar/types';
import Image from 'next/image';
import React from 'react';

export const Avatar: React.FC<AvatarProps> = ({ currentUser }) => {
	return (
		<div className='relative flex items-center'>
			<div className='relative inline-block h-9 w-9 overflow-hidden rounded-full lg:h-11 lg:w-11'>
				<Image
					src={currentUser?.image || '/images/placeholder.jpg'}
					alt='avatar'
					fill
				/>
			</div>
			<span className='absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white md:h-3 md:w-3' />
		</div>
	);
};
