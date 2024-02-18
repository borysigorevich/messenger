import { EmptyState } from '@/components/EmptyState';
import React from 'react';

const Users = async () => {
	return (
		<div className='hidden h-full pl-80 lg:block'>
			<EmptyState />
		</div>
	);
};

export default Users;
