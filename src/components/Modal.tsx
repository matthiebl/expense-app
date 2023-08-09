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
        <div
            aria-expanded={isOpen}
            aria-hidden
            className='fixed left-0 top-0 z-40  hidden h-screen w-screen items-center px-[25%] backdrop-blur-sm aria-expanded:flex'
            onClick={() => setIsOpen(false)}
        >
            <Card
                aria-expanded={isOpen}
                className='relative z-50 h-full max-h-[50%] scale-100 overflow-y-auto'
                onClick={ev => ev.stopPropagation()}
            >
                {title}
                <IconButton icon={<CloseIcon />} onClick={() => setIsOpen(false)} className='absolute right-7 top-7' />

                {content || children}
            </Card>
        </div>
    </>
)
