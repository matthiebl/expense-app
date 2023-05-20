import {
    DocumentData,
    DocumentReference,
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    where,
} from 'firebase/firestore'
import { database } from './firebase'
import { CTI } from '../resources'

export const getCategories = (uid: string | null | undefined, callback: (categories: string) => any) => {
    if (!uid) return
    callback(CTI)
}

export const getTransactions = (uid: string | null | undefined, callback: (transactions: DocumentData[]) => any) => {
    if (!uid) return

    let q = query(collection(database, 'transactions'), where('uid', '==', uid), orderBy('date', 'desc'))
    getDocs(q).then(data => {
        let transactions: DocumentData[] = []
        data?.forEach(doc => {
            let transaction = doc.data()
            transaction.id = doc.id
            transactions.push(transaction)
        })
        callback(transactions)
    })
}

export const addTransaction = (
    uid: string,
    title: string,
    description: string,
    date: string,
    amount: number,
    category: string,
    type: string,
    item: string,
    callback: (ref: DocumentReference<DocumentData>) => any
) => {
    addDoc(collection(database, 'transactions'), {
        uid,
        title,
        description,
        date,
        amount,
        category,
        type,
        item,
    })
        .then(ref => callback(ref))
        .catch(error => console.error(error))
}

export const deleteTransaction = (id: string, callback: () => any) => {
    deleteDoc(doc(database, 'transactions', id)).then(() => callback())
}
