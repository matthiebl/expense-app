import { CTI, CTIT, CategoryT } from '.'

type Fields = {
    date: string
    amount: number
    description: string
    cti: { category: CategoryT; type: string; item: string } | null
}

export const parseArrayToFields = (arr: string[], CTI: CTIT): Fields | null => {
    try {
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(arr[0])) {
            return null
        }
        const date = arr[0].split('/').reverse().join('-')
        const amount = parseFloat(arr[1])
        if (Number.isNaN(amount)) {
            return null
        }
        const description = arr[2] || ''
        const cti = parseCategoryTypeItem(arr[4], arr[5], arr[6], CTI)
        return { date, amount, description, cti }
    } catch {
        return null
    }
}

export const parseCategory = (category: string): CategoryT | null => {
    if (category === 'Income') return 'Income'
    if (category === 'Expense') return 'Expense'
    if (category === 'Investment') return 'Investment'
    return null
}

export const parseCategoryType = (
    categoryString: string,
    type: string,
    cti: CTIT
): { category: CategoryT; type: string } | null => {
    const category = parseCategory(categoryString)
    if (category === null) {
        return null
    }

    if (type in cti[category]) return { category, type }
    return { category, type: '' }
}

export const parseCategoryTypeItem = (
    categoryString: string,
    typeString: string,
    item: string,
    cti: CTIT
): { category: CategoryT; type: string; item: string } | null => {
    const ct = parseCategoryType(categoryString, typeString, cti)
    if (ct === null) {
        return null
    }
    const { category, type } = ct
    if (type === '') {
        return { category, type: '', item: '' }
    }

    if (item in cti[category][type]) {
        return { category, type, item }
    }
    return { category, type, item: '' }
}
