'use strict'

function removeDuplicates(element, position, array) {
  return array.indexOf(element) === position
}

module.exports = function dissectShims(shims) {
  const dissected = {
    providedPlugins: []
  , loaders: []
  }

  const keys = Object.keys(shims)
  const length = keys.length

  for (let i = 0; i < length; i++) {
    let module = keys[i]
    let shim = shims[module]

    if (Array.isArray(shim)) {
      dissected.providedPlugins = dissected.providedPlugins.concat(shim)
      continue
    }

    var exports = shim.exports
    var imports = shim.deps

    dissected.loaders.push({
      test: '%LITERAL%/' + module + '/%LITERAL%'
    , loader: 'exports?' + exports
      + (Array.isArray(imports) ? '!imports?' + imports.join(',') : '')
    })
  }

  dissected.providedPlugins = dissected.providedPlugins.filter(removeDuplicates)
  
  return dissected
}
