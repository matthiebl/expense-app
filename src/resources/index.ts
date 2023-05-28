import React from 'react'

export * from './calculations'
export * from './routes'

export type TransactionT = {
    id: string
    title: string
    description: string
    amount: number
    date: string

    category: string
    type: string
    item: string
}

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (_: T) => void] {
    const [value, setValue] = React.useState(() => {
        try {
            const saved = localStorage.getItem(key)
            if (saved !== null) {
                return JSON.parse(saved)
            }
            return defaultValue
        } catch {
            return defaultValue
        }
    })

    React.useEffect(() => {
        const rawValue = JSON.stringify(value)
        localStorage.setItem(key, rawValue)
    }, [value])

    React.useEffect(() => {
        const saved = localStorage.getItem(key)
        if (saved !== null) {
            setValue(JSON.parse(saved))
        } else {
            setValue(defaultValue)
        }
    }, [key])

    return [value, setValue]
}

export type CategoryT = 'Income' | 'Expense' | 'Investment'
export type CTIT = Record<CategoryT, { [k: string]: { [k: string]: boolean } }>

export const CTI: CTIT = {
    Income: {
        Wages: {
            Paycheck: true,
            Scholarship: true,
            Bonus: true,
            Other: true,
        },
        Investment: {
            Savings: true,
            Interest: true,
            Dividend: true,
        },
        Other: {
            Gifts: true,
            Refund: true,
            Other: true,
        },
    },
    Expense: {
        Tax: {
            Income: true,
            Capital: true,
            Student: true,
            Other: true,
        },
        Education: {
            Supplies: true,
        },
        Entertainment: {
            Books: true,
            Games: true,
            Streaming: true,
            Concerts: true,
            Dates: true,
            Drinks: true,
            Food: true,
        },
        Everyday: {
            Groceries: true,
            Clothes: true,
            Food: true,
            Grooming: true,
        },
        Gifts: {
            Gifts: true,
            Charity: true,
        },
        Health: {
            Medical: true,
            Fitness: true,
        },
        Home: {
            Rent: true,
            Furniture: true,
            Maintenance: true,
            Rates: true,
            Other: true,
        },
        Insurance: {
            Car: true,
            Health: true,
            Life: true,
            Home: true,
            Contents: true,
        },
        Pets: {
            Food: true,
            Vet: true,
            Supplies: true,
            Toys: true,
        },
        Technology: {
            Domains: true,
            Services: true,
            Hardware: true,
            Software: true,
        },
        Transport: {
            Fuel: true,
            Repairs: true,
            Registration: true,
            Public: true,
        },
        Holiday: {
            Travel: true,
            Accomodation: true,
            Food: true,
            Entertainment: true,
        },
        Utilities: {
            Mobile: true,
            Internet: true,
            Electricity: true,
            Water: true,
            Gas: true,
            Garbage: true,
        },
        Other: {
            Other: true,
        },
    },
    Investment: {
        Savings: {
            account: true,
            Holiday: true,
            Vehicle: true,
            Other: true,
        },
        Shares: {
            Australian: true,
            International: true,
        },
        Other: {
            Other: true,
        },
    },
}
