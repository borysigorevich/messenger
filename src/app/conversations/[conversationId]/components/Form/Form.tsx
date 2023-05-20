'use client'
import {MessageInput} from "@/app/conversations/[conversationId]/components/Form/MessageInput";
import {FormSchema} from "@/app/conversations/[conversationId]/components/Form/types";
import {useConversation} from "@/hooks/useConversation";
import axios from "axios";
import {CldUploadButton} from "next-cloudinary";
import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {HiPaperAirplane, HiPhoto} from "react-icons/all";

export const Form = () => {
    const {conversationId} = useConversation()

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors
        },
    } = useForm<FormSchema>({
        defaultValues: {
            message: ''
        }
    })

    const onSubmit: SubmitHandler<FormSchema> = async (formValues) => {
        await axios.post('/api/messages', {
            ...formValues,
            conversationId
        })
        reset()
    }

    const handleUpload = async (result: any) => {
        await axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }

    return (
        <div className='py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
            <CldUploadButton
                options={{
                    maxFiles: 1
                }}
                onUpload={handleUpload}
                uploadPreset='jpaj8lbk'
            >
                <HiPhoto size={30} className='text-sky-500'/>
            </CldUploadButton>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex items-center gap-2 lg:gap-4 w-full'
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
                    className='bg-sky-500 hover:bg-sky-600 text-white rounded-full p-2'
                >
                    <HiPaperAirplane size={18} className='rotate-90'/>
                </button>
            </form>
        </div>
    );
};