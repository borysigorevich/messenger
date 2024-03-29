import prisma from '@/libs/prismadb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, email, password } = body;

		if (!email || !name || !password) {
			return new NextResponse('Missing info', {
				status: 400,
			});
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				hashedPassword,
			},
		});

		return NextResponse.json(user);
	} catch (error) {
		console.log(error, 'REGISTRATION_ERROR');
		return new NextResponse('Internal error', {
			status: 500,
		});
	}
}
