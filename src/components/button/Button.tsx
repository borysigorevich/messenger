import React from 'react';
import {ButtonProps} from "@/components/button/types";
import clsx from "clsx";

export const Button: React.FC<ButtonProps> = (
    {
        onClick,
        danger,
        disabled,
        fullWidth,
        type,
        secondary,
        children,
    }
) => {
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={clsx(
                `flex justify-center py-2 px-3 rounded-md text-sm font-semibold transition
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
                disabled && 'opacity-50 cursor-default',
                fullWidth && 'w-full',
                secondary ? 'text-gray-900' : 'text-white',
                danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
                !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
            )}
        >
            {children}
        </button>
    );
};