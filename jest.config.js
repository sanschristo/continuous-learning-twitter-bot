module.exports = {
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    },
    "roots": [
        "<rootDir>/src",
        "<rootDir>/test/unit"
    ],
    "testRegex": "\.(test|spec){1}\\.ts?$",
    "moduleFileExtensions": [
        "ts",
        "js",
        "json",
        "node"
    ],
    "setupFilesAfterEnv": [
        './jest.setup.js'
    ],
    "reporters": [
        "default"
    ],
    "coverageReporters": [
        "text",
        "lcov"
    ],
    "collectCoverageFrom": [
        '**/src/**/*.{ts,js}',
        '!**/src/index.{ts,js}',
        '!**/src/configs/**',
        '!**/src/**/*.interface.*'
    ],
    "testEnvironment": 'node'
};
