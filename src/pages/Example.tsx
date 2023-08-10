import React from 'react'

interface ExampleProps {}

export const Example: React.FC<ExampleProps> = () => {
    const [val, setVal] = React.useState(false)
    return (
        <div className='fixed flex h-screen w-screen overflow-hidden bg-red-300'>
            {/* Sidebar */}
            <div
                aria-hidden={val}
                className='flex h-screen w-screen min-w-[100vw] flex-col overflow-hidden bg-green-300 aria-hidden:hidden md:w-60 md:min-w-[15rem]'
            >
                <div className='min-h-[9rem] w-full bg-purple-400'>Always here</div>
                <div className='flex-grow overflow-hidden overflow-y-scroll'>
                    <LongContent />
                </div>
            </div>
            {/* Page body */}
            <div className='h-screen flex-grow overflow-hidden overflow-y-scroll bg-blue-300'>
                <LongContent />
            </div>
            <button className='fixed bottom-0 left-0 rounded bg-white p-2' onClick={() => setVal(!val)}>
                Open/Close
            </button>
        </div>
    )
}

const LongContent = () => (
    <div className='flex flex-col gap-16'>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
            <div className='w-80 bg-yellow-400 p-4'>{i}</div>
        ))}
    </div>
)
