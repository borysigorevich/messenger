import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	const isAuth = /next-auth.session-token/gi.test(request.cookies.toString());
	const path = request.nextUrl.pathname;

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
