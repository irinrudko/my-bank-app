import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Transaction, User } from '../../../types/types'
import { SortOrderType, TransactionTable } from './TransactionTable/TransactionTable'
import { Pagination } from '../../Pagination/Pagination'
import common from '../../../styles/common.module.scss'

type TransactionsTableType = {
    transactions: Transaction[]
    selectedUser: User | null
}

type TransactionType = 'incoming' | 'outgoing'

export const TransactionsTable: React.FC<TransactionsTableType> = ({ transactions, selectedUser }) => {
    const [incomingSortOrder, setIncomingSortOrder] = useState<SortOrderType>('ascending')
    const [outgoingSortOrder, setOutgoingSortOrder] = useState<SortOrderType>('descending')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage] = useState<number>(20)

    const { userId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        // mount with page number from url
        const searchParams = new URLSearchParams(location.search)
        const page = searchParams.get('page')

        page && setCurrentPage(Number(page))
    }, [location.search])

    const setPageToUrl = (pageNumber: number) => {
        const searchParams = new URLSearchParams(location.search)

        searchParams.set('page', pageNumber.toString())
        navigate(`/user/${userId}?${searchParams.toString()}`)
    }

    const toggleSortOrder = (column: TransactionType) => {
        switch (column) {
            case 'incoming':
                setIncomingSortOrder(incomingSortOrder === 'ascending' ? 'descending' : 'ascending')
                break
            case 'outgoing':
                setOutgoingSortOrder(outgoingSortOrder === 'ascending' ? 'descending' : 'ascending')
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
            return sortOrder === 'ascending' ? compareAmount : -compareAmount
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
                onPageChange={(page) => {
                    setPageToUrl(page)
                    setCurrentPage(page)
                }}
            />
        </div>
    )
}
