import React from 'react'
import { Button, Card, Modal, Select, Table } from '.'
import {
    TransactionT,
    VIEWS,
    ViewT,
    formatRows,
    monthsItems,
    periodHeaders,
    useLocalStorage,
    yearsItems,
} from '../resources'

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

            <div className='flex w-full flex-wrap items-center justify-center gap-3 md:justify-evenly'>
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

            <div className='flex flex-col gap-4 md:gap-10'>
                {!loading &&
                    Object.keys(types).map(type => (
                        <Card key={type}>
                            <Table
                                title={type}
                                headers={
                                    view === 'Monthly' && date.label.includes('FY')
                                        ? [
                                              ...periodHeaders[view].slice(6, 12),
                                              ...periodHeaders[view].slice(0, 6),
                                              'Total',
                                          ]
                                        : periodHeaders[view]
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
