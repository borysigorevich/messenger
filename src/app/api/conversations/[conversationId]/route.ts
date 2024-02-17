import { getCurrentUser } from '@/actions';
import prisma from '@/libs/prismadb';
import { pusherServer } from '@/libs/pusher';
import { NextResponse } from 'next/server';

type ParamsType = {
	conversationId: string;
};

export async function DELETE(req: Request, { params }: { params: ParamsType }) {
	try {
		const { conversationId } = params;

		const currentUser = await getCurrentUser();

		if (!currentUser?.id) {
			return new NextResponse('Internal Server Error', { status: 401 });
		}

		const existingConversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				users: true,
			},
		});

		if (!existingConversation) {
			return new NextResponse('Invalid Id', { status: 400 });
		}

		const deletedConversation = await prisma.conversation.deleteMany({
			where: {
				id: conversationId,
				userIds: {
					hasSome: [currentUser.id],
				},
			},
		});

		existingConversation.users.forEach((user) => {
			if (user.email) {
				pusherServer.trigger(
					user.email,
					'conversation:remove',
					existingConversation
				);
			}
		});

		return NextResponse.json(deletedConversation);
	} catch (erorr) {
		console.error(erorr);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}
