import React from 'react'

interface BoxProps {
    className?: string
    children?: React.ReactNode
}

export const Box: React.FC<BoxProps> = ({ className = '', children }) => (
    <div className={'w-full p-8 ' + className}>{children}</div>
)
