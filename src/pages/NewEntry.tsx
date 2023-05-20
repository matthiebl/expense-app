import React from 'react'

import { auth } from '../api/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { addTransaction, deleteTransaction, getCategories } from '../api'

import { Router, TransactionT } from '../resources'
import { guessCTI } from '../resources/guesser'

import { BasePage } from '.'
import { Box, Button, Card, Navigation, Select } from '../components'

export const NewEntry = ({}) => {
    const [loading, setLoading] = React.useState(true)
    const [categories, setCategories] = React.useState<string>('')

    const [state, setState] = React.useState('single')
    const [autoFill, setAutoFill] = React.useState<string[][]>([])
    const [previous, setPrevious] = React.useState<TransactionT[]>([])
    const [removed, setRemoved] = React.useState<string[]>([])

    const [fields, setFields] = React.useState(EMPTY_FIELDS)

    React.useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                getCategories(auth.currentUser?.uid, cti => {
                    setCategories(cti)
                    setLoading(false)
                })
            }
        })
    }, [])

    React.useEffect(() => {
        if (autoFill.length < 1) return
        const guess = guessCTI(autoFill[0][2], parseFloat(autoFill[0][1]))
        setFields({
            ...fields,
            desc: autoFill[0][2],
            amount: autoFill[0][1],
            date: autoFill[0][0].split('/').reverse().join('-'),
            ...guess,
        })
    }, [autoFill])

    const handleUpload = async (fileL: FileList | null) => {
        if (fileL === null || fileL.length === 0) return
        const csv = await readFile(fileL[0])
        if (csv instanceof ArrayBuffer) return
        const entries = formatCSV(csv)
        setAutoFill(entries)
        setState('single')
    }

    const handleAdd = async () => {
        if (
            fields.desc === '' ||
            fields.category === '' ||
            fields.type === '' ||
            fields.item === '' ||
            fields.amount === '' ||
            !fields.date
        )
            return
        try {
            const value = parseFloat(fields.amount)
            addTransaction(
                '1',
                fields.title || 'Untitled',
                fields.desc,
                fields.date,
                value,
                fields.category,
                fields.type,
                fields.item,
                transaction => console.log(transaction)
            )
            // setPrevious([response, ...previous])
            setFields(EMPTY_FIELDS)
            if (autoFill.length === 0) return
            setAutoFill([...autoFill.slice(1)])
        } catch (err) {
            return
        }
    }

    return (
        <BasePage navigation={<Navigation />}>
            <div className='flex h-full w-full flex-col gap-4 p-10'>
                <Box className='flex justify-between'>
                    <span className='flex items-end gap-2'>
                        <h1 className='text-4xl'>{Router.add.text}</h1>
                        {autoFill.length > 1 && <p className='mb-0.5 text-gray-400'>({autoFill.length - 1})</p>}
                    </span>
                    <Button
                        text={state === 'single' ? 'Batch Upload' : 'Cancel'}
                        onClick={() => {
                            state === 'single' ? setState('multi') : setState('single')
                        }}
                        colour='bg-gradient-to-br from-alt-500 to-alt-900'
                    />
                </Box>

                {state === 'single' && (
                    <Card className='flex flex-col gap-4'>
                        <input
                            type='text'
                            placeholder='Title'
                            value={fields.title}
                            onChange={ev => setFields({ ...fields, title: ev.target.value })}
                            className='rounded-2xl border border-transparent bg-transparent p-2 px-3 text-lg outline-0 focus:border-white'
                        />
                        <input
                            type='text'
                            placeholder='Short description'
                            value={fields.desc}
                            onChange={ev => setFields({ ...fields, desc: ev.target.value })}
                            className='rounded-2xl border border-transparent bg-transparent p-2 px-3 outline-0 invalid:border-alt-500 focus:border-white'
                            required
                        />

                        <div className='flex gap-8 border border-transparent p-2 px-3'>
                            <Select
                                label='Category:'
                                placeholder='Select a category'
                                selected={{ value: fields.category, label: '' }}
                                items={loading ? [] : determineSelectItems(categories)}
                                onChange={ev => {
                                    setFields({
                                        ...fields,
                                        category: ev.target.value,
                                        type: '',
                                        item: '',
                                    })
                                }}
                                className='w-48 rounded-2xl border border-transparent px-1 invalid:border-alt-500 focus:border-white'
                            />

                            <Select
                                label='Type:'
                                placeholder='Select a type'
                                selected={{ value: fields.type, label: '' }}
                                items={fields.category === '' ? [] : determineSelectItems(categories, fields.category)}
                                onChange={ev => {
                                    setFields({
                                        ...fields,
                                        type: ev.target.value,
                                        item: '',
                                    })
                                }}
                                className='w-48 rounded-2xl border border-transparent px-1 invalid:border-alt-500 focus:border-white'
                            />

                            <Select
                                label='Item:'
                                placeholder='Select an item'
                                selected={{ value: fields.item, label: '' }}
                                items={
                                    fields.type === ''
                                        ? []
                                        : determineSelectItems(categories, fields.category, fields.type)
                                }
                                onChange={ev => setFields({ ...fields, item: ev.target.value })}
                                className='w-48 rounded-2xl border border-transparent px-1 invalid:border-alt-500 focus:border-white'
                            />
                        </div>

                        <div className='flex gap-8'>
                            <input
                                type='text'
                                placeholder='$ 0'
                                value={'$ ' + fields.amount}
                                onChange={ev => {
                                    if (/^\$ -?\d*[.]?\d{0,2}$/.test(ev.target.value))
                                        setFields({ ...fields, amount: ev.target.value.slice(2) })
                                }}
                                className='rounded-2xl border border-transparent bg-transparent p-2 px-3 text-lg outline-0 before:block before:content-["$"] focus:border-white'
                            />

                            <input
                                type='date'
                                placeholder='01/01/2023'
                                value={fields.date}
                                onChange={ev => setFields({ ...fields, date: ev.target.value })}
                                className='rounded-2xl border border-transparent bg-transparent p-2 px-3 text-lg text-white outline-0 focus:border-white'
                            />
                        </div>

                        <div className='flex justify-end gap-5'>
                            {autoFill.length > 1 && (
                                <Button
                                    text='Skip'
                                    className='w-48'
                                    colour='border-white'
                                    onClick={() => setAutoFill([...autoFill.slice(1)])}
                                    variant='outlined'
                                />
                            )}

                            {autoFill.length <= 1 && (
                                <Button
                                    text='Clear'
                                    className='w-48'
                                    colour='border-white'
                                    onClick={() => setFields(EMPTY_FIELDS)}
                                    variant='outlined'
                                />
                            )}

                            <Button
                                text={autoFill.length > 1 ? 'Next' : 'Add'}
                                className='w-48'
                                onClick={handleAdd}
                                disabled={
                                    fields.desc === '' ||
                                    fields.category === '' ||
                                    fields.type === '' ||
                                    fields.item === '' ||
                                    fields.amount === '' ||
                                    fields.date === ''
                                }
                            />
                        </div>
                    </Card>
                )}

                {state === 'single' && previous.length > 0 && (
                    <Box className='flex items-end gap-2'>
                        <h1 className='text-2xl'>Recent Additions</h1>
                        <p className='mb-0.5 text-gray-400'>({previous.length - removed.length})</p>
                    </Box>
                )}

                {state === 'single' &&
                    previous.map(prev => (
                        <Card
                            key={prev.id}
                            className={
                                'left-0 flex items-center gap-2 py-3' +
                                (removed.includes(prev.id) ? ' text-gray-500' : '')
                            }
                        >
                            <p className='w-1/6'>{'$' + prev.amount}</p>
                            <p className='w-8/12 overflow-hidden text-ellipsis whitespace-nowrap'>{prev.description}</p>
                            <div className='flex w-1/6 justify-end gap-2 text-right'>
                                {prev.date}
                                <button
                                    onClick={() => {
                                        deleteTransaction(prev.id, () => {
                                            setRemoved([...removed, prev.id])
                                        })
                                    }}
                                    disabled={removed.includes(prev.id)}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='currentColor'
                                        className={'h-6 w-6' + (removed.includes(prev.id) ? ' text-transparent' : '')}
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                </button>
                            </div>
                        </Card>
                    ))}

                {state === 'multi' && (
                    <>
                        <label
                            htmlFor='upload'
                            className='flex flex-grow flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed'
                        >
                            <p className='text-6xl'>+</p>
                            <p className='text-4xl'>Upload a Batch CSV</p>
                        </label>
                        <input
                            type='file'
                            accept='.csv'
                            id='upload'
                            className='hidden'
                            onChange={ev => handleUpload(ev.target.files)}
                        />
                    </>
                )}
            </div>
        </BasePage>
    )
}

const EMPTY_FIELDS = {
    title: '',
    desc: '',
    category: '',
    type: '',
    item: '',
    amount: '0',
    date: '',
}

const determineSelectItems = (json: string, key1: string = '', key2: string = '') => {
    let obj = JSON.parse(json)
    if (key1 !== '') obj = obj[key1]
    if (key2 !== '') obj = obj[key2]
    return Object.keys(obj).map(key => ({
        value: key,
        label: key,
    }))
}

const readFile = async (file: File): Promise<string | ArrayBuffer> => {
    const reader = new FileReader()
    try {
        const text: string | ArrayBuffer = await new Promise((resolve, reject) => {
            reader.onerror = reject
            reader.onload = () => resolve(reader.result || '')
            reader.readAsText(file)
        })
        return text
    } catch (err) {
        console.log('Bad file input')
        return ''
    }
}

const formatCSV = (csvtext: string) => {
    const lines = csvtext.split('\n')
    return lines
        .map(line => line.replaceAll('"', '').split(','))
        .reverse()
        .slice(1)
}
