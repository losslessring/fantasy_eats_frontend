import { render } from '@testing-library/react'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

const AllTheProviders: React.FC = ({ children }: any) => {
    return <Router>{children}</Router>
}

const customRender = (ui: React.ReactElement, options?: any) =>
    render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'
// override render method
export { customRender as render }
