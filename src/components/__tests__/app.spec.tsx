import { render } from '@testing-library/react'
import App from '../App'

jest.mock('../../routers/logged-in-router', () => {
    return {
        LoggedInRouter: () => <span>logged-in</span>,
    }
})

jest.mock('../../apollo', () => {
    return {
        isLoggedInVar: jest.fn(),
    }
})

jest.mock('../../routers/logged-out-router', () => {
    return {
        LoggedOutRouter: () => <span>logged-out</span>,
    }
})

jest.mock('@apollo/client', () => {
    return {
        useReactiveVar: () => false,
    }
})

describe('<App />', () => {
    it('renders LoggedOutRouter', () => {
        const { debug, getByText } = render(<App />)
        getByText('logged-out')
        // debug()
    })
})
