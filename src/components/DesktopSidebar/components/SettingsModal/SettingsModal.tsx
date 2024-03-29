import { Button } from '@/components/button';
import { Input } from '@/components/inputs';
import { Modal } from '@/components/Modal';
import { User } from '@prisma/client';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type SettingsModalProps = {
	isOpen: boolean;
	onClose: () => void;
	currentUser: User | null;
};

type FormValues = {
	name?: string | null;
	image?: string | null;
};

export const SettingsModal = ({ currentUser, onClose, isOpen }: SettingsModalProps) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			name: currentUser?.name,
			image: currentUser?.image,
		},
	});

	const image = watch('image');

	const handleUpload = (result: any) => {
		setValue('image', result?.info?.secure_url, {
			shouldValidate: true,
		});
	};

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		axios
			.post('/api/settings', data)
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
							Profile
						</h2>
						<p className='mt-1 text-sm leading-6 text-gray-600'>
							Edit your public information
						</p>
						<div className='mt-10 flex flex-col gap-y-8'>
							<Input
								required
								disabled={isLoading}
								label='Name'
								id='name'
								errors={errors}
								register={register}
							/>

							<div>
								<label
									htmlFor=''
									className='block text-sm font-medium leading-6 text-gray-900'
								></label>
								<div className='mt-2 flex items-center gap-x-3'>
									<Image
										width={48}
										height={48}
										className='h-10 w-10 rounded-full'
										src={
											image ||
											currentUser?.image ||
											'/images/placeholder.jpg'
										}
										alt={'Avatar'}
									/>

									<CldUploadButton
										options={{ maxFiles: 1 }}
										onUpload={handleUpload}
										uploadPreset='jpaj8lbk'
									>
										<Button
											secondary
											disabled={isLoading}
											type={'button'}
										>
											Change
										</Button>
									</CldUploadButton>
								</div>
							</div>
						</div>
					</div>

					<div className='mt-6 flex items-center justify-end gap-x-4'>
						<Button secondary disabled={isLoading} onClick={onClose}>
							Cancel
						</Button>

						<Button disabled={isLoading} type={'submit'}>
							Save
						</Button>
					</div>
				</div>
			</form>
		</Modal>
	);
};
