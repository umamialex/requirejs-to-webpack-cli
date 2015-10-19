'use strict'

const debug = require('debug')
const fs = require('fs')

const info = debug('r2w:info:parse')
const verbose = debug('r2w:verbose:parse')

module.exports = function parse(src, callback) {
  info('Attempting to read RequireJS build config file.')

  fs.readFile(src, function handleRead(error, data) {
    if (error) {
      info('Build config file read error:', error)
      return callback(error, null)
    }

    info('Successfully read build config file. Attempting to parse.')

    const raw = data.toString()
    verbose('Raw config:', raw)

    const processed = eval('(' + raw + ')')
    info('Successfully parsed build config file.')
    verbose('Processed config:', processed)

    return callback(null, processed)
  })
}
