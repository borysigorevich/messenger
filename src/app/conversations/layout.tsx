import { getConversations, getUsers } from '@/actions';
import { ConversationList } from '@/app/conversations/components/ConversationList';
import { Sidebar } from '@/components/Sidebar';
import React from 'react';

const ConversationsLayout = async ({ children }: { children: React.ReactNode }) => {
	const conversations = await getConversations();
	const users = await getUsers();
	return (
		<div className='h-full'>
			<Sidebar>
				<ConversationList
					users={users || []}
					initialItems={conversations || []}
				/>
				{children}
			</Sidebar>
		</div>
	);
};

export default ConversationsLayout;
