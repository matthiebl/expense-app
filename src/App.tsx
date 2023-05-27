import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Router } from './resources/routes'
import { Dashboard, Expenses, Income, Investments, NewEntry, Summary } from './pages'

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path={Router.home.path} element={<Dashboard />} />
            <Route path={Router.summary.path} element={<Summary />} />
            <Route path={Router.income.path} element={<Income />} />
            <Route path={Router.expenses.path} element={<Expenses />} />
            <Route path={Router.invest.path} element={<Investments />} />
            <Route path={Router.add.path} element={<NewEntry />} />
        </Routes>
    </BrowserRouter>
)

export default App
