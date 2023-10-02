import { useState } from 'react'
import { Transaction } from '../types/types'

export const useSearch = (transactions: Transaction[]) => {
    const [search, setSearch] = useState<string>('')

    const handleSearch = (query: string) => {
        setSearch(query.toLowerCase())
    }

    const filteredTransactions = transactions.filter((transaction) => {
        const searchRegex = new RegExp(`^${search}`, 'i')
        return searchRegex.test(transaction.sourceId) || searchRegex.test(transaction.targetId)
    })

    return { search, handleSearch, filteredTransactions }
}
