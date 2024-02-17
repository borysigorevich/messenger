'use client';
import { ProfileDrawer } from '@/app/conversations/[conversationId]/components/Header/components/ProfileDrawer';
import { HeaderProps } from '@/app/conversations/[conversationId]/components/Header/types';
import { Avatar } from '@/components/Avatar';
import { AvatarGroup } from '@/components/AvatarGroup';
import { useActiveList } from '@/hooks/useActiveList';
import { useOtherUser } from '@/hooks/useOtherUser';
import { Conversation } from '@prisma/client';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/all';

export const Header: React.FC<HeaderProps> = ({ conversation }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const otherUser = useOtherUser(conversation);

	const members = useActiveList((state) => state.members);
	const isActive = members.includes(otherUser?.email || '');

	const statusText = useMemo(() => {
		if ((conversation as Conversation).isGroup) {
			return `${conversation?.users?.length} members`;
		}

		return isActive ? 'Active' : 'Offline';
	}, [conversation, isActive]);

	return (
		<>
			<ProfileDrawer
				data={conversation}
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
			/>
			<div
				className='flex w-full items-center justify-between border-b-[1px] bg-white px-4 py-3 shadow-sm sm:px-4
            lg:px-6'
			>
				<div className='flex items-center gap-3'>
					<Link
						className='block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden'
						href='/conversations'
					>
						<HiChevronLeft size={32} />
					</Link>

					{conversation.isGroup ? (
						<AvatarGroup users={conversation.users} />
					) : (
						<Avatar currentUser={otherUser} />
					)}

					<div className='flex flex-col'>
						<div>
							{(conversation as Conversation).name || otherUser?.name}
						</div>
						<div className='text-sm font-light text-neutral-500'>
							{statusText}
						</div>
					</div>
				</div>
				<HiEllipsisHorizontal
					className='cursor-pointer text-sky-500 transition hover:text-sky-600'
					size={32}
					onClick={() => {
						setDrawerOpen(true);
					}}
				/>
			</div>
		</>
	);
};
