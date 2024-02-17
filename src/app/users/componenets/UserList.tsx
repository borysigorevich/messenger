'use client';
import { UserBox } from '@/app/users/componenets/components/UserBox';
import { UserListProps } from '@/app/users/componenets/types';
import React from 'react';

export const UserList: React.FC<UserListProps> = ({ users }) => {
	return (
		<aside
			className='fixed inset-0 left-0 block w-full overflow-y-auto border-r border-gray-200 pb-20
        lg:left-20 lg:block  lg:w-80 lg:pb-0
        '
		>
			<div className='px-5'>
				<div className='flex flex-col'>
					<div className='py-4 text-2xl font-bold text-neutral-800'>People</div>
				</div>
				{users?.map((user) => <UserBox key={user.id} user={user} />)}
			</div>
		</aside>
	);
};
