import React from 'react'
import { BasePage } from '.'
import { Box, Button, Card, Modal, Navigation, Select, Table } from '../components'
import {
    CTI,
    CategoryT,
    Router,
    TransactionT,
    VIEWS,
    ViewT,
    formatRow,
    monthsItems,
    periodHeaders,
    useLocalStorage,
    yearsItems,
} from '../resources'

export const Summary = () => {
    const [loading, setLoading] = React.useState(true)
    const [transactions, setTransactions] = React.useState<TransactionT[]>([])

    const [view, setView] = useLocalStorage<ViewT>('view', 'Monthly')
    const [date, setDate] = useLocalStorage('date', yearsItems().at(-1) || { label: '<error>', value: '<error>' })

    const [selected, setSelected] = React.useState<TransactionT[]>([])
    const [modalOpen, setModalOpen] = React.useState(false)

    React.useEffect(() => {
        document.title = 'Finances | Summary'
        setTransactions([])
        setLoading(false)
    }, [])

    return (
        <BasePage navigation={<Navigation />}>
            <div className='flex h-full w-full flex-col gap-4 p-10'>
                <Box>
                    <h1 className='text-4xl'>{Router.summary.text}</h1>
                </Box>

                <Modal
                    title={<h3 className='mb-2 text-2xl'>Transactions</h3>}
                    isOpen={modalOpen}
                    setIsOpen={setModalOpen}
                >
                    {selected.map(item => (
                        <div key={crypto.randomUUID()} className='my-2 flex'>
                            <p className='w-1/6'>{'$' + item.amount.toFixed(2)}</p>
                            <p className='w-8/12 overflow-hidden text-ellipsis whitespace-nowrap'>{item.description}</p>
                            <p className='w-1/6 overflow-hidden text-ellipsis whitespace-nowrap text-right'>
                                {item.date}
                            </p>
                        </div>
                    ))}
                </Modal>

                <div className='flex items-center justify-evenly gap-4'>
                    {VIEWS.map((v, index) => (
                        <Button
                            key={index}
                            text={v}
                            variant='text'
                            onClick={() => setView(v)}
                            className={view === v ? 'underline' : ''}
                        />
                    ))}

                    <Select
                        label='Period:'
                        selected={date}
                        items={view === 'Weekly' ? monthsItems() : yearsItems()}
                        onChange={ev => {
                            setDate({
                                label: ev.target[ev.target.selectedIndex].innerText,
                                value: ev.target.value,
                            })
                        }}
                        className='w-32 rounded-2xl border border-transparent pl-3 focus:border-white'
                    />
                </div>

                <div className='flex flex-col gap-10'>
                    {!loading && (
                        <>
                            <Card>
                                <Table
                                    title='Account'
                                    headers={
                                        view === 'Monthly' && date.label.includes('FY')
                                            ? [
                                                  ...periodHeaders[view].slice(6, 12),
                                                  ...periodHeaders[view].slice(0, 6),
                                                  'Total',
                                              ]
                                            : periodHeaders[view]
                                    }
                                    rowHeaders={[...CATEGORIES, 'Change']}
                                    rows={accountRows(view, JSON.parse(date.value), transactions)}
                                    tooltips
                                    onClickToolTip={(_, values) => {
                                        setSelected(values)
                                        setModalOpen(true)
                                    }}
                                />
                            </Card>

                            {CATEGORIES.map(category => (
                                <Card key={category}>
                                    <Table
                                        title={category}
                                        headers={
                                            view === 'Monthly' && date.label.includes('FY')
                                                ? [
                                                      ...periodHeaders[view].slice(6, 12),
                                                      ...periodHeaders[view].slice(0, 6),
                                                      'Total',
                                                  ]
                                                : periodHeaders[view]
                                        }
                                        rowHeaders={Object.keys(CTI[category])}
                                        rows={formatCategoryRows(
                                            view,
                                            JSON.parse(date.value),
                                            transactions,
                                            category,
                                            Object.keys(CTI[category])
                                        )}
                                        tooltips
                                        onClickToolTip={(_, values) => {
                                            setSelected(values)
                                            setModalOpen(true)
                                        }}
                                        flipSign={category === 'Investment'}
                                    />
                                </Card>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </BasePage>
    )
}

const CATEGORIES: CategoryT[] = ['Income', 'Expense', 'Investment']

const accountRows = (view: ViewT, start: { y: string; m: string }, transactions: TransactionT[]) => {
    let table = CATEGORIES.map(category => {
        const subtable = formatCategoryRows(view, start, transactions, category, Object.keys(CTI[category]))
        let squashed: TransactionT[][] = subtable[0].map(_ => [])
        for (const row of subtable) for (let col = 0; col < row.length; col++) squashed[col].push(...row[col])
        return squashed
    })
    let change: TransactionT[][] = table[0].map(_ => [])
    for (const row of table) for (let col = 0; col < row.length; col++) change[col].push(...row[col])
    table.push(change)
    return table
}

const formatCategoryRows = (
    view: ViewT,
    start: { y: string; m: string },
    transactions: TransactionT[],
    category: string,
    types: string[]
) => types.map(type => formatRow(view, start, filterT(transactions, category, type)))

const filterT = (transactions: TransactionT[], category: string, type: string) =>
    transactions.filter(transaction => transaction.category === category && transaction.type === type)
