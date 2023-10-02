import { render, screen, fireEvent } from '@testing-library/react'
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

    it('allows sorting by incoming transactions', () => {
        render(<TransactionsTable transactions={mockTransactions} selectedUser={mockUsers[0]} />)

        const incomingHeader = screen.getByText('Incoming Transactions')

        fireEvent.click(incomingHeader)

        const sortedTransactions = [...mockTransactions].sort((a, b) => a.amount - b.amount)

        const transactionRows = screen.getAllByTestId('transaction-row')

        expect(transactionRows[0]).toHaveTextContent(sortedTransactions[0].sourceId)
        expect(transactionRows[0]).toHaveTextContent(sortedTransactions[0].amount.toString())

        expect(transactionRows[1]).toHaveTextContent(sortedTransactions[1].sourceId)
        expect(transactionRows[1]).toHaveTextContent(sortedTransactions[1].amount.toString())
    })

    it('allows sorting by outgoing transactions', () => {
        render(<TransactionsTable transactions={mockTransactions} selectedUser={mockUsers[0]} />)

        const outgoingHeader = screen.getByText('Outgoing Transactions')

        fireEvent.click(outgoingHeader)

        const sortedTransactions = [...mockTransactions].sort((a, b) => a.amount - b.amount)

        const transactionRows = screen.getAllByTestId('transaction-row')

        expect(transactionRows[0]).toHaveTextContent(sortedTransactions[0].sourceId)
        expect(transactionRows[0]).toHaveTextContent(sortedTransactions[0].amount.toString())

        expect(transactionRows[1]).toHaveTextContent(sortedTransactions[1].sourceId)
        expect(transactionRows[1]).toHaveTextContent(sortedTransactions[1].amount.toString())
    })
})
