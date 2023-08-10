import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Router } from './resources/routes'
import { Dashboard, Expenses, Income, Investments, NewEntry, Summary } from './pages'
import { UserAuth } from './pages/Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './api/firebase'
import { TransactionT } from './resources'
import { Loading } from './pages/Loading'
import { getTransactions } from './api'
import { Example } from './pages/Example'

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
                        <Route path={Router.summary.path} element={<Summary {...transactions} />} />
                        <Route path={Router.income.path} element={<Income {...transactions} />} />
                        <Route path={Router.expenses.path} element={<Expenses {...transactions} />} />
                        <Route path={Router.invest.path} element={<Investments {...transactions} />} />
                        <Route
                            path={Router.add.path}
                            element={<NewEntry data={transactions} setData={setTransactions} />}
                        />
                    </>
                )}
                {/* <Route path={'/test'} element={<Example />} /> */}
                <Route path={Router.login.path} element={<UserAuth />} />
                <Route path={Router.register.path} element={<UserAuth register />} />
                <Route path='*' element={<Loading auth={authed} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
