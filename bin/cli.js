#!/usr/bin/env node

'use strict'

const chalk = require('chalk')
const path = require('path')
const program = require('commander')

const converter = require('../converter')
const pkg = require('../package.json')

const cwd = process.cwd()

function handleWrite(error) {
  if (error) {
    console.log(chalk.red('Failed to write webpack config file:'), error)
    throw error
  }

  console.log(chalk.green('Successfully wrote webpack config file.'))
  console.log(chalk.green('\nDone!'))
  console.log(chalk.yellow(
    '\nChances are your new webpack config will not work 100%.\n'
  + 'Make sure to checkout '
  + 'https://gist.github.com/xjamundx/b1c800e9282e16a6a18e\n'
  + 'for more information on migrating your project.'
  ))
}

function convert(input, output) {
  output = output || 'webpack.config.js'

  function handleAssemble(error, data) {
    if (error) {
      console.log(chalk.red('Failed to assemble webpack config file:'), error)
      throw error
    }

    console.log(chalk.green('Successfully assembled webpack config file.'))

    converter.write(output, data, handleWrite)
  }

  function handleParse(error, data) {
    if (error) {
      console.log(chalk.red('Failed to parse RequireJS config file:'), error)
      throw error
    }

    console.log(chalk.green('Successfully parsed RequireJS config file.'))

    converter.assemble(converter.convert(data), handleAssemble)
  }

  converter.parse(path.join(cwd, input), handleParse)
}

program
  .version(pkg.version)
  .usage('[options] <input> [output]')

  .arguments('<input> [output]')
  .action(convert)

program.parse(process.argv)

if (!program.args.length) {
  return program.help()
}
