import React from 'react';
import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';
import { FormSchema } from '@/components/form/types';

export type InputProps = {
	label: string;
	id: keyof FormSchema;
	type?: React.HTMLInputTypeAttribute;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	disabled?: boolean;
};
