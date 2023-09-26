import { Transaction, User } from '../types/types'

type TransactionHistoryProps = {
    transactions: Transaction[]
    selectedUser: User | null
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions, selectedUser }) => {
    const incomingTransactions = selectedUser
        ? transactions.filter((transaction) => transaction.targetId === selectedUser.id)
        : []

    const outgoingTransactions = selectedUser
        ? transactions.filter((transaction) => transaction.sourceId === selectedUser.id)
        : []

    return (
        <div>
            <h2>Transaction History</h2>
            <h3>Incoming Transactions</h3>
            <table>
                <thead>
                    <tr>
                        <th>Source ID</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {incomingTransactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.sourceId}</td>
                            <td>{transaction.amount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Outgoing Transactions</h3>
            <table>
                <thead>
                    <tr>
                        <th>Target ID</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {outgoingTransactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.targetId}</td>
                            <td>{transaction.amount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
