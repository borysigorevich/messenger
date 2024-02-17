import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUser } from 'react-icons/hi2';

import { useConversation } from './useConversation';

export const useRoutes = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { conversationId } = useConversation();

	return useMemo(
		() => [
			{
				label: 'Chat',
				href: '/conversations',
				icon: HiChat,
				active: pathname === '/conversations' || !!conversationId,
			},
			{
				label: 'Users',
				href: '/users',
				icon: HiUser,
				active: pathname === '/users',
			},
			{
				label: 'Logout',
				href: '#',
				icon: HiArrowLeftOnRectangle,
				onClick: () => {
					router.push('/');
					signOut();
				},
			},
		],
		[pathname, conversationId]
	);
};
