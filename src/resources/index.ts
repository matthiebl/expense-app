import React from 'react'

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

export const CTI = JSON.stringify({
    income: {
        wages: {
            paycheck: true,
            scholarship: true,
            bonus: true,
            other: true,
        },
        future: {
            savings: true,
            interest: true,
            dividend: true,
        },
        other: {
            gifts: true,
            refund: true,
            other: true,
        },
    },
    expense: {
        tax: {
            income: true,
            capital: true,
            student: true,
            other: true,
        },
        education: {
            supplies: true,
        },
        entertainment: {
            books: true,
            games: true,
            streaming: true,
            concerts: true,
            dates: true,
            drinks: true,
            food: true,
        },
        everyday: {
            groceries: true,
            clothes: true,
            food: true,
            grooming: true,
        },
        gifts: {
            gifts: true,
            charity: true,
        },
        health: {
            medical: true,
            fitness: true,
        },
        home: {
            rent: true,
            furniture: true,
            maintenance: true,
            rates: true,
            other: true,
        },
        insurance: {
            car: true,
            health: true,
            life: true,
            home: true,
            contents: true,
        },
        pets: {
            food: true,
            vet: true,
            supplies: true,
            toys: true,
        },
        technology: {
            domains: true,
            services: true,
            hardware: true,
            software: true,
        },
        transport: {
            fuel: true,
            repairs: true,
            registration: true,
            public: true,
        },
        holiday: {
            travel: true,
            accomodation: true,
            food: true,
            entertainment: true,
        },
        utilities: {
            mobile: true,
            internet: true,
            electricity: true,
            water: true,
            gas: true,
            garbage: true,
        },
        other: {
            other: true,
        },
    },
    investment: {
        savings: {
            account: true,
            holiday: true,
            vehicle: true,
            other: true,
        },
        shares: {
            australian: true,
            international: true,
        },
        other: {
            other: true,
        },
    },
})
