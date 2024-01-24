import {HeaderType} from "@/app/conversations/[conversationId]/components/Header/components/ProfileDrawer/types";
import {Avatar} from "@/components/Avatar";
import {useOtherUser} from "@/hooks/useOtherUser";
import {Dialog, Transition} from "@headlessui/react";
import {format} from "date-fns";
import React, {Fragment, useMemo} from 'react';
import {IoClose} from "react-icons/all";

export const ProfileDrawer: React.FC<HeaderType> = (
    {
        isOpen,
        onClose,
        data
    }) => {

    const otherUser = useOtherUser(data)

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser?.createdAt || ''), 'PP')
    }, [otherUser])

    const title = data.name || otherUser?.name
    const statusText = data.isGroup ? `${data.users.length} members` : 'Active'

    return (
        <Transition.Root
            show={isOpen}
            as={Fragment}
        >
            <Dialog as={'div'} className='relative z-50' onClose={onClose}>
                <Transition.Child
                    enter={'ease-in-out duration-500'}
                    enterFrom='opacity-0'
                    enterTo={'opacity-100'}
                    leave={'ease-in duration-500'}
                    leaveFrom={'opacity-100'}
                    leaveTo={'opacity-0'}
                >
                    <div className='fixed inset-0 bg-black/40'/>
                </Transition.Child>

                <div className='fixed inset-0 overflow-hidden'>
                    <div className='absolute inset-0 overflow-hidden'>

                        <div className='fixed inset-y-0 right-0 max-w-full pointer-events-none pl-10'>

                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='translate-x-full'
                                enterTo='translate-x-0'
                                leave='ease-in duration-300'
                                leaveFrom='translate-x-0'
                                leaveTo='translate-x-full'
                            >

                                <Dialog.Panel className='pointer-events-auto w-screen max-w-md h-full'>
                                    <div className='flex flex-col h-full bg-white py-6 shadow-xl '>


                                        <div className='px-4 sm:px-6'>
                                            <div className='flex items-start justify-end gap-10'>
                                                <div className='ml-3 flex h-7 items-center'>
                                                    <button
                                                        type='button'
                                                        className='rounded-md bg-white text-gray-400 hover:text-gray-500
                                                         focus:outline-none focus:ring-2 focus:ring-offset-2 transition
                                                         focus:ring-sky-500 hover:scale-110'
                                                        onClick={onClose}
                                                    >
                                                        <span className='sr-only'>Close panel</span>
                                                        <IoClose size={24}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>


                                        <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                                            <div className='flex flex-col items-center'>
                                                <div className='mb-2'>
                                                    <Avatar currentUser={otherUser}/>
                                                </div>
                                                <div>
                                                    {title}
                                                </div>
                                                <div className='text-sm text-gray-500'>
                                                    {statusText}
                                                </div>

                                                <div className='flex gap-10 my-8'>
                                                    <div
                                                        onClick={() => {
                                                        }}
                                                        className='flex flex-col gap-3 items-center cursor-pointer hover:opacity-75'
                                                    >
                                                        <div className='w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center'>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Dialog.Panel>

                            </Transition.Child>

                        </div>

                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};