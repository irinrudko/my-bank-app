import { useState } from 'react'
import { Transaction, User } from '../../types/types'
import { TransactionsTable } from './TransactionsTable/TransactionsTable'
import styles from './TransactionsHistory.module.scss'

type TransactionHistoryType = {
    transactions: Transaction[]
    selectedUser: User | null
}

type SortOrderType = 'asc' | 'desc'
type TransactionsType = 'incoming' | 'outgoing'

export const TransactionsHistory: React.FC<TransactionHistoryType> = ({ transactions, selectedUser }) => {
    const [incomingSortOrder, setIncomingSortOrder] = useState<SortOrderType>('asc')
    const [outgoingSortOrder, setOutgoingSortOrder] = useState<SortOrderType>('asc')

    const toggleSortOrder = (column: TransactionsType) => {
        switch (column) {
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
                            <TransactionsTable
                                transactions={userTransactions.filter(
                                    (transaction) => transaction.targetId === selectedUser?.id
                                )}
                                sortOrder={incomingSortOrder}
                                onSortOrderChange={() => toggleSortOrder('incoming')}
                                type="incoming"
                            />
                        </td>
                        <td>
                            <TransactionsTable
                                transactions={userTransactions.filter(
                                    (transaction) => transaction.sourceId === selectedUser?.id
                                )}
                                sortOrder={outgoingSortOrder}
                                onSortOrderChange={() => toggleSortOrder('outgoing')}
                                type="outgoing"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
