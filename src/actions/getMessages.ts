import { getCurrentUser } from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';

export const getMessages = async (conversationId: string) => {
	const currentUser = await getCurrentUser();

	if (!currentUser?.email) {
		return [];
	}

	try {
		return await prisma.message.findMany({
			where: {
				conversationId,
			},
			include: {
				sender: true,
				seen: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
	} catch (error) {
		console.log(error);
		return null;
	}
};
