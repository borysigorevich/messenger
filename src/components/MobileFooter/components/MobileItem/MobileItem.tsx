'use client';
import { MobileItemProps } from '@/components/MobileFooter/components/MobileItem/types';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

const MobileItem: React.FC<MobileItemProps> = ({
	label,
	href,
	icon: Icon,
	onClick,
	active,
}) => {
	const handleClick = () => {
		onClick && onClick();
	};

	return (
		<Link
			onClick={handleClick}
			href={href}
			className={clsx(
				`
                group flex flex-1 cursor-pointer justify-center gap-x-3 p-4 text-sm font-semibold 
                leading-6 transition hover:bg-gray-100 hover:text-black
            `,
				active ? 'bg-gray-100 text-black' : 'text-gray-500'
			)}
		>
			<Icon className='h-6 w-6' />
		</Link>
	);
};

export default MobileItem;
