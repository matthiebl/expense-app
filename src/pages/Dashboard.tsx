import React from 'react'

import { TransactionT } from '../resources'
import { height } from '../resources/sizingSpacing'
import { BasePage } from '.'
import { Button, Card, IconButton, Modal, Navigation, SearchIcon } from '../components'

interface DashboardProps {
    data: TransactionT[]
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
    React.useEffect(() => {
        document.title = 'Finances | Dashboard'
    }, [])

    const [modalOpen, setModalOpen] = React.useState(false)
    const [search, setSearch] = React.useState('')

    return (
        <BasePage navigation={<Navigation />}>
            <SearchModal data={data} open={modalOpen} setOpen={setModalOpen} search={search} setSearch={setSearch} />
            <div className='flex h-full w-full gap-10 p-10'>
                <div className='flex h-full flex-grow flex-col gap-8'>
                    <h1 className='text-4xl'>Finances Dashboard</h1>
                    <div className='flex gap-8'>
                        <Card className='py-7'>
                            <p className='mb-3'>Income</p>
                            {incomeChange(data) === '' ? (
                                <p className='text-gray-300'>Missing data for last month</p>
                            ) : (
                                <>
                                    <p className='text-6xl text-primary-500'>{incomeChange(data)}</p>
                                    <p className='text-sm text-primary-500'>change since last month</p>
                                </>
                            )}
                        </Card>
                        <Card className='py-7'>
                            <p className='mb-3'>Expenses</p>
                            {expenseChange(data) === '' ? (
                                <p className='text-gray-300'>Missing data for last month</p>
                            ) : (
                                <>
                                    <p className='text-6xl text-alt-500'>{expenseChange(data)}</p>
                                    <p className='text-sm text-alt-500'>change since last month</p>
                                </>
                            )}
                        </Card>
                    </div>
                    <IncomeExpenseGraph transactions={data} rule='flex xl:hidden' months={2} />
                    <IncomeExpenseGraph transactions={data} rule='hidden xl:flex 2xl:hidden' months={3} />
                    <IncomeExpenseGraph transactions={data} rule='hidden 2xl:flex 3xl:hidden' months={4} />
                    <IncomeExpenseGraph transactions={data} rule='hidden 3xl:flex 4xl:hidden' months={5} />
                    <IncomeExpenseGraph transactions={data} rule='hidden 4xl:flex 5xl:hidden' months={6} />
                    <IncomeExpenseGraph transactions={data} rule='hidden 5xl:flex' months={7} />
                </div>

                <div className='flex h-full w-80 flex-col gap-8'>
                    <form onSubmit={ev => ev.preventDefault()}>
                        <Card className='flex gap-2 px-4 py-4'>
                            <input
                                type='text'
                                placeholder='Search transactions'
                                value={search}
                                onChange={ev => setSearch(ev.target.value)}
                                className='flex-grow rounded-3xl border border-transparent bg-transparent p-2 px-4 outline-0 focus:border-white focus:ring-0'
                            />
                            <IconButton icon={<SearchIcon />} onClick={() => setModalOpen(true)} className='p-2' />
                        </Card>
                    </form>
                    <Card className='flex-grow'></Card>
                    <Card></Card>
                    <Card className='flex-grow'></Card>
                </div>
            </div>
        </BasePage>
    )
}

