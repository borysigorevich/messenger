import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, ReactNode} from 'react';
import {IoClose} from "react-icons/all";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
}

export const Modal = ({
                          children, onClose, isOpen
                      }: ModalProps) => {
    return (
        <Transition.Root
            show={isOpen}
            as={Fragment}
        >
            <Dialog

                as={'div'}
                className='z-50 h-full fixed inset-0'
                onClose={(props) => {
                    console.log({props}, 'here')
                    onClose()
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
                    <div
                        className={'fixed inset-0 bg-gray-500/75 transition-opacity'}
                    />
                </Transition.Child>

                <div
                    className='flex items-center justify-center p-4 text-center sm:p-0 min-h-full'
                >
                    <Transition.Child
                        enter={'ease-out duration-300'}
                        enterFrom={'translate-y-4 opacity-0 scale-95  sm:scale-95'}
                        enterTo={'translate-y-0 opacity-100 scale-100 sm:scale-100'}
                        leave={'ease-in duration-200'}
                        leaveFrom={'translate-y-0 opacity-100 scale-100 sm:scale-100'}
                        leaveTo={'translate-y-4 opacity-0 scale-95 sm:translate-y-0 sm:scale-95'}
                    >

                        <Dialog.Panel
                            className={'relative transform bg-white rounded-lg overflow-hidden p-4 text-left shadow-xl sm:my-8 w-full sm:max-w-lg  sm:p-6 max-w-[450px]'}
                        >
                            <div className='absolute top-0 right-0 hidden pr-4 pt-4 sm:block z-10 '>

                                <button
                                    className='rounded-md  text-gray-400 hover:text-gray-500 focus:outline-none
                                        focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 backdrop-blur-sm
                                    '
                                    onClick={onClose}
                                >
                                    <span className='sr-only'>Close</span>
                                    <IoClose
                                        className='w-6 h-6'
                                    />
                                </button>
                            </div>
                            {children}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};