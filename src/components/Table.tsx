import React from 'react'
import { TransactionT } from '../resources'

interface TableProps {
    title: string
    headers: string[]
    rowHeaders: string[]
    rows: TransactionT[][][]
    flipSign?: boolean
    tooltips?: boolean
    onClickToolTip?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>, ts: TransactionT[]) => void
}

export const Table: React.FC<TableProps> = ({
    title,
    headers,
    rowHeaders,
    rows,
    flipSign,
    tooltips,
    onClickToolTip = () => {},
}) => {
    if (rowHeaders.length !== rows.length) console.warn('Incorrect number of headers for provided rows')

    return (
        <div className='flex flex-col overflow-x-auto py-4'>
            {/* Title */}
            <h2 className='static text-2xl'>{title}</h2>

            {/* Header row */}
            <div className='flex items-end'>
                <div className='w-1/12 min-w-[100px]' />
                {headers.map(col => (
                    <p key={crypto.randomUUID()} className='min-w-[80px] flex-1 text-right'>
                        {col}
                    </p>
                ))}
            </div>

            {/* Rows */}
            {rows.map((row, idx) => (
                <div key={crypto.randomUUID()} className='flex items-end'>
                    <p className='w-1/12 min-w-[100px]'>{rowHeaders[idx]}</p>
                    {row.map(col => {
                        const sum = col.reduce((total, t) => total + t.amount, 0)
                        const val = flipSign ? sum * -1 : sum
                        return (
                            <div
                                key={crypto.randomUUID()}
                                className='group flex min-w-[80px] flex-1 cursor-default justify-end text-sm'
                            >
                                <p
                                    className={
                                        'text-right italic ' +
                                        (val === 0 ? 'text-gray-500' : '') +
                                        (val < 0 ? 'text-alt-500' : '')
                                    }
                                >
                                    {val < 0 ? `($${(val * -1).toFixed(2)})` : `$${val.toFixed(2)}`}
                                </p>
                                {col.length > 0 && tooltips && (
                                    <button
                                        onClick={ev => onClickToolTip(ev, col)}
                                        className='fixed translate-x-6 translate-y-5 scale-0 rounded-2xl bg-back-600 p-1 px-2 shadow-2xl drop-shadow-2xl duration-100 group-hover:scale-100'
                                    >
                                        {`${col.length} transactions`}
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
