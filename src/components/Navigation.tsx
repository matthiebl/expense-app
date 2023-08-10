import React from 'react'
import { Router } from '../resources/routes'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '.'
import { getAuth, signOut } from 'firebase/auth'

interface NavigationProps {
    open: boolean
}

export const Navigation: React.FC<NavigationProps> = ({ open }) => {
    const navigate = useNavigate()

    const onSignOut = () => {
        const auth = getAuth()
        signOut(auth)
            .then(() => {
                navigate(Router.login.path)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div
            aria-expanded={open}
            className='top-0 z-20 hidden h-screen w-screen shrink-0 flex-col overflow-hidden bg-gradient-to-br from-back-500 to-back-700 text-white shadow-2xl drop-shadow-2xl aria-expanded:sticky aria-expanded:flex sm:w-48 aria-expanded:sm:sticky lg:w-52 xl:w-56'
        >
            <div className='flex h-48 min-h-[100px] w-full items-center justify-center rounded-b-2xl bg-gradient-to-br from-secondary-500 to-secondary-900 drop-shadow-2xl lg:h-52 xl:h-56'>
                <Link to={Router.home.path}>
                    <h2 className='text-xl underline underline-offset-4'>{Router.home.text}</h2>
                </Link>
            </div>
            <nav className='align-center flex flex-grow flex-col gap-8 overflow-y-scroll p-10'>
                <Button link={Router.home.path} colour='bg-gradient-to-br from-alt-500 to-alt-900'>
                    {Router.home.linktext}
                </Button>
                <Button link={Router.summary.path} colour='bg-gradient-to-br from-alt2-500 to-alt2-900'>
                    {Router.summary.linktext}
                </Button>
                <Button link={Router.income.path} colour='bg-gradient-to-br from-alt-500 to-alt-900'>
                    {Router.income.linktext}
                </Button>
                <Button link={Router.expenses.path} colour='bg-gradient-to-br from-alt-500 to-alt-900'>
                    {Router.expenses.linktext}
                </Button>
                <Button link={Router.invest.path} colour='bg-gradient-to-br from-alt-500 to-alt-900'>
                    {Router.invest.linktext}
                </Button>
                <Button link={Router.add.path} colour='bg-gradient-to-br from-back-500'>
                    {Router.add.linktext}
                </Button>
                <Button onClick={onSignOut} colour='bg-gradient-to-br from-back-500'>
                    Logout
                </Button>
            </nav>
        </div>
    )
}
