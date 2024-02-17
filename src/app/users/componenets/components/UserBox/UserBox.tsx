'use client';
import { UserBoxProps } from '@/app/users/componenets/components/UserBox/types';
import { Avatar } from '@/components/Avatar';
import { LoadingModal } from '@/components/LoadingModal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

export const UserBox: React.FC<UserBoxProps> = ({ user }) => {
	const router = useRouter();
	const [loading, setLoading] = React.useState(false);

	const handleClick = React.useCallback(() => {
		setLoading(true);
		axios
			.post('/api/conversations', {
				userId: user.id,
			})
			.then(({ data }) => {
				router.push(`/conversations/${data.id}`);
			})
			.catch((error) => {
				toast.error('Failed to create conversation');
				console.log({ error }, 'error UserBox /api/conversations POST');
			})
			.finally(() => {
				setLoading(false);
			});
	}, [router, user]);

	return (
		<>
			<LoadingModal isLoading={loading} />
			<div
				onClick={handleClick}
				className='relative flex w-full cursor-pointer items-center space-x-3 rounded-lg bg-white p-3
         transition duration-300 hover:bg-neutral-100'
			>
				<Avatar currentUser={user} />
				<div className='min-w-0 flex-1'>
					<div className='focus:outline-none'>
						<div className='mb-1 flex items-center justify-between'>
							<p className='text-sm font-medium text-gray-900'>
								{user.name}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
