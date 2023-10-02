import styles from './Pagination.module.scss'

type PaginationProps = {
    totalItems: number
    itemsPerPage: number
    currentPage: number
    onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const goToPage = (page: number) => page >= 1 && page <= totalPages

    const handlePageChange = (page: number) => {
        if (goToPage(page)) {
            onPageChange(page)
        }
    }

    const generatePageNumbers = () => {
        const pageNumbers = []
        let startPage = Math.max(1, currentPage - 4)
        let endPage = Math.min(startPage + 9, totalPages)

        if (endPage - startPage < 9) {
            endPage = Math.min(totalPages, startPage + 9)
            startPage = Math.max(1, endPage - 9)
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i)
        }

        return pageNumbers
    }

    const setStartPage = () => handlePageChange(1)
    const setPreviousPage = () => handlePageChange(currentPage - 1)
    const setNextPage = () => handlePageChange(currentPage + 1)
    const setLastPage = () => handlePageChange(totalPages)

    return (
        <div className={styles.pagination}>
            <button className={styles.button} onClick={setStartPage} disabled={currentPage === 1}>
                First Page
            </button>
            <button className={styles.button} onClick={setPreviousPage} disabled={currentPage === 1}>
                Previous
            </button>
            {generatePageNumbers().map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`${styles.button} ${pageNumber === currentPage ? 'active' : ''}`}
                    disabled={pageNumber === currentPage}
                >
                    {pageNumber}
                </button>
            ))}
            <button className={styles.button} onClick={setNextPage} disabled={currentPage === totalPages}>
                Next
            </button>
            <button className={styles.button} onClick={setLastPage} disabled={currentPage === totalPages}>
                Last Page
            </button>
        </div>
    )
}

export default Pagination
