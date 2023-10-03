import { memo, useMemo } from 'react'
import { Transaction, User } from '../../types/types'
import styles from './Balance.module.scss'

type BalanceType = {
    user: User | null
    transactions: Transaction[]
}

export const Balance: React.FC<BalanceType> = memo(({ user, transactions }) => {
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

    const userBalance = useMemo(() => calculateUserBalance(), [calculateUserBalance])

    return (
        <div className={styles.balance}>
            <p>Balance: {userBalance.toFixed(2)}</p>
        </div>
    )
})
