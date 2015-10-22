'use strict'

const fs = require('fs')
const path = require('path')
const tap = require('tap')

const converter = require('../converter')

const cwd = __dirname
const CONVERTED_RESULT = {
  config: {
    context: '%LITERAL%path.join(__dirname, \'.\')%LITERAL%'
  , resolve: {
      root: ['%LITERAL%path.join(__dirname, \'.\')%LITERAL%']
    , alias: {
        jquery: 'lib/jquery/jquery'
      , moment: 'lib/moment'
      , underscore: 'lib/wrapper/underscore'
      , backbone: 'lib/wrapper/backbone'
      }
    }
  , entry: {
      'module-one': './module-one'
    , 'module-two': './module-two'
    }
  , output: {
      path: '%LITERAL%path.join(__dirname, \'../build/js\')%LITERAL%'
    , filename: '[name].js'
    }
  }
, shims: {
    providedPlugins: ['jquery']
  , loaders: [
      {
        test: '%LITERAL%/underscore/%LITERAL%'
      , loader: 'exports?_'
      }
    , {
        test: '%LITERAL%/backbone/%LITERAL%'
      , loader: 'exports?Backbone!imports?jquery,underscore'
      }
    ]
  }
}

var testData

tap.test('should parse RequireJS config', function parseTest(t) {
  function handleParse(error, data) {
    if (error) {
      throw error
    }

    testData = data

    t.end()
  }

  converter.parse(
    path.join(cwd, 'fixtures', 'test-requirejs.config.json')
  , handleParse
  )
})

tap.test('should convert RequireJS config', function convertTest(t) {
  testData = converter.convert(testData)

  t.similar(testData, CONVERTED_RESULT)

  t.end()
})

tap.test('should assemble a webpack config', function assembleTest(t) {
  function handleAssemble(error, data) {
    if (error) {
      throw error
    }

    testData = data

    fs.readFile(
      path.join(cwd, 'fixtures', 'test-webpack.config.js')
    , function handleRead(error, fixtureData) {
      if (error) {
        throw error
      }

      t.similar(data, fixtureData.toString())

      t.end()
    })
  }

  converter.assemble(testData, handleAssemble)
})

tap.test('should write the config', function writeTest(t) {
  function handleWrite(error) {
    if (error) {
      throw error
    }

    t.end()
  }

  converter.write(path.join(cwd, '.temp.config.js'), testData, handleWrite)
})
