/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
	},
	images: {
		domains: [
			'lh3.googleusercontent.com',
			'avatars.githubusercontent.com',
			'res.cloudinary.com',
		],
	},
};

module.exports = nextConfig;
