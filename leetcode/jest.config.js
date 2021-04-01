module.exports = {
  roots: ['<rootDir>'],
  testRegex: '(.+)\\.test\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      isolatedModules: true
      // diagnostics: {
      //   pathRegex: /\.(spec|test)\.ts$/
      // }
    }
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
