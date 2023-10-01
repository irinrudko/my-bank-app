import { Transaction } from '../../../../types/types'
import styles from './TransactionTable.module.scss'

type SortOrderType = 'asc' | 'desc'

type TransactionTableType = {
    transactions: Transaction[]
    sortOrder: SortOrderType
    onSortOrderChange: any
    type: string
}

export const TransactionTable: React.FC<TransactionTableType> = ({
    transactions,
    sortOrder,
    onSortOrderChange,
    type,
}) => {
    const sortedTransactions = [...transactions].sort((a, b) =>
        sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount
    )

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>{type === 'incoming' ? 'Source ID' : 'Target ID'}</th>
                    <th onClick={onSortOrderChange} className={`${styles.sortableHeader} ${styles.sortIcon}`}>
                        Amount {sortOrder === 'asc' ? '▲' : '▼'}
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedTransactions.map((transaction, index) => (
                    <tr key={index}>
                        <td>{type === 'incoming' ? transaction.sourceId : transaction.targetId}</td>
                        <td>{transaction.amount.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
