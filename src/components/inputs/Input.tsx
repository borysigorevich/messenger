import React from 'react';
import {InputProps} from "@/components/inputs/types";
import clsx from "clsx";

export const Input: React.FC<InputProps> = (
    {
        register,
        errors,
        label,
        id,
        type,
        required,
        disabled,
    }
) => {
    return (
        <div>
            <label
                htmlFor={id}
                className='font-medium text-sm leading-6 text-gray-900'
            >
                {label}
            </label>
            <div className='mt-2'>
                <input
                    id={id}
                    type={type}
                    disabled={disabled}
                    autoComplete={id}
                    {...register(id, {
                        required
                    })}
                    className={clsx(`
                        form-input w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-sm ring-inset 
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600
                         sm:text-sm sm:leading-6`,
                        errors[id] && 'focus:ring-rose-500 ring-rose-500 ring-2',
                        disabled && 'opacity-50 cursor-default'
                    )}
                />
            </div>
        </div>
    );
};