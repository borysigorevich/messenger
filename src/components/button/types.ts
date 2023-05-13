import React from 'react'

export type ButtonProps = {
    children: React.ReactNode
    type?: 'button' | 'submit' | 'reset'
    fullWidth?: boolean
    onClick?: () => void
    secondary?: boolean
    danger?: boolean
    disabled?: boolean
}