import React from 'react'
import { CloseIcon, IconButton } from '.'

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
            className='fixed left-0 top-0 z-40  hidden h-screen w-screen items-center backdrop-blur-sm aria-expanded:flex'
            onClick={() => setIsOpen(false)}
        >
            <div
                aria-expanded={isOpen}
                className='fixed z-50 h-full w-full scale-100 overflow-y-auto bg-gradient-to-br from-back-500 to-back-600 p-8 md:left-[12.5%] md:h-3/4 md:w-3/4 md:rounded-2xl xl:left-1/4 xl:w-1/2'
                onClick={ev => ev.stopPropagation()}
            >
                {title}
                <IconButton icon={<CloseIcon />} onClick={() => setIsOpen(false)} className='absolute right-7 top-7' />

                {content || children}
            </div>
        </div>
    </>
)
