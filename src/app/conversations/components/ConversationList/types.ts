import { FullConversationType } from '../../../../../types';
import { User } from '@prisma/client';

export type ConversationListProps = {
	initialItems: FullConversationType[];
	users: User[];
};
