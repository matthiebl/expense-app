import React from 'react'
import { Navigation } from '../components'

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
            <button className='absolute bottom-0 left-0 z-50 rounded bg-white p-2' onClick={() => setOpen(!open)}>
                Open/Close
            </button>
        </div>
    )
}
