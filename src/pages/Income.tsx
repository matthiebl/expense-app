import React from 'react'
import { BasePage } from '.'
import { Box, DisplayTablePage } from '../components'
import { CTI, Router, TransactionT } from '../resources'

interface IncomeProps {
    data: TransactionT[]
}

export const Income: React.FC<IncomeProps> = ({ data }) => {
    React.useEffect(() => {
        document.title = 'Finances | Income'
    }, [])

    return (
        <BasePage>
            <div className='flex h-full w-full flex-col gap-4 p-4 md:p-10'>
                <Box>
                    <h1 className='text-4xl'>{Router.income.text}</h1>
                </Box>
                <DisplayTablePage loading={false} transactions={data} types={CTI.Income} />
                <div className='min-h-[80px]' />
            </div>
        </BasePage>
    )
}
