import { render, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { NotFound } from '../404'

describe('<NotFound />', () => {
    it('renders OK', async () => {
        render(
            <Router>
                <NotFound />
            </Router>
        )
        await waitFor(() => {
            expect(document.title).toBe('Not Found | Fantasy Eats')
        })
    })
})
