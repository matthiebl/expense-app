import React from 'react'
import { BasePage } from '.'
import { Box, DisplayTablePage } from '../components'
import { CTI, Router, TransactionT } from '../resources'

interface InvestmentsProps {
    data: TransactionT[]
}

export const Investments: React.FC<InvestmentsProps> = ({ data }) => {
    React.useEffect(() => {
        document.title = 'Finances | Investments'
    }, [])

    return (
        <BasePage>
            <div className='flex h-full w-full flex-col gap-4 p-4 md:p-10'>
                <Box>
                    <h1 className='text-4xl'>{Router.invest.text}</h1>
                </Box>
                <DisplayTablePage loading={false} transactions={data} types={CTI.Investment} flipTableSign />
                <div className='min-h-[80px]' />
            </div>
        </BasePage>
    )
}
