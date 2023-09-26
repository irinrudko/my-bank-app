import { Transaction, User } from '../types/types'

type BalanceDisplayProps = {
    user: User | null
    transactions: Transaction[]
}

export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ user, transactions }) => {
    const calculateUserBalance = () => {
        if (!user) return 0

        const userTransactions = transactions.filter(
            (transaction) => transaction.sourceId === user.id || transaction.targetId === user.id
        )

        const balance = userTransactions.reduce(
            (acc, transaction) =>
                transaction.sourceId === user.id ? acc - transaction.amount : acc + transaction.amount,
            0
        )

        return balance
    }

    const userBalance = calculateUserBalance()

    return (
        <div>
            <h2>Selected User: {user?.name}</h2>
            <p>Balance: {userBalance.toFixed(2)}</p>
        </div>
    )
}
