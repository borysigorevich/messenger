'use client'
import {MessageInputProps} from "@/app/conversations/[conversationId]/components/Form/MessageInput/types";
import React from 'react';

export const MessageInput: React.FC<MessageInputProps> = (
    {
        register,
        errors,
        required,
        placeholder,
        type,
        id
    }
) => {
    return (
        <div className='relative w-full'>
            <input
                type={type}
                id={id}
                autoComplete={id}
                placeholder={placeholder}
                {...register(id, {required})}
                className='py-2 px-4 bg-neutral-100 rounded-full focus:outline-none w-full font-light text-black'
            />
        </div>
    );
};