const config = {
  projects: [
    {
      displayName: 'Snapshot tests',
      testMatch: ['./**/template.test.js'],
      cacheDirectory: '<rootDir>/.cache/jest/',
      snapshotSerializers: [
        'jest-serializer-html'
      ],
      setupFilesAfterEnv: [
        './config/jest-setup.js'
      ]
    },
    {
      displayName: 'JavaScript behaviour tests',
      testMatch: ['./**/*.test.js', '!./**/template.test.js'],
      cacheDirectory: '<rootDir>/.cache/jest/',
      preset: 'jest-puppeteer'
    },
    {
      displayName: 'JavaScript unit tests',
      transform: {
        '.*.js$': 'rollup-jest'
      },
      moduleFileExtensions: ['js', 'mjs'],
      testMatch: ['./**/*.unit.test.mjs', './**/*.unit.test.js'],
      cacheDirectory: '<rootDir>/.cache/jest/'
    }
  ]
}

module.exports = config
