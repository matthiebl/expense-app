import React from 'react'

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Router } from './resources/routes'
import { Dashboard, Expenses, Income, Investments, NewEntry, Summary } from './pages'
import { Login } from './pages/Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './api/firebase'
import { TransactionT } from './resources'
import { Loading } from './pages/Loading'

const App = () => {
    const [authed, setAuthed] = React.useState<null | boolean>(null)
    const [transactions, setTransactions] = React.useState<{ loading: boolean; data: TransactionT[] }>({
        loading: true,
        data: [],
    })

    React.useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log(user.uid)
                setAuthed(true)
                setTransactions({ ...transactions, loading: false })
            } else {
                setAuthed(false)
            }
        })
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                {authed && (
                    <>
                        <Route path={Router.home.path} element={<Dashboard />} />
                        <Route path={Router.summary.path} element={<Summary />} />
                        <Route path={Router.income.path} element={<Income />} />
                        <Route path={Router.expenses.path} element={<Expenses />} />
                        <Route path={Router.invest.path} element={<Investments />} />
                        <Route path={Router.add.path} element={<NewEntry />} />
                    </>
                )}
                <Route path={Router.login.path} element={<Login />} />
                <Route path='*' element={<Loading auth={authed} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
