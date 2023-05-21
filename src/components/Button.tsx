import React from 'react'
import { useNavigate } from 'react-router-dom'

interface ButtonProps {
    variant?: 'solid' | 'outlined' | 'text'
    text?: string
    colour?: string
    className?: string
    link?: string
    onClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    disabled?: boolean
    children?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'solid',
    text,
    colour,
    className = '',
    link,
    onClick = () => {},
    disabled = false,
    children,
}) => {
    const navigate = useNavigate()

    const clickAction = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (link) navigate(link)
        else if (onClick) onClick(ev)
    }

    return (
        <button
            onClick={clickAction}
            className={
                'rounded-3xl p-3 px-4 text-sm shadow-2xl duration-100 hover:scale-105 disabled:text-gray-300 disabled:hover:scale-100 ' +
                (colour ? colour : variantDefaults[variant].colour) +
                variantDefaults[variant].style +
                className
            }
            disabled={disabled}
        >
            {text || children}
        </button>
    )
}

const variantDefaults = {
    solid: {
        colour: ' bg-gradient-to-br from-primary-500 to-primary-900 ',
        style: ' disabled:from-gray-400 disabled:to-gray-600 ',
    },
    outlined: {
        colour: ' border-primary-500 hover:bg-primary-500 ',
        style: ' border-2 disabled:border-gray-500 disabled:bg-transparent ',
    },
    text: {
        colour: ' ',
        style: ' hover:underline underline-offset-4 ',
    },
}
