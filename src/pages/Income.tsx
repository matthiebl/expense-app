import React from 'react'
import { BasePage } from '.'
import { Box, Navigation } from '../components'
import { Router } from '../resources'

export const Income = () => {
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState(null)

    React.useEffect(() => {
        const onLoad = async () => {
            const data = await get()
            setData(data.income)
            setLoading(false)
        }
        onLoad()
    }, [])

    return (
        <BasePage navigation={<Navigation />}>
            <div className='flex h-full w-full flex-col gap-4 p-10'>
                <Box>
                    <h1 className='text-4xl'>{Router.income.text}</h1>
                </Box>
                <DisplayTable data={data} loading={loading} />
            </div>
        </BasePage>
    )
}
