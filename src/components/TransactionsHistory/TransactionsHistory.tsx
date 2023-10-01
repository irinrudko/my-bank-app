import { useState } from 'react'
import { Transaction, User } from '../../types/types'
import { TransactionsTable } from './TransactionsTable/TransactionsTable'
import { useSearch } from '../../hooks/useSearch'
import { Search } from '../Search/Search'
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

    const { search, handleSearch, filteredTransactions } = useSearch(transactions)

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

    return (
        <div>
            <h2>Account Overview</h2>

            <Search value={search} onChange={handleSearch} />

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
                                transactions={filteredTransactions.filter(
                                    (transaction) => transaction.targetId === selectedUser?.id
                                )}
                                sortOrder={incomingSortOrder}
                                onSortOrderChange={() => toggleSortOrder('incoming')}
                                type="incoming"
                            />
                        </td>
                        <td>
                            <TransactionsTable
                                transactions={filteredTransactions.filter(
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
