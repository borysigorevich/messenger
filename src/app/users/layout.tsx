import { getSession, getUsers } from '@/actions';
import { UserList } from '@/app/users/componenets';
import { Sidebar } from '@/components/Sidebar';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
	const users = await getUsers();
	const session = await getSession();
	if (!session) redirect('/');

	return (
		<Sidebar>
			<div className='h-full'>
				<UserList users={users} />
				{children}
			</div>
		</Sidebar>
	);
}
