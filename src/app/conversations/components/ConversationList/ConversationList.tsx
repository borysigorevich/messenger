'use client';
import { GroupChatModal } from '@/app/conversations/components/ConversationList/components/GroupChatModal';
import { ConversationBox } from '@/app/conversations/components/ConversationList/ConversationBox';
import { ConversationListProps } from '@/app/conversations/components/ConversationList/types';
import { useConversation } from '@/hooks/useConversation';
import { pusherClient } from '@/libs/pusher';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/all';
import { FullConversationType } from '../../../../../types';

export const ConversationList: React.FC<ConversationListProps> = ({
	initialItems,
	users,
}) => {
	const session = useSession();

	const [items, setItems] = React.useState(initialItems);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const router = useRouter();

	const { conversationId, isOpen } = useConversation();

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};
	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const pusherKey = useMemo(() => {
		return session.data?.user?.email;
	}, [session.data?.user?.email]);

	useEffect(() => {
		if (!pusherKey) return;
		pusherClient.subscribe(pusherKey);

		const newConversationHandler = (newConversation: FullConversationType) => {
			setItems((state) => {
				if (state.find((item) => item.id === newConversation.id)) return state;
				return [newConversation, ...state];
			});
		};

		const updateConversationHandler = (newConversation: FullConversationType) => {
			setItems((state) => {
				return state.map((conversation) => {
					if (conversation.id === newConversation.id) {
						return {
							...conversation,
							messages: newConversation.messages,
						};
					}
					return conversation;
				});
			});
		};

		const removeConversationHandler = (conversation: FullConversationType) => {
			setItems((state) => {
				return state.filter((item) => item.id !== conversation.id);
			});
			if (conversationId === conversation.id) {
				router.push('/conversations');
			}
		};

		pusherClient.bind('conversation:new', newConversationHandler);
		pusherClient.bind('conversation:update', updateConversationHandler);
		pusherClient.bind('conversation:remove', removeConversationHandler);

		return () => {
			pusherClient.unsubscribe(pusherKey);
			pusherClient.unbind('conversation:new');
			pusherClient.unbind('conversation:update');
			pusherClient.unbind('conversation:remove');
		};
	}, [pusherKey, conversationId, router]);

	return (
		<>
			<GroupChatModal
				users={users}
				isOpen={isModalOpen}
				onClose={handleModalClose}
			/>
			<aside
				className={clsx(
					`fixed inset-y-0 overflow-y-auto border-r border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0`,
					isOpen ? 'hidden' : 'left-0 block w-full'
				)}
			>
				<div className='px-5'>
					<div className='mb-4 flex justify-between pt-4'>
						<div className='text-2xl font-bold text-neutral-800'>
							Messages
						</div>
						<div
							className='cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 transition hover:opacity-75'
							onClick={handleModalOpen}
						>
							<MdOutlineGroupAdd size={20} />
						</div>
					</div>

					<div className='space-y-2'>
						{items.map((item) => (
							<ConversationBox
								key={item.id}
								data={item}
								selected={conversationId === item.id}
							/>
						))}
					</div>
				</div>
			</aside>
		</>
	);
};
