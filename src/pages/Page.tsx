import React from 'react'
import { LeftIcon, Navigation, RightIcon } from '../components'

interface BasePageProps {
    hide?: boolean
    content?: React.ReactNode
    children?: React.ReactNode
}

export const BasePage: React.FC<BasePageProps> = ({ hide = false, content, children }) => {
    const [open, setOpen] = React.useState(true)

    return (
        <div className='fixed flex h-screen w-screen overflow-hidden'>
            <Navigation open={hide ? false : open} />
            <main className='h-screen flex-grow overflow-hidden overflow-y-scroll bg-gradient-to-br from-back-500 to-back-900 text-white'>
                {content || children}
            </main>
            {!hide && (
                <button
                    className='absolute bottom-6 left-6 z-50 flex justify-center rounded-3xl border border-white bg-gradient-to-br from-back-500 to-back-600 p-2 text-white'
                    onClick={() => setOpen(!open)}
                >
                    {open ? <LeftIcon /> : <RightIcon />}
                </button>
            )}
        </div>
    )
}
