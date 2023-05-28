import React from 'react'

import { auth } from '../api/firebase'

import { BasePage } from '.'
import { Button } from '../components'
import { Router } from '../resources'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const onSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(_ => {
                navigate(Router.home.path)
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    return
                }
                console.log(error)
            })
    }

    return (
        <BasePage>
            <div className='flex h-full w-full items-center justify-center'>
                <div className='w-full max-w-md p-4'>
                    <h1 className='mb-4 text-3xl'>Sign in to your account</h1>

                    <label className='mb-1 text-gray-300'>Email:</label>
                    <input
                        type='text'
                        placeholder='example@mail.com'
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                        className='mb-3 w-full rounded-3xl border border-primary-500 bg-transparent p-2 px-3 outline-0 focus:border-white focus:ring-0'
                        required
                    />
                    <label className='mb-1 text-gray-300'>Password:</label>
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        className='mb-9 w-full rounded-3xl border border-primary-500 bg-transparent p-2 px-3 outline-0 focus:border-white focus:ring-0'
                        required
                    />

                    <Button onClick={onSignIn} disabled={email.length < 3 || password.length < 6} className='w-full'>
                        Sign In
                    </Button>
                </div>
            </div>
        </BasePage>
    )
}
