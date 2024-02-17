'use client';
import MobileItem from '@/components/MobileFooter/components/MobileItem/MobileItem';
import { useConversation } from '@/hooks/useConversation';
import { useRoutes } from '@/hooks/useRoutes';
import React from 'react';

export const MobileFooter = () => {
	const routes = useRoutes();
	const { isOpen } = useConversation();

	if (isOpen) return null;

	return (
		<div
			className='fixed bottom-0 z-40 flex w-full items-center justify-between border-t-[1px] bg-white
                lg:hidden
            '
		>
			{routes.map((route) => (
				<MobileItem
					key={route.label}
					label={route.label}
					href={route.href}
					onClick={route.onClick}
					active={route.active}
					icon={route.icon}
				/>
			))}
		</div>
	);
};
