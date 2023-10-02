import { useState } from 'react'
import { Transaction, User } from '../../../types/types'
import { TransactionTable } from './TransactionTable/TransactionTable'
import common from '../../../styles/common.module.scss'
import { Pagination } from '../../Pagination/Pagination'

type TransactionsTableType = {
    transactions: Transaction[]
    selectedUser: User | null
}

type TransactionType = 'incoming' | 'outgoing'
type SortOrderType = 'asc' | 'desc'

export const TransactionsTable: React.FC<TransactionsTableType> = ({ transactions, selectedUser }) => {
    const [incomingSortOrder, setIncomingSortOrder] = useState<SortOrderType>('asc')
    const [outgoingSortOrder, setOutgoingSortOrder] = useState<SortOrderType>('asc')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage] = useState<number>(20)

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

    const sortTransactions = (column: TransactionType): Transaction[] => {
        const filteredTransactions = transactions.filter((transaction) => {
            switch (column) {
                case 'incoming': {
                    return transaction.targetId === selectedUser?.id
                }
                case 'outgoing': {
                    return transaction.sourceId === selectedUser?.id
                }
            }
        })

        const sortOrder = column === 'incoming' ? incomingSortOrder : outgoingSortOrder

        return filteredTransactions.sort((a, b) => {
            const compareAmount = a.amount - b.amount
            return sortOrder === 'asc' ? compareAmount : -compareAmount
        })
    }

    // pagination
    const incomingTransactions = transactions.filter((t) => t.targetId === selectedUser?.id).length
    const outgoingTransactions = transactions.filter((t) => t.sourceId === selectedUser?.id).length
    const totalTransactions = Math.max(incomingTransactions, outgoingTransactions)

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalTransactions)
    // pagination

    return (
        <div>
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
                                transactions={sortTransactions('incoming').slice(startIndex, endIndex)}
                                sortOrder={incomingSortOrder}
                                onSortOrderChange={() => toggleSortOrder('incoming')}
                                type="incoming"
                            />
                        </td>
                        <td>
                            <TransactionTable
                                transactions={sortTransactions('outgoing').slice(startIndex, endIndex)}
                                sortOrder={outgoingSortOrder}
                                onSortOrderChange={() => toggleSortOrder('outgoing')}
                                type="outgoing"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination
                totalItems={totalTransactions}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}
