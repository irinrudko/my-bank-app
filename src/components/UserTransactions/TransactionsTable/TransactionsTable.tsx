import { useState } from 'react'
import { Transaction, User } from '../../../types/types'
import { TransactionTable } from './TransactionTable/TransactionTable'
import common from '../../../styles/common.module.scss'

type TransactionsTableType = {
    transactions: Transaction[]
    selectedUser: User | null
}

type TransactionType = 'incoming' | 'outgoing'
type SortOrderType = 'asc' | 'desc'

export const TransactionsTable: React.FC<TransactionsTableType> = ({ transactions, selectedUser }) => {
    const [incomingSortOrder, setIncomingSortOrder] = useState<SortOrderType>('asc')
    const [outgoingSortOrder, setOutgoingSortOrder] = useState<SortOrderType>('asc')

    const toggleSortOrder = (column: TransactionType) => {
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
        <table className={common.table}>
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
                        <TransactionTable
                            transactions={transactions.filter(
                                (transaction) => transaction.targetId === selectedUser?.id
                            )}
                            sortOrder={incomingSortOrder}
                            onSortOrderChange={() => toggleSortOrder('incoming')}
                            type="incoming"
                        />
                    </td>
                    <td>
                        <TransactionTable
                            transactions={transactions.filter(
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
    )
}
