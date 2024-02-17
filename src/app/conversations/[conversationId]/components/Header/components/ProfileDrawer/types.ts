import { Conversation, User } from '@prisma/client';
import { FullConversationType } from '../../../../../../../../types';

export type HeaderType = {
	data: Conversation & { users: User[] };
	isOpen: boolean;
	onClose: () => void;
};
