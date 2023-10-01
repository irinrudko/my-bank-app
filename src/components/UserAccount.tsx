import { useState, useEffect } from 'react'
import { fetchUsersAndTransactions } from '../data/api'
import { User, Transaction } from '../types/types'
import { BalanceDisplay } from './BalanceDisplay'
import { UserSelection } from './UserSelection'
import { UserTransactions } from './UserTransactions/UserTransactions'

export const UserAccount = () => {
    const [users, setUsers] = useState<User[]>([])
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchUsersAndTransactions()
                setUsers(data.users)
                setTransactions(data.transactions)
            } catch (error) {}
        }

        loadData()
    }, [])

    return (
        <div>
            <h1>Bank Transaction History</h1>
            <UserSelection users={users} setSelectedUser={setSelectedUser} />

            {selectedUser && (
                <>
                    <BalanceDisplay user={selectedUser} transactions={transactions} />
                    <UserTransactions transactions={transactions} selectedUser={selectedUser} />
                </>
            )}
        </div>
    )
}
