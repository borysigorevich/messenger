'use client';
import { Avatar } from '@/components/Avatar';
import { DesktopItem } from '@/components/DesktopSidebar/components/DesktopItem';
import { SettingsModal } from '@/components/DesktopSidebar/components/SettingsModal';
import { DesktopSidebarProps } from '@/components/DesktopSidebar/types';
import { useRoutes } from '@/hooks/useRoutes';
import React from 'react';

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
	const routes = useRoutes();
	const [isOpen, setIsOpen] = React.useState(false);

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	return (
		<>
			<SettingsModal
				currentUser={currentUser}
				isOpen={isOpen}
				onClose={handleClose}
			/>
			<div
				className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-20 lg:flex-col
            lg:justify-between lg:overflow-y-auto lg:border-r-[1px] lg:bg-white lg:pb-4 xl:px-6'
			>
				<nav className='mt-4 flex flex-col justify-between'>
					<ul role='list' className='flex flex-col items-center gap-1'>
						{routes.map((route) => (
							<DesktopItem
								key={route.label}
								label={route.label}
								href={route.href}
								onClick={route.onClick}
								icon={route.icon}
								active={route.active}
							/>
						))}
					</ul>
				</nav>

				<nav className='mt-4 flex flex-col items-center justify-between'>
					<div
						onClick={handleOpen}
						className='cursor-pointer transition hover:opacity-75'
					>
						<Avatar currentUser={currentUser} />
					</div>
				</nav>
			</div>
		</>
	);
};
