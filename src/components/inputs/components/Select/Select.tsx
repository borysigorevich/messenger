import React from 'react';
import ReactSelect from 'react-select';

type SelectProps = {
	disabled?: boolean;
	label?: string;
	onChange: (value: Record<string, any>) => void;
	value: any;
	options: Record<string, any>[];
};

export const Select = ({ disabled, label, onChange, value, options }: SelectProps) => {
	return (
		<div className='z-[100]'>
			<label className='block text-sm font-medium leading-6 text-gray-900 '>
				{label}
			</label>

			<div className={'mt-2'}>
				<ReactSelect
					isMulti
					options={options}
					onChange={onChange}
					isDisabled={disabled}
					value={value}
					menuPortalTarget={document.body}
					styles={{
						menuPortal: (styles) => ({
							...styles,
							zIndex: 9999,
						}),
					}}
					classNames={{
						control: () => 'text-sm',
					}}
				/>
			</div>
		</div>
	);
};
