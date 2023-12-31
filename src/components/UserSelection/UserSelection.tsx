import { useEffect, useState } from 'react'
import { User } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import styles from './UserSelection.module.scss'

type UserSelectionType = {
    users: User[]
    id: string
}

export const UserSelection: React.FC<UserSelectionType> = ({ users, id }) => {
    const navigate = useNavigate()
    const [selectedUserId, setSelectedUserId] = useState<string>(id)

    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = event.target.value
        setSelectedUserId(userId)
        navigate(`/user/${userId}`)
    }

    useEffect(() => {
        setSelectedUserId(id)
    }, [id])

    return (
        <div className={styles.container}>
            <label>View this page as:</label>
            <select onChange={handleUserChange} value={selectedUserId}>
                <option value="">-- Select User --</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id} className={styles.option}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>
    )
}
