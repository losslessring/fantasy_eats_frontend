import { ApolloProvider } from '@apollo/client'
// import { render } from '@testing-library/react'
import { createMockClient, MockApolloClient } from 'mock-apollo-client'
import { render } from '../../test-utils'
import { CreateAccount } from '../create-account'

describe('<CreateAccount />', () => {
    let mockedClient: MockApolloClient

    it('renders OK', async () => {
        mockedClient = createMockClient()

        let renderResult = render(
            <ApolloProvider client={mockedClient}>
                <CreateAccount />
            </ApolloProvider>
        )

        const { debug } = renderResult
        debug()
        expect(document.title).toBe('Create Account | Fantasy Eats')
    })
})
