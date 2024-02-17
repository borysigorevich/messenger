'use client';
import { DesktopItemProps } from '@/components/DesktopSidebar/components/DesktopItem/types';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

export const DesktopItem: React.FC<DesktopItemProps> = ({
	href,
	icon: Icon,
	onClick,
	label,
	active,
}) => {
	const handleClick = () => {
		if (onClick) onClick();
	};

	return (
		<li onClick={handleClick}>
			<Link
				href={href}
				className={clsx(
					`
                    group flex cursor-pointer gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 
                    transition hover:bg-gray-100 hover:text-black
                    `,
					active ? 'bg-gray-100 text-black' : 'text-gray-500'
				)}
			>
				<Icon className='h-6 w-6 shrink-0' />
				<span className='sr-only'>{label}</span>
			</Link>
		</li>
	);
};
