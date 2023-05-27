import React from 'react'
import { BasePage } from '.'
import { Box, DisplayTablePage, Navigation } from '../components'
import { CTI, Router, TransactionT } from '../resources'

export const Expenses = () => {
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState<TransactionT[]>([])

    React.useEffect(() => {
        document.title = 'Finances | Expenses'
        setData([])
        setLoading(false)
    }, [])

    return (
        <BasePage navigation={<Navigation />}>
            <div className='flex h-full w-full flex-col gap-4 p-10'>
                <Box>
                    <h1 className='text-4xl'>{Router.expenses.text}</h1>
                </Box>
                <DisplayTablePage loading={loading} transactions={data} types={CTI.Expense} />
            </div>
        </BasePage>
    )
}
