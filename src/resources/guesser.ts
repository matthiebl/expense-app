export const guessCTI = (description: string, amount: number) => {
    const words = description.split(' ')
    if (words[0] === 'Transfer' && amount < 0) {
        if (words[words.length - 1].toLowerCase() === 'holiday')
            return { category: 'future', type: 'savings', item: 'holiday' }
        if (words[words.length - 1] === 'account') return { category: 'future', type: 'savings', item: 'account' }
        return { category: 'future', type: 'savings', item: '' }
    }

    if (words.includes('Salary')) return { category: 'income', type: 'wages', item: 'paycheck' }

    if (description.includes('Anytime Fitness')) return { category: 'expense', type: 'health', item: 'fitness' }

    if (description.toLowerCase().includes('mcdonalds') || description.includes('KFC'))
        return { category: 'expense', type: 'entertainment', item: 'food' }

    if (description.includes('SUSHI')) return { category: 'expense', type: 'everyday', item: 'food' }

    if (
        description.includes('WOOLWORTHS') ||
        description.includes('COLES') ||
        description.includes('ALDI') ||
        description.includes('BAKERS DELIGHT')
    )
        return { category: 'expense', type: 'everyday', item: 'groceries' }

    if (description.includes('More Telecom')) return { category: 'expense', type: 'utilities', item: 'mobile' }

    if (description.includes('DOMAINS')) return { category: 'expense', type: 'technology', item: 'domains' }

    if (description.includes('APPLE.COM/BILL')) return { category: 'expense', type: 'technology', item: 'services' }

    if (amount < 0) return { category: 'expense', type: '', item: '' }
    else return { category: 'income', type: '', item: '' }
}
