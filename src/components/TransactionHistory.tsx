import { Transaction, User } from '../types/types'

type TransactionHistoryType = {
    transactions: Transaction[]
    selectedUser: User | null
}

export const TransactionHistory: React.FC<TransactionHistoryType> = ({ transactions, selectedUser }) => {
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

    return (
        <div>
            <h2>Account Overview</h2>
            <table>
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
                        <td>{userBalance.toFixed(2)}</td>
                        <td>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Source ID</th>
                                        <th scope="row">Amount</th>
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
                        </td>
                        <td>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Target ID</th>
                                        <th scope="col">Amount</th>
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
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
