import { Conversation, User, Message } from '@prisma/client';

type FullMessageType = Message & {
	sender: User;
	seen: User[];
};

type FullConversationType = Conversation & {
	users: User[];
	messages: FullMessageType[];
};
