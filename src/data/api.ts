import { Transaction, User } from '../types/types'

const JSON_FILE_PATH = '/data/bankData.json'
// const JSON_FILE_PATH = '/data/testData.json'

export async function fetchUsersAndTransactions(): Promise<{ users: User[]; transactions: Transaction[] }> {
    try {
        const response = await fetch(JSON_FILE_PATH)
        if (!response.ok) {
            throw new Error('Failed to fetch JSON data')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching JSON data:', error)
        throw error
    }
}
