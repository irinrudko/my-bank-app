import { useState } from 'react'
import { User } from '../../types/types'
import styles from './UserSelection.module.scss'

type UserSelectionType = {
    users: User[]
    setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserSelection: React.FC<UserSelectionType> = ({ users, setSelectedUser: setUser }) => {
    const [selectedUser] = useState<User | null>(null)

    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = event.target.value
        const user = users.find((user) => user.id === userId)
        setUser(user || null)
    }

    return (
        <div className={styles.container}>
            <label>View this page as:</label>
            <select onChange={handleUserChange}>
                <option value="">-- Select User --</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id} className={styles.option}>
                        {user.name}
                    </option>
                ))}
            </select>
            {selectedUser && (
                <div>
                    <h2>Selected User: {selectedUser.name}</h2>
                </div>
            )}
        </div>
    )
}
