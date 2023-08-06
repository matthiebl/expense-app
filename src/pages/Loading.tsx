import React from 'react'

import { BasePage } from '.'
import { useNavigate } from 'react-router-dom'
import { Router } from '../resources'

interface LoadingProps {
    auth: null | boolean
}

export const Loading: React.FC<LoadingProps> = props => {
    const navigate = useNavigate()

    React.useEffect(() => {
        if (props.auth === false) {
            navigate(Router.login.path)
        }
    }, [props.auth])

    return (
        <BasePage>
            <div className='flex h-full w-full flex-col items-center justify-center'>
                <h1 className='mb-4 text-3xl'>Just loading...</h1>
                <p className='text-gray-400'>Or you may have travelled to the wrong URL</p>
                <p className='mt-3 text-gray-400'>
                    Go back to the{' '}
                    <a
                        className='cursor-pointer underline hover:text-gray-200'
                        onClick={() => navigate(Router.home.path)}
                    >
                        Dashboard
                    </a>{' '}
                    or try{' '}
                    <a
                        className='cursor-pointer underline hover:text-gray-200'
                        onClick={() => navigate(Router.login.path)}
                    >
                        logging in
                    </a>
                </p>
            </div>
        </BasePage>
    )
}
