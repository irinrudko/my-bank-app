import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { User, Transaction } from '../../types/types'
import { BalanceDisplay } from '../BalanceDisplay'
import { UserTransactions } from '../UserTransactions/UserTransactions'

type UserDetailProps = {
    users: User[]
    transactions: Transaction[]
    onUserIdChange: (userId: string) => void // send userId to parent
}

const UserDetail: React.FC<UserDetailProps> = ({ users, transactions, onUserIdChange }) => {
    const { userId } = useParams<{ userId: string }>()
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    useEffect(() => {
        const user = users.find((user) => user.id === userId)
        setSelectedUser(user || null)

        onUserIdChange(userId!)
    }, [userId, users])

    return (
        <div>
            {selectedUser && (
                <>
                    <BalanceDisplay user={selectedUser} transactions={transactions} />
                    <UserTransactions transactions={transactions} selectedUser={selectedUser} />
                </>
            )}
        </div>
    )
}

export default UserDetail
