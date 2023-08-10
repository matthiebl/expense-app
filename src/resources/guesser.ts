import { CategoryT } from '.'

export const guessCTI = (description: string, amount: number): { category: CategoryT; type: string; item: string } => {
    const words = description.split(' ')
    if (words[0] === 'Transfer' && amount < 0) {
        if (words[words.length - 1].toLowerCase() === 'Holiday')
            return { category: 'Investment', type: 'Savings', item: 'Holiday' }
        if (words[words.length - 1] === 'account') return { category: 'Investment', type: 'Savings', item: 'Account' }
        return { category: 'Investment', type: 'Savings', item: '' }
    }

    if (words.includes('Salary')) return { category: 'Income', type: 'Wages', item: 'Paycheck' }

    if (description.includes('Anytime Fitness')) return { category: 'Expense', type: 'Health', item: 'Fitness' }

    if (description.toLowerCase().includes('mcdonalds') || description.includes('KFC'))
        return { category: 'Expense', type: 'Entertainment', item: 'Food' }

    if (description.includes('SUSHI')) return { category: 'Expense', type: 'Everyday', item: 'Food' }

    if (
        description.includes('WOOLWORTHS') ||
        description.includes('COLES') ||
        description.includes('ALDI') ||
        description.includes('BAKERS DELIGHT')
    )
        return { category: 'Expense', type: 'Everyday', item: 'Groceries' }

    if (description.includes('More Telecom')) return { category: 'Expense', type: 'Utilities', item: 'Mobile' }

    if (description.includes('DOMAINS')) return { category: 'Expense', type: 'Technology', item: 'Domains' }

    if (description.includes('APPLE.COM/BILL')) return { category: 'Expense', type: 'Technology', item: 'Services' }

    if (amount < 0) return { category: 'Expense', type: '', item: '' }
    else return { category: 'Income', type: '', item: '' }
}
