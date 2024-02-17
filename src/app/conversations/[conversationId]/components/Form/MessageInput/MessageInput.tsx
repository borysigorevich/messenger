'use client';
import { MessageInputProps } from '@/app/conversations/[conversationId]/components/Form/MessageInput/types';
import React from 'react';

export const MessageInput: React.FC<MessageInputProps> = ({
	register,
	errors,
	required,
	placeholder,
	type,
	id,
}) => {
	return (
		<div className='relative w-full'>
			<input
				type={type}
				id={id}
				autoComplete={id}
				placeholder={placeholder}
				{...register(id, { required })}
				className='w-full rounded-full bg-neutral-100 px-4 py-2 font-light text-black focus:outline-none'
			/>
		</div>
	);
};
