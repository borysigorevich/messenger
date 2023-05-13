import React from 'react';
import {AutSocialButtonProps} from "@/components/authSocialButton/types";

export const AuthSocialButton: React.FC<AutSocialButtonProps> = (
    {
        onClick,
        Icon
    }
) => {
    return (
        <button
            type='button'
            onClick={onClick}
            className='inline-flex w-full justify-center px-4 py-2 rounded-md bg-white text-gray-500 shadow-sm transition
             ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
        >
            <Icon/>
        </button>
    );
};