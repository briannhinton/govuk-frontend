const { cleanPublic } = require('../tasks/clean.js')
// const { lintJS, lintSCSS } = require('../tasks/lint.js')
// const { compileJS, compileSCSS } = require('../tasks/compile.js')
// const { copyStylesToPublic, copyJStoPublic } = require('../tasks/copy.js')
// const buildSassdocs = require('../tasks/sassdoc.js')
const nodemon = require('nodemon')
const paths = require('../config/paths.json')

require('../check-nvmrc.js')

// Define watch task (this is the only place it's used)
// function watch () {
//   // watch some files
// }

// Define nodemon task (this is the only place it's used)
function runNodemon () {
  return nodemon({
    watch: [
      paths.app,
      paths.src
    ],
    script: 'app/start.js'
  })
}

// If we found this to be too slow in comparison to Gulp, we could look into
// streaming or other tricks. The main possible source of slowness would likely
// be creating the compiled files and then copying them.
cleanPublic()
// lintJS()
// lintSCSS()
// compileJS()
// compileSCSS()
// copyStylesToPublic()
// copyJStoPublic()
// buildSassdocs()
// watch()
runNodemon()
