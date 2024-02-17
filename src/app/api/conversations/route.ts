import { getCurrentUser } from '@/actions';
import { pusherServer } from '@/libs/pusher';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();
		const body = await request.json();

		console.log({ body, currentUser }, 'body, currentUser');

		const { userId, isGroup, members, name } = body;

		console.log({ userId, isGroup, members, name }, 'userId, isGroup, members, name');

		if (!currentUser?.id || !currentUser.email)
			return new NextResponse('Unauthorized', { status: 401 });

		if (isGroup && (!members || members.length < 2 || !name))
			return new NextResponse('Invalid data', { status: 400 });

		console.log('before if isGroup');

		if (isGroup) {
			console.log('inside if isGroup');
			const newConversation = await prisma?.conversation.create({
				data: {
					name,
					isGroup,
					users: {
						connect: [
							...members.map((member: { value: string }) => ({
								id: member.value,
							})),
							{ id: currentUser.id },
						],
					},
				},
				include: {
					users: true,
				},
			});

			newConversation?.users.forEach((user) => {
				if (user.email) {
					pusherServer.trigger(
						user.email,
						'conversations:new',
						newConversation
					);
				}
			});

			return NextResponse.json(newConversation);
		}

		console.log('before existingConversations');

		const existingConversations = await prisma?.conversation.findMany({
			where: {
				OR: [
					{
						userIds: {
							equals: [currentUser.id, userId],
						},
					},
					{
						userIds: {
							equals: [userId, currentUser.id],
						},
					},
				],
			},
		});

		console.log({ existingConversations }, 'existingConversations');

		const singleConversation = existingConversations?.[0];

		if (singleConversation) return NextResponse.json(singleConversation);

		const newConversation = await prisma?.conversation.create({
			data: {
				users: {
					connect: [{ id: userId }, { id: currentUser.id }],
				},
			},
			include: {
				users: true,
			},
		});

		newConversation?.users.forEach((user) => {
			if (user.email) {
				pusherServer.trigger(user.email, 'conversation:new', newConversation);
			}
		});

		return NextResponse.json(newConversation);
	} catch (error: any) {
		return new NextResponse('Internal error', { status: 500 });
	}
}
