import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { pusherServer } from '@/libs/pusher';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	if (!session?.user?.email) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const socket = req.body.socket_id;
	const channel = req.body.channel_name;
	const data = {
		user_id: session.user.email,
	};

	const auth = pusherServer.authorizeChannel(socket, channel, data);
	return res.send(auth);
}
