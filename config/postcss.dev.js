'use strict'

const resolve = require('path').resolve
const getTransform = require('./utils/getTransform')
const paths = require('./paths')

module.exports = function (webpack) {
  return getTransform('postcss')([
    require('postcss-import')({
      path: [resolve(paths.appSrc, 'styles')]
    }),
    require('postcss-url')(),
    require('postcss-custom-properties')(),
    require('postcss-calc')({
      warnWhenCannotResolve: true
    }),
    require('autoprefixer')({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9'
      ]
    }),
    require('postcss-browser-reporter')(),
    require('postcss-reporter')()
  ], webpack)
}
