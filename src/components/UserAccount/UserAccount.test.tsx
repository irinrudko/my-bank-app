import { render, waitFor, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { UserAccount } from './UserAccount'
import * as api from '../../data/api'

jest.mock('../../data/api', () => ({
    fetchUsersAndTransactions: jest.fn(),
}))

const userWithId1 = 'Angelia Fischer'
const userWithId2 = 'Waller Harding'

const mockData = {
    users: [
        {
            id: '1',
            name: userWithId1,
        },
        {
            id: '2',
            name: userWithId2,
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
    ],
    transactions: [
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
    ],
}

describe('UserAccount Component', () => {
    beforeAll(() => {
        ;(api.fetchUsersAndTransactions as jest.Mock).mockResolvedValue(mockData)
    })

    it('renders the component and loads data', async () => {
        render(
            <MemoryRouter>
                <UserAccount />
            </MemoryRouter>
        )

        await waitFor(() => {
            const title = screen.getByText('Bank Transaction History')
            expect(title).toBeInTheDocument()
        })
    })

    it('displays the user detail page when a user is selected', async () => {
        render(
            <MemoryRouter initialEntries={['/user/1']}>
                <UserAccount />
            </MemoryRouter>
        )

        await waitFor(() => {
            const userDetailElement = screen.getByTestId('user-detail')
            const selectedUser = screen.getByTestId('selected-user')

            expect(userDetailElement).toBeInTheDocument()
            expect(selectedUser.textContent).toBe(`Selected User: ${userWithId1}`)
        })
    })
    it('does not display other users when a certain user is selected', async () => {
        render(
            <MemoryRouter initialEntries={['/user/1']}>
                <UserAccount />
            </MemoryRouter>
        )
        await waitFor(() => {
            screen.getByTestId('user-detail')
            const randomUser = screen.getByTestId('selected-user')

            expect(randomUser.textContent).not.toBe(`Selected User: ${userWithId2}`)
        })
    })

    it('changes the selected user when a different user is selected', async () => {
        const { rerender } = render(
            <MemoryRouter initialEntries={['/user/1']}>
                <UserAccount />
            </MemoryRouter>
        )

        await waitFor(() => {
            const selectedUser = screen.getByTestId('selected-user')

            expect(selectedUser.textContent).toBe(`Selected User: ${userWithId1}`)
        })

        rerender(
            <MemoryRouter initialEntries={['/user/2']}>
                <UserAccount />
            </MemoryRouter>
        )
        userEvent.selectOptions(screen.getByRole('combobox'), '2')

        await waitFor(() => {
            const newSelectedUser = screen.getByTestId('selected-user')

            expect(newSelectedUser.textContent).toBe(`Selected User: ${userWithId2}`)
            expect(newSelectedUser.textContent).not.toBe(`Selected User: ${userWithId1}`)
        })
    })

    afterEach(cleanup)
})
