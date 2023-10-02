import { render, fireEvent } from '@testing-library/react'
import { TransactionTable } from './TransactionTable'

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

describe('TransactionTable', () => {
    it('renders the table headers correctly', () => {
        const { getByText } = render(
            <TransactionTable
                transactions={mockTransactions}
                sortOrder="ascending"
                onSortOrderChange={() => {}}
                type="incoming"
            />
        )

        expect(getByText('Source ID')).toBeInTheDocument()
        expect(getByText('Amount ▲')).toBeInTheDocument()
    })

    it('renders the correct number of transactions', () => {
        const { getAllByTestId } = render(
            <TransactionTable
                transactions={mockTransactions}
                sortOrder="ascending"
                onSortOrderChange={() => {}}
                type="incoming"
            />
        )

        const rows = getAllByTestId('transaction-row')
        expect(rows.length).toBe(mockTransactions.length)
    })

    it('calls the onSortOrderChange function when the header is clicked', () => {
        const onSortOrderChange = jest.fn()

        const { getByText } = render(
            <TransactionTable
                transactions={mockTransactions}
                sortOrder="ascending"
                onSortOrderChange={onSortOrderChange}
                type="incoming"
            />
        )

        const header = getByText('Amount ▲')
        fireEvent.click(header)

        expect(onSortOrderChange).toHaveBeenCalled()
    })
    it('renders the correct sort icon when sortOrder is ascending', () => {
        const { getByText } = render(
            <TransactionTable
                transactions={mockTransactions}
                sortOrder="ascending"
                onSortOrderChange={() => {}}
                type="incoming"
            />
        )

        const sortIcon = getByText('Amount ▲')
        expect(sortIcon).toBeInTheDocument()
    })

    it('renders the correct sort icon when sortOrder is descending', () => {
        const { getByText } = render(
            <TransactionTable
                transactions={mockTransactions}
                sortOrder="descending"
                onSortOrderChange={() => {}}
                type="incoming"
            />
        )

        const sortIcon = getByText('Amount ▼')
        expect(sortIcon).toBeInTheDocument()
    })

    it('renders Target ID as the header when type is outgoing', () => {
        const { getByText } = render(
            <TransactionTable
                transactions={mockTransactions}
                sortOrder="ascending"
                onSortOrderChange={() => {}}
                type="outgoing"
            />
        )

        expect(getByText('Target ID')).toBeInTheDocument()
    })

    it('renders "No transactions" message when there are no transactions', () => {
        const { getByText } = render(
            <TransactionTable transactions={[]} sortOrder="ascending" onSortOrderChange={() => {}} type="incoming" />
        )

        expect(getByText('No transactions')).toBeInTheDocument()
    })
})
