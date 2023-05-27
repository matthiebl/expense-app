import { TransactionT } from '.'
import { OptionItem } from '../components'

export type ViewT = 'Weekly' | 'Monthly' | 'Quarterly'

export const VIEWS: ViewT[] = ['Weekly', 'Monthly', 'Quarterly']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const currentYear = new Date().getFullYear()
const YEARS = Array.from(Array(currentYear - 2017).keys()).map(n => n + 2018)

export const yearsItems = (): OptionItem[] => {
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

export const monthsItems = (): OptionItem[] => {
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

export const periodHeaders: Record<ViewT, string[]> = {
    Weekly: ['W1', 'W2', 'W3', 'W4', 'Total'],
    Quarterly: ['Q1', 'Q2', 'Q3', 'Q4', 'Total'],
    Monthly: [...MONTHS, 'Total'],
}
const viewCols = { Weekly: 4, Quarterly: 4, Monthly: 12 }

export const formatRow = (view: ViewT, s: { y: string; m: string }, transactions: TransactionT[]) => {
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

export const formatRows = (
    view: ViewT,
    start: { y: string; m: string },
    transactions: TransactionT[],
    type: string,
    items: { [k: string]: boolean }
) => Object.keys(items).map(item => formatRow(view, start, filterTransactions(transactions, type, item)))

const filterTransactions = (transactions: TransactionT[], type: string, item: string) =>
    transactions.filter(transaction => transaction.type === type && transaction.item === item)
