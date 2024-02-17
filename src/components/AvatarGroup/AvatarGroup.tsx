import { User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

type AvatarGroupProps = {
	users?: User[];
};

export const AvatarGroup = ({ users = [] }: AvatarGroupProps) => {
	const slicedUsers = users.slice(0, 3);

	const positionMap = {
		0: 'left-3 top-0',
		1: 'bottom-0',
		2: 'bottom-0 right-0',
	};

	return (
		<div className='relative h-11 w-11'>
			{slicedUsers.map((user, index) => (
				<div
					key={user.id}
					className={`absolute inline-block h-5 w-5 overflow-hidden rounded-full
                    ${positionMap[index as keyof typeof positionMap]}
                 `}
				>
					<Image
						fill
						alt={'avatar'}
						src={user.image || '/images/placeholder.jpg'}
					/>
				</div>
			))}
		</div>
	);
};
