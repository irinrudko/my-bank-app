import { useState } from 'react'
import { Transaction, User } from '../../../types/types'
import { TransactionTable } from './TransactionTable/TransactionTable'
import common from '../../../styles/common.module.scss'
import styles from './TransactionsTable.module.scss'

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
    const totalItemsIncoming = transactions.filter((transaction) => transaction.targetId === selectedUser?.id).length
    const totalItemsOutgoing = transactions.filter((transaction) => transaction.sourceId === selectedUser?.id).length
    const totalItems = Math.max(totalItemsIncoming, totalItemsOutgoing)
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    let startPage = Math.max(1, currentPage - 4)
    let endPage = Math.min(startPage + 9, totalPages)

    if (endPage - startPage < 9) {
        endPage = Math.min(totalPages, startPage + 9)
        startPage = Math.max(1, endPage - 9)
    }
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
            {/* Pagination */}
            <div className={styles.pagination}>
                <button className={styles.button} onClick={() => goToPage(1)} disabled={currentPage === 1}>
                    First Page
                </button>
                <button
                    className={styles.button}
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => goToPage(pageNumber)}
                        className={`${styles.button} ${pageNumber === currentPage ? 'active' : ''}`}
                        disabled={pageNumber === currentPage}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button
                    className={styles.button}
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
                <button
                    className={styles.button}
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    Last Page
                </button>
            </div>
        </div>
    )
}
