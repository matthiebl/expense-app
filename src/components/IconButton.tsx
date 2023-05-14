import React from 'react'

interface IconButtonProps {
    icon?: React.ReactNode
    onClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    className?: string
    children?: React.ReactNode
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, onClick = () => {}, className = '', children }) => (
    <button className={'rounded-3xl border border-transparent p-1 hover:border-white ' + className} onClick={onClick}>
        {icon || children}
    </button>
)
