import type { Config } from 'jest'

const config: Config = {
    rootDir: './',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(svg|png)$': '<rootDir>/test/mocks/fileMock.js',
    },
    collectCoverageFrom: [
        './src/components/**/*.tsx',
        './src/pages/**/*.tsx',
        './src/routers/**/*.tsx',
    ],
}

export default config
