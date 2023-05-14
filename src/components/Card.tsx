import React from 'react'

interface CardProps {
    content?: React.ReactNode
    background?: boolean
    className?: string
    children?: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ content, background = false, className = '', children }) => (
    <div
        className={
            'w-full rounded-2xl p-8 shadow-2xl drop-shadow-2xl ' +
            (background ? '' : 'bg-gradient-to-br from-back-500 to-back-600 ') +
            className
        }
    >
        {content || children}
    </div>
)
