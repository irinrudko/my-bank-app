import { Transaction } from '../../../../types/types'
import common from '../../../../styles/common.module.scss'

export type SortOrderType = 'ascending' | 'descending'

type TransactionTableType = {
    transactions: Transaction[]
    sortOrder: SortOrderType
    onSortOrderChange: () => void
    type: string
}

export const TransactionTable: React.FC<TransactionTableType> = ({
    transactions,
    sortOrder,
    onSortOrderChange,
    type,
}) => {
    const sortedTransactions = [...transactions].sort((a, b) =>
        sortOrder === 'ascending' ? a.amount - b.amount : b.amount - a.amount
    )

    if (sortedTransactions.length === 0) {
        return <p>No transactions</p>
    }

    return (
        <table className={common.table}>
            <thead>
                <tr>
                    <th>{type === 'incoming' ? 'Source ID' : 'Target ID'}</th>
                    <th onClick={onSortOrderChange} className={`${common.sortableHeader} ${common.sortIcon}`}>
                        Amount {sortOrder === 'ascending' ? '▲' : '▼'}
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedTransactions.map((transaction, index) => (
                    <tr key={index} data-testid="transaction-row">
                        <td>{type === 'incoming' ? transaction.sourceId : transaction.targetId}</td>
                        <td>{transaction.amount.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
