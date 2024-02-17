import { getCurrentUser } from '@/actions';
import prisma from '@/libs/prismadb';
import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();
		const body = await request.json();
		const { name, image } = body;
		if (!currentUser?.id) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: currentUser.id,
			},
			data: {
				name,
				image,
			},
		});

		return NextResponse.json(updatedUser);
	} catch (error: any) {
		console.error(error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}
