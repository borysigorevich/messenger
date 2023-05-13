import React from 'react'
import {UseFormRegister, FieldErrors} from 'react-hook-form'
import {FormSchema} from "@/components/form/types";

export type InputProps = {
    label: string
    id: keyof FormSchema
    type?: React.HTMLInputTypeAttribute
    required?: boolean
    register: UseFormRegister<FormSchema>
    errors: FieldErrors
    disabled?: boolean
}