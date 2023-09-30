import { useState } from 'react'
import { Transaction, User } from '../../types/types'
import styles from './TransactionHistory.module.scss'

type TransactionHistoryType = {
    transactions: Transaction[]
    selectedUser: User | null
}

type SortOrderType = 'asc' | 'desc'

export const TransactionHistory: React.FC<TransactionHistoryType> = ({ transactions, selectedUser }) => {
    const [incomingSortOrder, setIncomingSortOrder] = useState<SortOrderType>('asc')
    const [outgoingSortOrder, setOutgoingSortOrder] = useState<SortOrderType>('asc')

    const toggleIncomingSort = () => {
        setIncomingSortOrder(incomingSortOrder === 'asc' ? 'desc' : 'asc')
    }

    const toggleOutgoingSort = () => {
        setOutgoingSortOrder(outgoingSortOrder === 'asc' ? 'desc' : 'asc')
    }

    const incomingTransactions = selectedUser
        ? transactions.filter((transaction) => transaction.targetId === selectedUser.id)
        : []

    const outgoingTransactions = selectedUser
        ? transactions.filter((transaction) => transaction.sourceId === selectedUser.id)
        : []

    const calculateUserBalance = () => {
        const incomingTotal = incomingTransactions.reduce((total, transaction) => total + transaction.amount, 0)
        const outgoingTotal = outgoingTransactions.reduce((total, transaction) => total + transaction.amount, 0)
        return incomingTotal - outgoingTotal
    }

    const userBalance = selectedUser ? calculateUserBalance() : 0

    const sortedIncomingTransactions = [...incomingTransactions]
    const sortedOutgoingTransactions = [...outgoingTransactions]

    if (incomingSortOrder === 'asc') {
        sortedIncomingTransactions.sort((a, b) => a.amount - b.amount)
    } else {
        sortedIncomingTransactions.sort((a, b) => b.amount - a.amount)
    }

    if (outgoingSortOrder === 'asc') {
        sortedOutgoingTransactions.sort((a, b) => a.amount - b.amount)
    } else {
        sortedOutgoingTransactions.sort((a, b) => b.amount - a.amount)
    }

    return (
        <div>
            <h2>Account Overview</h2>
            <table className={styles.table}>
                <caption>{selectedUser?.name}</caption>
                <thead>
                    <tr>
                        <th scope="col">Balance</th>
                        <th scope="col">Incoming Transactions</th>
                        <th scope="col">Outgoing Transactions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={styles.balance}>{userBalance.toFixed(2)}</td>
                        <td>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Source ID</th>
                                        <th scope="col" onClick={toggleIncomingSort} className={styles.sortableHeader}>
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
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Target ID</th>
                                        <th scope="col" onClick={toggleOutgoingSort} className={styles.sortableHeader}>
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
