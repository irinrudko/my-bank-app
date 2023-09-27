import { useState, useEffect } from 'react'
import { fetchUsersAndTransactions } from './data/api'
import { User, Transaction } from './types/types'
import { UserSelection } from './components/UserSelection'
import { BalanceDisplay } from './components/BalanceDisplay'
import { TransactionHistory } from './components/TransactionHistory'

const App: React.FC = () => {
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
        <div className="App">
            <h1>Bank Transaction History</h1>
            <UserSelection users={users} setSelectedUser={setSelectedUser} />
            <BalanceDisplay user={selectedUser} transactions={transactions} />
            <TransactionHistory transactions={transactions} selectedUser={selectedUser} />
        </div>
    )
}

export default App
