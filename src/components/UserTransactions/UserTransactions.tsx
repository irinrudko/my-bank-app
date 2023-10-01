import { useSearch } from '../../hooks/useSearch'
import { Transaction, User } from '../../types/types'
import { Search } from '../Search/Search'
import { TransactionsTable } from './TransactionsTable/TransactionsTable'

type UserTransactionsType = {
    transactions: Transaction[]
    selectedUser: User | null
}

export const UserTransactions: React.FC<UserTransactionsType> = ({ transactions, selectedUser }) => {
    const { search, handleSearch, filteredTransactions } = useSearch(transactions)

    return (
        <div>
            <h2>Account Overview</h2>

            <Search value={search} onChange={handleSearch} />
            <TransactionsTable transactions={filteredTransactions} selectedUser={selectedUser} />
        </div>
    )
}
