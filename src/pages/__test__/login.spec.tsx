import { ApolloProvider } from '@apollo/client'
import { render, RenderResult, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMockClient } from 'mock-apollo-client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Login } from '../login'

jest.mock('../../apollo', () => {
    return {
        isLoggedInVar: jest.fn(),
        authTokenVar: jest.fn(),
    }
})

describe('<Login />', () => {
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

    it('displays email validation errors', async () => {
        userEvent.setup()

        const { getByPlaceholderText, debug, getByRole, getByText } =
            renderResult
        const email = getByPlaceholderText('Email')

        // const email = getByRole('email')

        await waitFor(() => {
            userEvent.type(email, 'this@wont')
        })
        // let errorMessage = getByRole('alert')
        // expect(errorMessage).toHaveTextContent(/Please enter a valid email/i)
        debug()
    })
})
