# requirejs-to-webpack-cli

[![Build Status](https://api.travis-ci.org/suitupalex/requirejs-to-webpack-cli.svg)](https://travis-ci.org/suitupalex/requirejs-to-webpack-cli)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7e5ceab97d9c4be68eb9e23030fa08a8)](https://www.codacy.com/app/MartinExperiments/requirejs-to-webpack-cli?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=suitupalex/requirejs-to-webpack-cli&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/7e5ceab97d9c4be68eb9e23030fa08a8)](https://www.codacy.com/app/MartinExperiments/requirejs-to-webpack-cli?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=suitupalex/requirejs-to-webpack-cli&amp;utm_campaign=Badge_Coverage)
[![npm version](https://badge.fury.io/js/requirejs-to-webpack-cli.svg)](https://badge.fury.io/js/requirejs-to-webpack-cli)
[![Dependencies](https://david-dm.org/suitupalex/requirejs-to-webpack-cli.svg)](https://david-dm.org/suitupalex/requirejs-to-webpack-cli)

CLI utility for converting RequireJS configuration JSON to a webpack
configuration module.

## Installation

[Yarn](https://yarnpkg.com) is recommended for installation:

```bash
$ yarn global add requirejs-to-webpack-cli
```

But you can still use `npm`:

```bash
$ npm install -g requirejs-to-webpack-cli
```

## Usage

```bash
# Default output is ./webpack.config.js
$ requirejs-to-webpack-cli <input> [output]

# Aliases
$ requirejs-to-webpack <input> [output]
$ r2w <input> [output]

# Example:
$ r2w build.config
```

## Thanks

Lots of thanks to [Jamund Ferguson](https://github.com/xjamundx) for his write
up on [how to convert to webpack from RequireJS](https://gist.github.com/xjamundx/b1c800e9282e16a6a18e).
This tool aims to automate many of the steps outlined in that guide.

## Contribute

There is definitely much more that can be done to automate the configuration
conversion. If you have any experience in RequireJS and webpack, please feel
free to make a pull request!

## License

Copyright (c) 2016 Alexander Martin

MIT (http://www.opensource.org/licenses/MIT)
