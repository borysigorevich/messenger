import {Button} from "@/components/button";
import {Modal} from "@/components/Modal";
import {useConversation} from "@/hooks/useConversation";
import {Dialog} from "@headlessui/react";
import axios from "axios";
import {useRouter} from "next/navigation";
import React, {useState} from 'react';
import toast from "react-hot-toast";
import {FiAlertTriangle} from "react-icons/all";

type ConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;

}

export const ConfirmModal = ({
                                 isOpen, onClose

                             }: ConfirmModalProps) => {

    const router = useRouter()
    const {conversationId} = useConversation()
    const [isLoading, setIsLoading] = useState(false)

    const onDelete = () => {
        setIsLoading(true)
        axios.delete(`/api/conversations/${conversationId}`).then(() => {
            onClose()
            router.push('/conversations')
            router.refresh()
        }).catch((error) => {
            console.error(error)
            toast.error('Something went wrong')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={'sm:flex sm:items-start'}>
                <div
                    className='mx-auto flex h-12 w-12 flex-shrink-0 items-center rounded-full bg-red-100
                        sm:mx-0 sm:h-10 sm:w-10 justify-center'
                >
                    <FiAlertTriangle className='h-6 w-6 text-red-400'/>
                </div>

                <div
                    className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'
                >
                    <Dialog.Title
                        as={'h3'}
                        className='text-base font-semibold leading-6 text-gray-900'
                    >
                        Delete conversation
                    </Dialog.Title>
                    <div className='mt-2'>
                        <p className='text-sm text-gray-500'>Are you sure you want to delete this conversation? The
                            action cannot be undone</p>
                    </div>
                </div>
            </div>

            <div className='mt-5 sm:mt-4 flex flex-row-reverse gap-2'>
                <Button
                    danger
                    disabled={isLoading}
                    onClick={onDelete}
                >Delete</Button>

                <Button
                    secondary
                    disabled={isLoading}
                    onClick={onClose}
                >Cancel</Button>
            </div>
        </Modal>
    );
};