import prisma from '@/libs/prismadb';
import { getSession } from './getSession';

export const getUsers = async () => {
	const session = await getSession();

	if (!session?.user?.email) {
		return [];
	}

	try {
		return await prisma.user.findMany({
			where: {
				NOT: {
					email: session?.user?.email || undefined,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	} catch (error: any) {
		return [];
	}
};
