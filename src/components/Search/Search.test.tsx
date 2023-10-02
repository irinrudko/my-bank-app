import { render, fireEvent } from '@testing-library/react'
import { Search } from './Search'

describe('Search', () => {
    it('renders an input element with the correct placeholder and value', () => {
        const value = 'test-value'
        const placeholder = 'Search by transaction id'

        const { getByPlaceholderText, getByDisplayValue } = render(<Search value={value} onChange={() => {}} />)

        const inputElement = getByPlaceholderText(placeholder)
        const displayedValue = getByDisplayValue(value)

        expect(inputElement).toBeInTheDocument()
        expect(displayedValue).toBeInTheDocument()
    })

    it('calls the onChange function when input value changes', () => {
        const onChange = jest.fn()
        const newValue = 'NewValue'

        const { getByPlaceholderText } = render(<Search value="" onChange={onChange} />)

        const inputElement = getByPlaceholderText('Search by transaction id')

        fireEvent.change(inputElement, { target: { value: newValue } })

        expect(onChange).toHaveBeenCalledWith('NewValue')
    })
})
