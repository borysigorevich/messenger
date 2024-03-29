'use client';
import { MessageBoxProps } from '@/app/conversations/[conversationId]/components/Body/components/MessageBox/types';
import { Avatar } from '@/components/Avatar';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Image from 'next/image';
import { ImageModal } from './comopnents/ImageModal';

export const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
	const session = useSession();
	const [imageModalOpen, setImageModalOpen] = useState(false);
	if (session.status === 'loading') return null;

	const isOwn = session.data?.user?.email === data?.sender?.email;
	const seenList = (data?.seen || [])
		.filter((user) => user.email !== data.sender.email)
		.map((user) => user.name)
		.join(', ');

	const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');

	const avatar = clsx(isOwn && 'order-2');

	const body = clsx('flex flex-col gap-2', isOwn && 'items-end');

	const message = clsx(
		'text-sm w-fit overflow-hidden',
		isOwn ? 'text-white bg-sky-500' : 'bg-gray-100',
		data?.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
	);

	const handleImageModalOpen = () => {
		setImageModalOpen(true);
	};

	const handleImageModalClose = () => {
		setImageModalOpen(false);
	};

	return (
		<div className={container}>
			<div className={avatar}>
				<Avatar currentUser={data?.sender} />
			</div>

			<div className={body}>
				<div className='flex items-center gap-1'>
					<div className='text-sm text-gray-500'>{data.sender.name}</div>

					<div className='text-xs text-gray-400'>
						{format(new Date(data.createdAt), 'p')}
					</div>
				</div>
				<div className={message}>
					<ImageModal
						src={data.image}
						isOpen={imageModalOpen}
						onClose={handleImageModalClose}
					/>
					{data?.image ? (
						<Image
							onClick={handleImageModalOpen}
							className='cursor-pointer object-cover transition-transform hover:scale-110'
							alt='message image'
							src={data.image}
							height={288}
							width={288}
						/>
					) : (
						data.body
					)}
				</div>

				<div className='text-sm text-gray-400'>Seen by {seenList}</div>
			</div>
		</div>
	);
};
