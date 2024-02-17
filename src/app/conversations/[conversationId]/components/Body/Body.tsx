'use client';
import { MessageBox } from '@/app/conversations/[conversationId]/components/Body/components/MessageBox';
import { BodyProps } from '@/app/conversations/[conversationId]/components/Body/types';
import { useConversation } from '@/hooks/useConversation';
import { pusherClient } from '@/libs/pusher';
import axios from 'axios';
import { find } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { FullMessageType } from '../../../../../../types';

export const Body: React.FC<BodyProps> = ({ initialMessages }) => {
	const [initialMessagesState, setInitialMessageState] = useState(initialMessages);
	const bottomRef = useRef<HTMLDivElement | null>(null);

	const { conversationId } = useConversation();

	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`);
	}, [conversationId]);

	useEffect(() => {
		pusherClient.subscribe(conversationId);
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

		const messageHandler = (message: FullMessageType) => {
			axios.post(`/api/conversations/${conversationId}/seen`);
			setInitialMessageState((state) => {
				if (find(state, { id: message.id })) return state;
				return [...state, message];
			});
		};

		const updateMessageHandler = (newMessage: FullMessageType) => {
			setInitialMessageState((state) => {
				return state.map((message) => {
					if (message.id === newMessage.id) {
						return newMessage;
					}
					return message;
				});
			});
		};

		pusherClient.bind('messages:new', messageHandler);
		pusherClient.bind('message:update', updateMessageHandler);

		return () => {
			pusherClient.unsubscribe(conversationId);
			pusherClient.unbind('messages:new');
			pusherClient.unbind('message:update');
		};
	}, [conversationId]);

	return (
		<div className='flex-1 overflow-y-auto'>
			{initialMessagesState.map((message, index) => (
				<MessageBox
					key={message.id}
					data={message}
					isLast={index === initialMessagesState.length - 1}
				/>
			))}

			<div ref={bottomRef} className='pt-24' />
		</div>
	);
};
