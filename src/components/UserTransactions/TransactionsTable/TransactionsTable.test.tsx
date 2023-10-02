import { render, screen } from '@testing-library/react'
import { TransactionsTable } from './TransactionsTable'

const mockUsers = [
    {
        id: '1',
        name: 'Angelia Fischer',
    },
    {
        id: '2',
        name: 'Waller Harding',
    },
    {
        id: '3',
        name: 'Gardner Clay',
    },
    {
        id: '4',
        name: 'Acosta Farley',
    },
    {
        id: '5',
        name: 'Austin Guthrie',
    },
]

const mockTransactions = [
    {
        sourceId: '1',
        targetId: '2',
        amount: 5,
    },
    {
        sourceId: '1',
        targetId: '5',
        amount: 3,
    },
    {
        sourceId: '2',
        targetId: '1',
        amount: 11,
    },
    {
        sourceId: '3',
        targetId: '1',
        amount: 1,
    },
    {
        sourceId: '2',
        targetId: '3',
        amount: 2,
    },
]

describe('TransactionsTable Component', () => {
    it('renders the table with the correct headers', () => {
        render(<TransactionsTable transactions={[]} selectedUser={null} />)

        expect(screen.getByText('Incoming Transactions')).toBeInTheDocument()
        expect(screen.getByText('Outgoing Transactions')).toBeInTheDocument()
    })

    it('displays pagination', () => {
        render(<TransactionsTable transactions={mockTransactions} selectedUser={mockUsers[0]} />)

        expect(screen.getByText('1')).toBeInTheDocument() // Assuming initial currentPage is 1
        expect(screen.getByText('Next')).toBeInTheDocument()
        expect(screen.getByText('Last Page')).toBeInTheDocument()
    })
})
