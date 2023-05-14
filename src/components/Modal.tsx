import React from 'react'
import { Card, CloseIcon, IconButton } from '.'

interface ModalProps {
    title?: React.ReactNode
    content?: React.ReactNode
    isOpen: boolean
    setIsOpen: (_: boolean) => void
    children?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ title, content, isOpen, setIsOpen, children }) => (
    <>
        <Card
            aria-expanded={isOpen}
            className='fixed left-1/4 top-1/4 z-50 h-1/2 w-1/2 scale-0 overflow-y-auto duration-100 aria-expanded:scale-100'
        >
            {title}
            <IconButton icon={<CloseIcon />} onClick={() => setIsOpen(false)} className='absolute right-7 top-7' />

            {content || children}
        </Card>
        <div
            aria-expanded={isOpen}
            aria-hidden
            className='fixed left-0 top-0 z-40 hidden h-screen w-screen backdrop-blur-sm duration-100 aria-expanded:block'
            onClick={() => setIsOpen(false)}
        />
    </>
)
