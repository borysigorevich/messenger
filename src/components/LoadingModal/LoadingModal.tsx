'use client';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { ClipLoader } from 'react-spinners';

type LoadingModalProps = {
	isLoading: boolean;
};

export const LoadingModal = ({ isLoading }: LoadingModalProps) => {
	return (
		<Transition.Root show={isLoading} as={Fragment}>
			<Dialog
				as={'div'}
				className={'relative z-50'}
				onClose={() => {
					console.log('asdf');
				}}
			>
				<Transition.Child
					as={Fragment}
					enter={'ease-out duration-300'}
					enterFrom={'opacity-0'}
					enterTo={'opacity-100'}
					leave={'ease-in duration-200'}
					leaveFrom={'opacity-100'}
					leaveTo={'opacity-0'}
				>
					<div className='fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity' />
				</Transition.Child>

				<div className='fixed inset-0 z-10 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Dialog.Panel>
							<ClipLoader size={40} color={'#02847c'} />
						</Dialog.Panel>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
