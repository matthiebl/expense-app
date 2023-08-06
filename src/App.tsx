import React from 'react'

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Router } from './resources/routes'
import { Dashboard, Expenses, Income, Investments, NewEntry, Summary } from './pages'
import { Login } from './pages/Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './api/firebase'
import { TransactionT } from './resources'
import { Loading } from './pages/Loading'
import { getTransactions } from './api'

const App = () => {
    const [authed, setAuthed] = React.useState<null | boolean>(null)
    const [transactions, setTransactions] = React.useState<{ loading: boolean; data: TransactionT[] }>({
        loading: true,
        data: [],
    })

    React.useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setAuthed(true)
                getTransactions(user.uid, transactions => {
                    console.log(transactions)
                    setTransactions({ loading: false, data: transactions })
                })
            } else {
                setAuthed(false)
            }
        })
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                {authed && !transactions.loading && (
                    <>
                        <Route path={Router.home.path} element={<Dashboard {...transactions} />} />
                        <Route path={Router.summary.path} element={<Summary transactions={transactions} />} />
                        <Route path={Router.income.path} element={<Income transactions={transactions} />} />
                        <Route path={Router.expenses.path} element={<Expenses transactions={transactions} />} />
                        <Route path={Router.invest.path} element={<Investments transactions={transactions} />} />
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
