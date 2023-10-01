import { useState, useEffect } from 'react'
import { fetchUsersAndTransactions } from '../../data/api'
import { User, Transaction } from '../../types/types'
import { UserSelection } from '../UserSelection/UserSelection'
import { Route, Routes } from 'react-router-dom'
import UserDetail from '../UserDetail/UserDetail'

export const UserAccount = () => {
    const [users, setUsers] = useState<User[]>([])
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [selectedUserId, setSelectedUserId] = useState<string>('')

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

    const setUserId = (userId: string) => {
        setSelectedUserId(userId)
    }

    return (
        <div>
            <h1>Bank Transaction History</h1>
            <UserSelection users={users} id={selectedUserId} />

            <Routes>
                <Route
                    path="/user/:userId"
                    element={<UserDetail users={users} transactions={transactions} onUserIdChange={setUserId} />}
                />
            </Routes>
        </div>
    )
}
