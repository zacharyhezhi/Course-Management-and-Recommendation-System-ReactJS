var cmify = require('cmify')
var fs = require('fs')
var path = require('path')

var css

// has to happen after all require so place at end of tick
function styles (cb) {
  setImmediate(function () {
    if (css) return cb(null, css)
    css = cmify.getAllCss()
    cb && cb(null, css)
  })
}

const base = path.dirname(require.main.filename)
const production = process.NODE_ENV === 'production'
var c = 0

function tokens (mappings) {
  if (!mappings) {
    cmify.init({
      generateScopedName: function (orig) {
        return function (exportedName, filename) {
          if (production) { return '_' + c++ }
          return orig(exportedName, path.relative(base, filename))
        }
      }
    })
    return
  }
  cmify.init({
    generateScopedName: function (orig) {
      return function (exportedName, filename) {
        var len = mappings.length
        for (var i = 0; i < len; i++) {
          if (mappings[i].test(filename, exportedName)) {
            return mappings[i].map(exportedName, filename)
          }
        }
        if (production) { return '_' + c++ }
        return orig(exportedName, path.relative(base, filename))
      }
    }
  })
}

function configure (opts) {
  opts = opts || {}
  tokens(opts.mappings)
  configure.d = true
}

module.exports = function (file, opts) {
  if (!configure.d) configure(opts)
  file = file || './styles.css'
  file = path.resolve(path.dirname(caller()), file)
  return cmify(fs.readFileSync(file, 'utf8'), file)
}

module.exports.configure = configure

module.exports.styles = styles

function caller () {
  var frame
  var file
  var pst = Error.prepareStackTrace

  Error.prepareStackTrace = function (_, stack) {
    Error.prepareStackTrace = pst
    return stack.slice(2)
  }

  var stack = new Error().stack

  do {
      frame = stack.shift()
      file = frame && frame.getFileName()
  } while (stack.length && file === 'module.js')

  return file
}