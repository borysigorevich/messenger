import { Button } from '@/components/button';
import { Input } from '@/components/inputs';
import { Select } from '@/components/inputs/components/Select';
import { Modal } from '@/components/Modal';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type GroupChatModalProps = {
	isOpen: boolean;
	onClose: () => void;
	users: User[];
};

type FormValues = {
	name?: string;
	members?: OptionType[];
};

export type OptionType = {
	label: string;
	value: string;
};

export const GroupChatModal = ({ isOpen, onClose, users }: GroupChatModalProps) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			name: '',
			members: [],
		},
	});

	const members = watch('members');

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		setIsLoading(true);
		axios
			.post('/api/conversations', {
				...data,
				isGroup: true,
			})
			.then(() => {
				router.refresh();
				onClose();
			})
			.catch(() => toast.error('Something went wrong'))
			.finally(() => setIsLoading(false));
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<div className='border-b border-gray-900/10 pb-12'>
						<h2 className='text-base font-semibold leading-7 text-gray-900'>
							Create a group chat
						</h2>

						<p className='mt-1 text-sm leading-6 text-gray-600'>
							Create a chat with more than 2 people
						</p>

						<div className='mt-10 flex flex-col gap-y-8'>
							<Input
								required
								label={'Name'}
								id={'name'}
								disabled={isLoading}
								register={register}
								errors={errors}
							/>

							<Select
								disabled={isLoading}
								label={'Members'}
								options={users.map((user) => ({
									label: user.name,
									value: user.id,
								}))}
								onChange={(value: any) =>
									setValue('members', value, {
										shouldValidate: true,
									})
								}
								value={members}
							/>
						</div>
					</div>
				</div>

				<div className={'mt-6 flex items-center justify-end gap-4'}>
					<Button
						secondary
						type={'button'}
						disabled={isLoading}
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button disabled={isLoading} type={'submit'}>
						Create
					</Button>
				</div>
			</form>
		</Modal>
	);
};