interface SearchModalProps {
    data: TransactionT[]
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const SearchModal: React.FC<SearchModalProps> = ({ data, open, setOpen, search, setSearch }) => {
    const [filtered, setFiltered] = React.useState<TransactionT[]>([])

    const [minP, setMinP] = React.useState('')
    const [maxP, setMaxP] = React.useState('')
    const [fromD, setFromD] = React.useState('')
    const [toD, setToD] = React.useState('')

    React.useEffect(() => {
        if (open) {
            applyFilters()
        }
    }, [open])

    const applyFilters = () => {
        const transactions = data
            .filter(t => {
                if (minP) {
                    const price = parseFloat(minP)
                    if (t.amount < price) return false
                }
                if (maxP) {
                    const price = parseFloat(maxP)
                    if (t.amount > price) return false
                }
                if (fromD && t.date < fromD) {
                    return false
                }
                if (toD && t.date > toD) {
                    return false
                }
                return t.description.toLowerCase().includes(search.toLowerCase())
            })
            .sort((t1, t2) => -t1.date.localeCompare(t2.date))
        setFiltered(transactions)
    }

    return (
        <Modal
            title={<h3 className='mb-2 text-2xl'>Search transactions ({filtered.length})</h3>}
            isOpen={open}
            setIsOpen={setOpen}
        >
            <form
                onSubmit={ev => ev.preventDefault()}
                className='mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-normal'
            >
                <input
                    type='text'
                    value={'$ ' + minP}
                    onChange={ev => {
                        if (/^\$ -?\d*[.]?\d{0,2}$/.test(ev.target.value)) setMinP(ev.target.value.slice(2))
                    }}
                    className='mb-2 w-20 rounded-3xl border bg-transparent p-2 px-3 outline-0 before:block before:content-["$"] focus:border-white focus:ring-0'
                />
                <span className='mb-2'>-</span>
                <input
                    type='text'
                    value={'$ ' + maxP}
                    onChange={ev => {
                        if (/^\$ -?\d*[.]?\d{0,2}$/.test(ev.target.value)) setMaxP(ev.target.value.slice(2))
                    }}
                    className='mb-2 w-20 rounded-3xl border bg-transparent p-2 px-3 outline-0 before:block before:content-["$"] focus:border-white focus:ring-0'
                />
                <input
                    type='text'
                    placeholder='Filter description'
                    value={search}
                    onChange={ev => setSearch(ev.target.value)}
                    className='mb-2 flex-grow rounded-3xl border bg-transparent p-2 px-4 outline-0 focus:border-white focus:ring-0'
                />
                <input
                    type='date'
                    placeholder='01/01/2023'
                    value={fromD}
                    onChange={ev => setFromD(ev.target.value)}
                    className='mb-2 rounded-3xl border bg-transparent p-2 px-4 text-white outline-0 focus:border-white focus:ring-0'
                />
                <span className='mb-2'>-</span>
                <input
                    type='date'
                    placeholder='01/01/2023'
                    value={toD}
                    onChange={ev => setToD(ev.target.value)}
                    className='mb-2 rounded-3xl border bg-transparent p-2 px-4 text-white outline-0 focus:border-white focus:ring-0'
                />
                <IconButton
                    icon={<SearchIcon />}
                    onClick={() => applyFilters()}
                    className='mb-2 border border-gray-500 p-2'
                />
            </form>
            <div className='mb-5 text-gray-200'>
                {filtered.map(item => (
                    <div key={crypto.randomUUID()} className='my-2 flex'>
                        <p className='min-w-[15%] overflow-hidden text-ellipsis whitespace-nowrap'>
                            {(item.amount < 0 ? '-' : '') + '$' + Math.abs(item.amount).toFixed(2)}
                        </p>
                        <p className='ml-2 mr-5 flex-grow overflow-hidden text-ellipsis whitespace-nowrap'>
                            {item.description}
                        </p>
                        <p className='min-w-fit overflow-hidden text-ellipsis whitespace-nowrap text-right'>
                            {item.date}
                        </p>
                    </div>
                ))}
            </div>
            {filtered.length === 0 && (
                <p className='my-2 w-full text-center text-gray-300'>The above search yields no results</p>
            )}
            <div className='sticky bottom-0 flex w-full flex-row-reverse'>
                <Button onClick={() => outputCSV(filtered)}>Export to CSV</Button>
            </div>
        </Modal>
    )
}

function download(filename: string, text: string) {
    var element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}

const outputCSV = (transactions: TransactionT[]) => {
    const csv = transactions
        .reverse()
        .map(
            t =>
                t.date.split('-').reverse().join('/') +
                ',' +
                t.amount +
                ',' +
                t.description +
                ',0.0,' +
                t.category +
                ',' +
                t.type +
                ',' +
                t.item
        )
        .join('\n')
    download('Transactions.csv', 'DATE,AMOUNT,DESCRIPTION,BLANK,CATEGORY,TYPE,ITEM\n' + csv + '\n')
}

interface IncomeExpenseGraphProps {
    transactions: TransactionT[]
    rule?: string
    months?: number
}

export const IncomeExpenseGraph: React.FC<IncomeExpenseGraphProps> = ({ transactions, rule = '', months = 3 }) => (
    <Card className={'flex-grow gap-6 bg-gradient-to-br from-secondary-500 to-primary-900 ' + rule} background>
        {getPreviousData(transactions, months).map(month => (
            <div key={crypto.randomUUID()} className='flex h-full w-full cursor-default flex-col items-center gap-3'>
                <div className='flex w-full flex-grow items-end justify-center gap-2'>
                    <div className={`${month.incomeH} group flex w-20 justify-center rounded-md bg-white`}>
                        <div className='absolute z-50 h-fit scale-0 rounded-md bg-white p-2 py-0.5 text-back-500 duration-100 group-hover:-translate-y-9 group-hover:scale-100'>
                            {`$${month.income}`}
                        </div>
                        <div className='absolute z-40 h-5 w-5 rotate-45 scale-0 rounded-sm bg-white duration-100 group-hover:-translate-y-[26px] group-hover:scale-100' />
                    </div>
                    <div className={`${month.expenseH} group flex w-20 justify-center rounded-md bg-white`}>
                        <div className='absolute z-50 h-fit scale-0 rounded-md bg-white p-2 py-0.5 text-back-500 duration-100 group-hover:-translate-y-9 group-hover:scale-100'>
                            {`-$${month.expense}`}
                        </div>
                        <div className='absolute z-40 h-5 w-5 rotate-45 scale-0 rounded-sm bg-white duration-100 group-hover:-translate-y-[26px] group-hover:scale-100' />
                    </div>
                </div>
                <div className='group flex justify-center'>
                    <p className='px-2'>{month.month}</p>
                    <div className='absolute z-50 h-fit scale-0 rounded-md bg-white p-2 py-0.5 text-back-500 duration-100 group-hover:translate-y-8 group-hover:scale-100'>
                        {(parseFloat(month.income) - parseFloat(month.expense) < 0 ? '-' : '') +
                            `$${Math.abs(parseFloat(month.income) - parseFloat(month.expense))}`}
                    </div>
                    <div className='absolute z-40 h-5 w-5 rotate-45 scale-0 rounded-sm bg-white duration-100 group-hover:translate-y-[30px] group-hover:scale-100' />
                </div>
            </div>
        ))}
    </Card>
)

const incomeChange = (all: TransactionT[]): string => {
    const data = getPreviousData(all, 2)
    if (parseFloat(data[1].income) === 0 || parseFloat(data[0].income) === 0) return ''
    return `${(
        ((parseFloat(data[1].income) - parseFloat(data[0].income)) / parseFloat(data[0].income)) *
        100
    ).toFixed()}%`
}

const expenseChange = (all: TransactionT[]): string => {
    const data = getPreviousData(all, 2)
    if (parseFloat(data[1].expense) === 0 || parseFloat(data[0].expense) === 0) return ''
    return `${(
        ((parseFloat(data[1].expense) - parseFloat(data[0].expense)) / parseFloat(data[0].expense)) *
        100
    ).toFixed()}%`
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

type IncomeExpense = {
    month: string
    income: string
    expense: string
}

type PrevData = {
    month: string
    income: string
    expense: string
    incomeH: string
    expenseH: string
}

const getPreviousData = (transactions: TransactionT[], amount: number): PrevData[] => {
    let dates = []
    const current = new Date()
    for (let i = 1; i < amount + 1; i++) dates.push(new Date(current.getFullYear(), current.getMonth() - i, 1))
    dates.reverse()

    const income = (date: Date): number =>
        sum(
            transactionsInMonth(transactions, date, t => t.category === 'Income'),
            t => t.amount
        )
    const expense = (date: Date): number =>
        sum(
            transactionsInMonth(transactions, date, t => t.category !== 'Income'),
            t => t.amount
        )

    let incomeExpenses: IncomeExpense[] = dates.map(date => ({
        month: MONTHS[date.getMonth()],
        income: Math.abs(income(date)).toFixed(2),
        expense: Math.abs(expense(date)).toFixed(2),
    }))
    const max = incomeExpenses.reduce((m, ie) => Math.max(m, parseFloat(ie.income), parseFloat(ie.expense)), 0)

    return incomeExpenses.map(ie => ({
        ...ie,
        incomeH: height[((parseFloat(ie.income) / max) * 100).toFixed()],
        expenseH: height[((parseFloat(ie.expense) / max) * 100).toFixed()],
    }))
}

const transactionsInMonth = (
    transactions: TransactionT[],
    date: Date,
    filterTest: (_: TransactionT) => boolean = () => true
) => {
    const correctedMonth = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)
    const reg = new RegExp(`^${date.getFullYear()}-${correctedMonth}-`)
    return transactions.filter(t => reg.test(t.date) && filterTest(t))
}

function sum<T>(arr: T[], valueOf: (_: T) => number, start: number = 0) {
    return arr.reduce((total, a) => total + valueOf(a), start)
}
