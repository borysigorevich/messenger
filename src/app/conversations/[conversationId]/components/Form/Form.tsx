'use client';
import { MessageInput } from '@/app/conversations/[conversationId]/components/Form/MessageInput';
import { FormSchema } from '@/app/conversations/[conversationId]/components/Form/types';
import { useConversation } from '@/hooks/useConversation';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/all';

export const Form = () => {
	const { conversationId } = useConversation();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormSchema>({
		defaultValues: {
			message: '',
		},
	});

	const onSubmit: SubmitHandler<FormSchema> = async (formValues) => {
		await axios.post('/api/messages', {
			...formValues,
			conversationId,
		});
		reset();
	};

	const handleUpload = async (result: any) => {
		await axios.post('/api/messages', {
			image: result?.info?.secure_url,
			conversationId,
		});
	};

	return (
		<div className='flex w-full items-center gap-2 border-t bg-white px-4 py-4 lg:gap-4'>
			<CldUploadButton
				options={{
					maxFiles: 1,
				}}
				onUpload={handleUpload}
				uploadPreset='jpaj8lbk'
			>
				<HiPhoto size={30} className='text-sky-500' />
			</CldUploadButton>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex w-full items-center gap-2 lg:gap-4'
			>
				<MessageInput
					register={register}
					errors={errors}
					placeholder='Type a message'
					id='message'
					type='text'
				/>
				<button
					type='submit'
					className='rounded-full bg-sky-500 p-2 text-white hover:bg-sky-600'
				>
					<HiPaperAirplane size={18} className='rotate-90' />
				</button>
			</form>
		</div>
	);
};
