'use client';
import { ConversationBoxProps } from '@/app/conversations/components/ConversationList/ConversationBox/types';
import { Avatar } from '@/components/Avatar';
import { AvatarGroup } from '@/components/AvatarGroup';
import { useOtherUser } from '@/hooks/useOtherUser';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

export const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
	const otherUser = useOtherUser(data);
	const session = useSession();
	const router = useRouter();

	const handleClick = () => {
		router.push(`/conversations/${data.id}`);
	};

	const lastMessage = useMemo(() => {
		const messages = data.messages || [];
		return messages[data.messages?.length - 1];
	}, [data]);

	const hasSeen = useMemo(() => {
		const userEmail = session?.data?.user?.email;

		if (!lastMessage) return false;

		const seenArray = lastMessage.seen || [];

		if (!userEmail) return false;

		return seenArray.filter((user) => user.email === userEmail).length > 0;
	}, [lastMessage, session]);

	const lastMessageText = useMemo(() => {
		if (lastMessage?.image) {
			return 'Sent an image';
		}

		if (lastMessage?.body) {
			return lastMessage.body;
		}

		return 'Started a conversation';
	}, [lastMessage]);

	console.log({ data });

	return (
		<div onClick={handleClick}>
			<div
				className={clsx(
					`relative flex w-full cursor-pointer items-center space-x-3 rounded-lg p-3 transition hover:bg-neutral-100`,
					selected ? 'bg-neutral-100' : 'bg-white'
				)}
			>
				{data.isGroup ? (
					<AvatarGroup users={data.users} />
				) : (
					<Avatar currentUser={otherUser} />
				)}

				<div className='min-w-0 flex-1'>
					<div className='focus:outline-none'>
						<div className='mb-1 flex items-center justify-between'>
							<p className='text-md font-medium text-gray-900'>
								{data?.name || otherUser?.name}
							</p>
							{lastMessage?.createdAt && (
								<p>{format(new Date(lastMessage?.createdAt), 'p')}</p>
							)}
						</div>
						<p
							className={clsx(
								`truncate text-sm`,
								hasSeen ? 'text-gray-500' : 'font-medium text-black'
							)}
						>
							{lastMessageText}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
