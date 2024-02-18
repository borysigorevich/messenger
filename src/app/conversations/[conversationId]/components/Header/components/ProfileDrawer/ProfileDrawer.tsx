import { HeaderType } from '@/app/conversations/[conversationId]/components/Header/components/ProfileDrawer/types';
import { Avatar } from '@/components/Avatar';
import { AvatarGroup } from '@/components/AvatarGroup';
import { ConfirmModal } from '@/components/ConfirmModal';
import { useActiveList } from '@/hooks/useActiveList';
import { useOtherUser } from '@/hooks/useOtherUser';
import { Dialog, Transition } from '@headlessui/react';
import { format } from 'date-fns';
import React, { Fragment, useMemo, useState } from 'react';
import { IoClose, IoTrash } from 'react-icons/all';

export const ProfileDrawer: React.FC<HeaderType> = ({ isOpen, onClose, data }) => {
	const otherUser = useOtherUser(data);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

	const members = useActiveList((state) => state.members);

	const isActive = members.includes(otherUser?.email || '');

	const joinedDate = useMemo(() => {
		return format(new Date(otherUser?.createdAt || Date.now()), 'PP');
	}, [otherUser]);

	const title = data.name || otherUser?.name;
	const statusText = useMemo(() => {
		if (data.isGroup) {
			return `${data.users.length} members`;
		}

		return isActive ? 'Active' : 'Offline';
	}, [data, isActive]);

	const handleModalOpen = () => {
		setIsConfirmModalOpen(true);
	};
	const handleModalClose = () => {
		setIsConfirmModalOpen(false);
	};

	return (
		<>
			<Transition.Root show={isOpen} as={Fragment}>
				<Dialog as={'div'} className='relative z-50' onClose={onClose}>
					<Transition.Child
						enter={'ease-in-out duration-500'}
						enterFrom='opacity-0'
						enterTo={'opacity-100'}
						leave={'ease-in duration-500'}
						leaveFrom={'opacity-100'}
						leaveTo={'opacity-0'}
					>
						<div className='fixed inset-0 bg-black/40' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-hidden'>
						<div className='absolute inset-0 overflow-hidden'>
							<div className='pointer-events-none fixed inset-y-0 right-0 max-w-full pl-10'>
								<Transition.Child
									as={Fragment}
									enter='ease-out duration-300'
									enterFrom='translate-x-full'
									enterTo='translate-x-0'
									leave='ease-in duration-300'
									leaveFrom='translate-x-0'
									leaveTo='translate-x-full'
								>
									<Dialog.Panel className='pointer-events-auto h-full w-screen max-w-md'>
										<div className='flex h-full flex-col bg-white py-6 shadow-xl '>
											<div className='px-4 sm:px-6'>
												<div className='flex items-start justify-end gap-10'>
													<div className='ml-3 flex h-7 items-center'>
														<button
															type='button'
															className='rounded-md bg-white text-gray-400 transition
                                                         hover:scale-110 hover:text-gray-500 focus:outline-none focus:ring-2
                                                         focus:ring-sky-500 focus:ring-offset-2'
															onClick={onClose}
														>
															<span className='sr-only'>
																Close panel
															</span>
															<IoClose size={24} />
														</button>
													</div>
												</div>
											</div>

											<div className='relative mt-6 flex-1 px-4 sm:px-6'>
												<div className='flex flex-col items-center'>
													<div className='mb-2'>
														{data.isGroup ? (
															<AvatarGroup
																users={data.users}
															/>
														) : (
															<Avatar
																currentUser={otherUser}
															/>
														)}
													</div>
													<div>{title}</div>
													<div className='text-sm text-gray-500'>
														{statusText}
													</div>

													<div className='my-8 flex gap-10'>
														<div
															onClick={handleModalOpen}
															className='flex cursor-pointer flex-col items-center gap-3 hover:opacity-75'
														>
															<div className='flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100'>
																<IoTrash size={20} />
															</div>

															<div className='text-sm font-light text-neutral-600'>
																Delete
															</div>
														</div>
													</div>

													<div className='w-full pb-5 pt-5 sm:px-0 sm:pt-0'>
														<dl className='space-y-8 px-4 sm:space-y-6 sm:px-6'>
															{data.isGroup && (
																<div>
																	<dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
																		Emails
																	</dt>
																	<dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
																		{data.users
																			.map(
																				(user) =>
																					user.email
																			)
																			.join(', ')}
																	</dd>
																</div>
															)}

															{!data.isGroup && (
																<div>
																	<dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
																		Email
																	</dt>
																	<dd className='col-span-2 mt-1 text-sm text-gray-900'>
																		{otherUser?.email}
																	</dd>
																</div>
															)}

															{!data.isGroup && (
																<>
																	<hr />
																	<div>
																		<dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
																			Joined
																		</dt>

																		<dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
																			<time
																				dateTime={
																					joinedDate
																				}
																			>
																				{
																					joinedDate
																				}
																			</time>
																		</dd>
																	</div>
																</>
															)}
														</dl>
													</div>
												</div>
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>

					<ConfirmModal
						isOpen={isConfirmModalOpen}
						onClose={handleModalClose}
					/>
				</Dialog>
			</Transition.Root>
		</>
	);
};
