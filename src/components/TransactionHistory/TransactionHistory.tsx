import { useState } from 'react'
import { Transaction, User } from '../../types/types'
import styles from './TransactionHistory.module.scss'

type TransactionHistoryType = {
    transactions: Transaction[]
    selectedUser: User | null
}

type SortOrderType = 'asc' | 'desc'
type TransactionType = 'incoming' | 'outgoing'

export const TransactionHistory: React.FC<TransactionHistoryType> = ({ transactions, selectedUser }) => {
    const [incomingSortOrder, setIncomingSortOrder] = useState<SortOrderType>('asc')
    const [outgoingSortOrder, setOutgoingSortOrder] = useState<SortOrderType>('asc')

    const toggleSortOrder = (type: TransactionType) => {
        switch (type) {
            case 'incoming':
                setIncomingSortOrder(incomingSortOrder === 'asc' ? 'desc' : 'asc')
                break
            case 'outgoing':
                setOutgoingSortOrder(outgoingSortOrder === 'asc' ? 'desc' : 'asc')
                break
            default:
                break
        }
    }

    const filterTransactions = () => {
        if (!selectedUser) return []

        return transactions.filter(
            (transaction) => transaction.sourceId === selectedUser.id || transaction.targetId === selectedUser.id
        )
    }

    const userTransactions = filterTransactions()
    const incomingTransactions = userTransactions.filter((transaction) => transaction.targetId === selectedUser?.id)
    const outgoingTransactions = userTransactions.filter((transaction) => transaction.sourceId === selectedUser?.id)

    const sortTransactions = (transactions: Transaction[], sortOrder: SortOrderType) => {
        const sortedTransactions = [...transactions]
        return sortedTransactions.sort((a, b) => (sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount))
    }

    const sortedIncomingTransactions = sortTransactions(incomingTransactions, incomingSortOrder)
    const sortedOutgoingTransactions = sortTransactions(outgoingTransactions, outgoingSortOrder)

    return (
        <div>
            <h2>Account Overview</h2>
            <table className={styles.table}>
                <caption>{selectedUser?.name}</caption>
                <thead>
                    <tr>
                        <th>Incoming Transactions</th>
                        <th>Outgoing Transactions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Source ID</th>
                                        <th
                                            onClick={() => toggleSortOrder('incoming')}
                                            className={`${styles.sortableHeader} ${styles.sortIcon}`}
                                        >
                                            Amount {incomingSortOrder === 'asc' ? '▲' : '▼'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedIncomingTransactions.map((transaction, index) => (
                                        <tr key={index}>
                                            <td>{transaction.sourceId}</td>
                                            <td>{transaction.amount.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Target ID</th>
                                        <th
                                            onClick={() => toggleSortOrder('outgoing')}
                                            className={`${styles.sortableHeader} ${styles.sortIcon}`}
                                        >
                                            Amount {outgoingSortOrder === 'asc' ? '▲' : '▼'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedOutgoingTransactions.map((transaction, index) => (
                                        <tr key={index}>
                                            <td>{transaction.targetId}</td>
                                            <td>{transaction.amount.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
