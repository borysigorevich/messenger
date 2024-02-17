import React from 'react';
import { InputProps } from '@/components/inputs/types';
import clsx from 'clsx';

export const Input: React.FC<InputProps> = ({
	register,
	errors,
	label,
	id,
	type,
	required,
	disabled,
}) => {
	return (
		<div>
			<label htmlFor={id} className='text-sm font-medium leading-6 text-gray-900'>
				{label}
			</label>
			<div className='mt-2'>
				<input
					id={id}
					type={type}
					disabled={disabled}
					autoComplete={id}
					{...register(id, {
						required,
					})}
					className={clsx(
						`
                        ring-sm form-input w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600
                         sm:text-sm sm:leading-6`,
						errors[id] && 'ring-2 ring-rose-500 focus:ring-rose-500',
						disabled && 'cursor-default opacity-50'
					)}
				/>
			</div>
		</div>
	);
};
