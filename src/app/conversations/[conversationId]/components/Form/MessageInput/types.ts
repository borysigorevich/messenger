import { FormSchema } from '@/app/conversations/[conversationId]/components/Form/types';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

export type MessageInputProps = {
	id: keyof FormSchema;
	placeholder: string;
	required?: boolean;
	errors: FieldErrors;
	register: UseFormRegister<FormSchema>;
	type?: React.HTMLInputTypeAttribute;
};
