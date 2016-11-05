'use strict'

const debug = require('debug')
const fs = require('fs')
const path = require('path')
const os = require('os')

const info = debug('r2w:info:assemble')
const verbose = debug('r2w:verbose:assemble')

const TEMPLATE_PATH = path.join(__dirname, 'webpack.config.template.js')

function replacer(key, value) {
  if (typeof value === 'function') {
    return '%LITERAL%' + value.toString() + '%LITERAL%'
  }

  return value
}

module.exports = function assemble(conversion, callback) {
  info('Attempting to assemble webpack config.')

  const config = conversion.config
  const shims = conversion.shims

  var shimString = ''

  const providedPlugins = {}

  function providedPluginIterator(plugin) {
    const aliases = []

    switch (plugin.toLowerCase()) {
      case 'jquery':
        aliases.push('jQuery', '$', 'window.jQuery')
      break;
      default:
        aliases.push(plugin)
    }

    aliases.reduce(function aliasReducer(result, alias) {
      providedPlugins[alias] = plugin
    }, providedPlugins)
  }

  if (shims.providedPlugins.length > 0) {
    shims.providedPlugins.forEach(providedPluginIterator)

    shimString = 'const providePlugin = new webpack.ProvidePlugin('
    + JSON.stringify(providedPlugins, false, 2)
    + ')'

    config.plugins = [
      '%LITERAL%providePlugin%LITERAL%'
    ]
  }

  if (shims.loaders.length > 0) {
    config.module = {
      loaders: shims.loaders
    }
  }

  const stringified = JSON.stringify(config, replacer, 2)
      .replace(/"%LITERAL%|%LITERAL%"/g, '')
      .replace(/\\n/g, os.EOL) // Replaces newlines with OS specific newlines.
  info('Successfully stringified weback config.')
  verbose('Stringified webpack config:', stringified)

  info('Attempting to read weback config template.')
  fs.readFile(TEMPLATE_PATH, function handleRead(error, data) {
    if (error) {
      info('Failed to read weback config template.')
      return callback(error, null)
    }

    info('Successfully read weback config template.')

    var template = data.toString()
    verbose('Weback config template:', template)

    // Strip trailing newline.
    template = template.substring(0, template.lastIndexOf('\n'))

    template = template.replace('%SHIMS%', shimString)

    var output = template + stringified + os.EOL
    output = output.replace(/"/g, '\'')
    verbose('Weback config output:', output)

    info('Successfullly assembled weback config.')
    return callback(null, output)
  })
}
