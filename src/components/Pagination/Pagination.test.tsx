import { render, screen } from '@testing-library/react'
import Pagination from './Pagination'

const onPageChange = jest.fn()

describe('Pagination Component', () => {
    it('renders without errors', () => {
        render(<Pagination totalItems={100} itemsPerPage={10} currentPage={1} onPageChange={onPageChange} />)
        expect(screen.getByText('First Page')).toBeInTheDocument()
        expect(screen.getByText('Previous')).toBeInTheDocument()
        expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('disables "First Page" and "Previous" buttons on the first page', () => {
        render(<Pagination totalItems={100} itemsPerPage={10} currentPage={1} onPageChange={onPageChange} />)

        const firstPageButton = screen.getByText('First Page')
        const previousButton = screen.getByText('Previous')

        expect(firstPageButton).toBeDisabled()
        expect(previousButton).toBeDisabled()
    })

    it('enables "First Page" and "Previous" buttons when it is not the first page', () => {
        render(<Pagination totalItems={100} itemsPerPage={10} currentPage={2} onPageChange={onPageChange} />)

        const firstPageButton = screen.getByText('First Page')
        const previousButton = screen.getByText('Previous')

        expect(firstPageButton).toBeEnabled()
        expect(previousButton).toBeEnabled()
    })

    it('disables "Next" and "Last Page" buttons on the last page', () => {
        render(<Pagination totalItems={100} itemsPerPage={10} currentPage={10} onPageChange={onPageChange} />)

        const nextPageButton = screen.getByText('Next')
        const lastPageButton = screen.getByText('Last Page')

        expect(nextPageButton).toBeDisabled()
        expect(lastPageButton).toBeDisabled()
    })

    it('enables "Next" and "Last Page" buttons when it is not the last page', () => {
        render(<Pagination totalItems={100} itemsPerPage={10} currentPage={5} onPageChange={onPageChange} />)

        const nextPageButton = screen.getByText('Next')
        const lastPageButton = screen.getByText('Last Page')

        expect(nextPageButton).toBeEnabled()
        expect(lastPageButton).toBeEnabled()
    })

    it('disables the clicked page button', () => {
        render(<Pagination totalItems={100} itemsPerPage={10} currentPage={5} onPageChange={onPageChange} />)

        const pageButton = screen.getByText('5')
        const previousPageButton = screen.getByText('4')
        const nextPageButton = screen.getByText('6')

        expect(pageButton).toBeDisabled()
        expect(previousPageButton).not.toBeDisabled()
        expect(nextPageButton).not.toBeDisabled()
    })
})
