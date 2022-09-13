#! /usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')

const readConfig = (configPath) => new Promise((resolve, reject) => {
  return fs.readFile(configPath, 'utf8', function (error, config) {
    if (error) return reject(error)
    resolve(config.trim())
  })
})

Promise.all([
  readConfig(path.resolve(__dirname, '../.nvmrc')),
  readConfig(path.resolve(__dirname, '../package.json')).then(JSON.parse)
]).then((configs) => {
  const configNvm = configs[0]
  const configPkg = configs[1]

  // Node.js version (via config files)
  const expectedLts = configNvm.replace(/^lts\//, '')
  const expectedVersion = configPkg.engines.node.replace(/^\^/, '')

  // Node.js version (via running process)
  const currentLts = process.release.lts.toLowerCase()
  const currentVersion = process.version.replace('v', '')

  var versionMatchesExactly = expectedVersion === currentVersion
  var versionMatchesMajor = expectedLts === currentLts

  if (versionMatchesExactly) {
    process.exit()
  }

  var nvmInstallText = 'To do this you can install nvm (https://github.com/creationix/nvm) then run `nvm install`.'

  if (versionMatchesMajor) {
    console.log('' +
      'Warning: You are using Node.js version ' + currentVersion + ' which we do not use. ' +
      '\n\n' +
      'You may encounter issues, consider installing Node.js version ' + expectedVersion + '.' +
      '\n\n' +
      nvmInstallText +
    '')
    process.exit()
  }

  console.log('' +
    'You are using Node.js version ' + currentVersion + ' which we do not support. ' +
    '\n\n' +
    'Please install Node.js version ' + expectedVersion + ' and try again.' +
    '\n\n' +
    nvmInstallText +
  '')
  process.exit(1) // exit with a failure mode
})
