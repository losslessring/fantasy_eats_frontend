import { ApolloProvider } from '@apollo/client'
import { render, RenderResult, waitFor } from '@testing-library/react'
import { createMockClient } from 'mock-apollo-client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Login } from '../login'

jest.mock('../../apollo', () => {
    return {
        isLoggedInVar: jest.fn(),
        authTokenVar: jest.fn(),
    }
})

describe.skip('<Login />', () => {
    let renderResult: RenderResult
    beforeEach(async () => {
        await waitFor(() => {
            const mockedClient = createMockClient()

            renderResult = render(
                <Router>
                    <ApolloProvider client={mockedClient}>
                        <Login />
                    </ApolloProvider>
                </Router>
            )
        })
    })

    it('should render OK', async () => {
        await waitFor(() => {
            expect(document.title).toBe('Login | Fantasy Eats')
        })
    })
})
