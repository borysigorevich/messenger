import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, ReactNode } from 'react';
import { IoClose } from 'react-icons/all';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children?: ReactNode;
};

export const Modal = ({ children, onClose, isOpen }: ModalProps) => {
	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog
				as={'div'}
				className='relative z-50'
				onClose={(props) => {
					console.log({ props }, 'here');
					onClose();
				}}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className={'fixed inset-0 bg-gray-500/75 transition-opacity'} />
				</Transition.Child>

				<div className='fixed inset-0 flex  items-center'>
					<div className=' flex-1 p-4 text-center  sm:p-0'>
						<Transition.Child
							enter={'ease-out duration-300'}
							enterFrom={'translate-y-4 opacity-0 scale-95  sm:scale-95'}
							enterTo={'translate-y-0 opacity-100 scale-100 sm:scale-100'}
							leave={'ease-in duration-200'}
							leaveFrom={'translate-y-0 opacity-100 scale-100 sm:scale-100'}
							leaveTo={
								'translate-y-4 opacity-0 scale-95 sm:translate-y-0 sm:scale-95'
							}
						>
							<Dialog.Panel
								className={
									'relative mx-auto transform overflow-hidden rounded-lg bg-white p-4 ' +
									'w-full max-w-[450px] text-left shadow-xl sm:my-8  sm:max-w-lg sm:p-6'
								}
							>
								<div className='absolute right-0 top-0 z-10 hidden pr-4 pt-4 sm:block '>
									<button
										className='rounded-md  text-gray-400 backdrop-blur-sm hover:text-gray-500
                                        focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
                                    '
										onClick={onClose}
									>
										<span className='sr-only'>Close</span>
										<IoClose className='h-6 w-6' />
									</button>
								</div>
								{children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
