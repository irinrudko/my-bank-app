import styles from './Search.module.scss'

type SearchType = {
    value: string
    onChange: (value: string) => void
}

export const Search: React.FC<SearchType> = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Search by transaction id"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.search}
        />
    )
}
