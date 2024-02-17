'use client';
import { EmptyState } from '@/components/EmptyState';
import { useConversation } from '@/hooks/useConversation';
import clsx from 'clsx';
import React from 'react';

export const Conversation = () => {
	const { isOpen } = useConversation();

	return (
		<div className={clsx('h-full lg:block lg:pl-80', isOpen ? 'hidden' : 'block')}>
			<EmptyState />
		</div>
	);
};
