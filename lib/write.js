'use strict'

const debug = require('debug')
const fs = require('fs')

const info = debug('r2w:info:write')

module.exports = function write(destination, config, callback) {
  info('Attempting to write webpack config.')

  fs.writeFile(destination, config, function handleWrite(error) {
    if (error) {
      info('Failed to write webpack config.')
      return callback(error)
    }

    info('Successfully wrote webpack config.')

    return callback(null)
  })
}
