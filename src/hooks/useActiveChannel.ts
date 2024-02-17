import { useActiveList } from '@/hooks/useActiveList';
import { pusherClient } from '@/libs/pusher';
import { Channel, Members } from 'pusher-js';
import { useEffect, useState } from 'react';

export const useActiveChannel = () => {
	const setMembers = useActiveList((state) => state.setMembers);
	const addMember = useActiveList((state) => state.addMember);
	const removeMember = useActiveList((state) => state.removeMember);

	const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

	useEffect(() => {
		let channel = activeChannel;

		if (!channel) {
			channel = pusherClient.subscribe('presence-messenger');
			setActiveChannel(channel);
		}
		channel.bind('pusher:subscription_succeeded', (members: Members) => {
			const initialMembers: string[] = [];
			members.each((member: Record<string, any>) => {
				initialMembers.push(member.id);
			});
			setMembers(initialMembers);
		});

		channel.bind('pusher:member_added', (member: Record<string, any>) => {
			addMember(member.id);
		});

		channel.bind('pusher:member_removed', (member: Record<string, any>) => {
			removeMember(member.id);
		});

		return () => {
			pusherClient.unsubscribe('presence-messenger');
			setActiveChannel(null);
		};
	}, [addMember, setMembers, removeMember]);

	return null;
};
