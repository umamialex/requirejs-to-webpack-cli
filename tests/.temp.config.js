'use strict'

const path = require('path')
const webpack = require('webpack')

const providePlugin = new webpack.ProvidePlugin({
  'jQuery': 'jquery',
  '$': 'jquery',
  'window.jQuery': 'jquery'
})

module.exports = {
  'context': path.join(__dirname, '.'),
  'resolve': {
    'root': [
      path.join(__dirname, '.')
    ],
    'alias': {
      'jquery': 'lib/jquery/jquery',
      'moment': 'lib/moment',
      'underscore': 'lib/wrapper/underscore',
      'backbone': 'lib/wrapper/backbone'
    }
  },
  'entry': {
    'module-one': './module-one',
    'module-two': './module-two'
  },
  'output': {
    'path': path.join(__dirname, '../build/js'),
    'filename': '[name].js'
  },
  'plugins': [
    providePlugin
  ],
  'modules': {
    'loaders': [
      {
        'test': /underscore/,
        'loader': 'exports?_'
      },
      {
        'test': /backbone/,
        'loader': 'exports?Backbone!imports?jquery,underscore'
      }
    ]
  }
}
