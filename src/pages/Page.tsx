import React from 'react'

interface BasePageProps {
    navigation?: React.ReactNode
    content?: React.ReactNode
    children?: React.ReactNode
}

export const BasePage: React.FC<BasePageProps> = ({ navigation, content, children }) => (
    <div className='flex min-h-screen w-full'>
        {navigation}
        <main className='static w-full bg-gradient-to-br from-back-500 to-back-900 text-white'>
            {content || children}
        </main>
    </div>
)
