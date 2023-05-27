import React from 'react'
import { BasePage } from '.'
import { Box, DisplayTablePage, Navigation } from '../components'
import { CTI, Router, TransactionT } from '../resources'

export const Investments = () => {
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState<TransactionT[]>([])

    React.useEffect(() => {
        document.title = 'Finances | Investments'
        setData([])
        setLoading(false)
    }, [])

    return (
        <BasePage navigation={<Navigation />}>
            <div className='flex h-full w-full flex-col gap-4 p-10'>
                <Box>
                    <h1 className='text-4xl'>{Router.invest.text}</h1>
                </Box>
                <DisplayTablePage loading={loading} transactions={data} types={CTI.Investment} flipTableSign />
            </div>
        </BasePage>
    )
}
