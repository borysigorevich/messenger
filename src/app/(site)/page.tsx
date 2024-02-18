import { getSession } from '@/actions';
import { AuthForm } from '@/components/form/AuthForm';
import { redirect } from 'next/navigation';

export default async function Home() {
	const session = await getSession();
	if (session) redirect('/users');
	return <AuthForm />;
}
