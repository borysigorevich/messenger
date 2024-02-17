import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	const session = await getServerSession(authOptions);
	const path = request.nextUrl.pathname;
	const isAuth = !!session?.user?.email;

	if (isAuth && path === '/') {
		return NextResponse.redirect(new URL('/users', request.url));
	} else if ((path === '/users' || path.includes('/conversations')) && !isAuth) {
		return NextResponse.redirect(new URL('/', request.url));
	}
}

// export default withAuth({
//     pages: {
//         signIn: '/'
//     }
// })

export const config = {
	matcher: ['/', '/users/:path*', '/conversations/:path*'],
};
