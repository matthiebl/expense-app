import React from 'react'
import { Button, Card, Modal, OptionItem, Select, Table } from '.'
import { TransactionT, useLocalStorage } from '../resources'

type ViewT = 'Weekly' | 'Monthly' | 'Quarterly'

interface DisplayTablePageProps {
    loading: boolean
    transactions: TransactionT[]
    types: { [k: string]: { [k: string]: boolean } }
    flipTableSign?: boolean
}

export const DisplayTablePage: React.FC<DisplayTablePageProps> = ({
    loading,
    transactions,
    types,
    flipTableSign = false,
}) => {
    const [view, setView] = useLocalStorage<ViewT>('view', 'Monthly')
    const [date, setDate] = useLocalStorage('date', yearsItems().at(-1) || { label: '<error>', value: '<error>' })

    const [selected, setSelected] = React.useState<TransactionT[]>([])
    const [modalOpen, setModalOpen] = React.useState(false)

    return (
        <>
            <Modal title={<h3 className='mb-2 text-2xl'>Transactions</h3>} isOpen={modalOpen} setIsOpen={setModalOpen}>
                {selected.map(item => (
                    <div key={crypto.randomUUID()} className='my-2 flex'>
                        <p className='w-1/6'>{'$' + item.amount.toFixed(2)}</p>
                        <p className='w-8/12 overflow-hidden text-ellipsis whitespace-nowrap'>{item.description}</p>
                        <p className='w-1/6 overflow-hidden text-ellipsis whitespace-nowrap text-right'>{item.date}</p>
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
                    className='w-32 rounded-2xl border border-transparent px-1 focus:border-white'
                />
            </div>

            <div className='flex flex-col gap-10'>
                {!loading &&
                    Object.keys(types).map(type => (
                        <Card key={type}>
                            <Table
                                title={type}
                                headers={
                                    view === 'Monthly' && date.label.includes('FY')
                                        ? [...headers[view].slice(6, 12), ...headers[view].slice(0, 6), 'Total']
                                        : headers[view]
                                }
                                rowHeaders={Object.keys(types[type])}
                                rows={formatRows(view, JSON.parse(date.value), transactions, type, types[type])}
                                tooltips
                                onClickToolTip={(_, values) => {
                                    setSelected(values)
                                    setModalOpen(true)
                                }}
                                flipSign={flipTableSign}
                            />
                        </Card>
                    ))}
            </div>
        </>
    )
}

const VIEWS: ViewT[] = ['Weekly', 'Monthly', 'Quarterly']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const currentYear = new Date().getFullYear()
const YEARS = Array.from(Array(currentYear - 2017).keys()).map(n => n + 2018)

const yearsItems = (): OptionItem[] => {
    let items: OptionItem[] = []
    YEARS.forEach(year => {
        items.push({
            label: `FY ${year}`,
            value: JSON.stringify({ m: 6, y: year - 1 }),
        })
        items.push({
            label: `${year}`,
            value: JSON.stringify({ m: 0, y: year }),
        })
    })
    return items
}

const monthsItems = (): OptionItem[] => {
    let items: OptionItem[] = []
    YEARS.forEach(year => {
        MONTHS.forEach((month, idx) => {
            items.push({
                label: `${month} ${year}`,
                value: JSON.stringify({ m: idx, y: year }),
            })
        })
    })
    return items
}

const headers: Record<ViewT, string[]> = {
    Weekly: ['W1', 'W2', 'W3', 'W4', 'Total'],
    Quarterly: ['Q1', 'Q2', 'Q3', 'Q4', 'Total'],
    Monthly: [...MONTHS, 'Total'],
}
const viewCols = { Weekly: 4, Quarterly: 4, Monthly: 12 }

const formatRow = (view: ViewT, s: { y: string; m: string }, transactions: TransactionT[]) => {
    const year = parseInt(s.y)
    const month = parseInt(s.m)
    let start = new Date(year, month)
    let end: Date
    let cols = []
    for (let i = 0; i < viewCols[view]; i++) {
        end = new Date(year, month, 8 + 7 * i)
        if (view === 'Weekly' && i == 3) end = new Date(year, month + 1)
        if (view === 'Monthly') end = new Date(year, month + i + 1)
        if (view === 'Quarterly') end = new Date(year, month + 3 + i * 3)
        cols.push(
            transactions.filter(t => {
                const date = new Date(`${t.date}T12:00`)
                return start <= date && date < end
            })
        )
        start = end
    }
    cols.push(
        transactions.filter(t => {
            const date = new Date(`${t.date}T12:00`)
            return new Date(year, month) <= date && date < end
        })
    )
    return cols
}

const formatRows = (
    view: ViewT,
    start: { y: string; m: string },
    transactions: TransactionT[],
    type: string,
    items: { [k: string]: boolean }
) => Object.keys(items).map(item => formatRow(view, start, filterTransactions(transactions, type, item)))

const filterTransactions = (transactions: TransactionT[], type: string, item: string) =>
    transactions.filter(transaction => transaction.type === type && transaction.item === item)
