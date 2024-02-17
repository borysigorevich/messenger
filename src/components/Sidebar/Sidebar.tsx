import { getCurrentUser } from '@/actions/getCurrentUser';
import { DesktopSidebar } from '@/components/DesktopSidebar';
import { MobileFooter } from '@/components/MobileFooter';
import { SidebarProps } from '@/components/Sidebar/types';
import React from 'react';

// @ts-ignore
export const Sidebar: React.FC<SidebarProps> = async ({ children }) => {
	const currentUser = await getCurrentUser();

	return (
		<div className='h-full'>
			<DesktopSidebar currentUser={currentUser} />
			<MobileFooter />
			<main className='h-full lg:pl-20'>{children}</main>
		</div>
	);
};
