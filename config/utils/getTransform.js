const path = require('path')
const chalk = require('chalk')
const paths = require('../paths')

module.exports = function getTransform (type) {
  const location = null

  // If transform not set for this type, just return a noop
  if (!location) {
    return (config) => config
  }

  const transformPath = path.resolve(paths.appBase)
  let transform

  try {
    transform = require(transformPath)
  } catch (e) {
    console.error(chalk.red(`Unable to load transform '${type}':`))
    console.error(e)
    process.exit(1)
  }

  return (config) => {
    const transformedConfig = transform(config)

    if (!transformedConfig) {
      console.error(chalk.red(`Transform '${type}' did not return a config object`))
      process.exit(1)
    }

    return transformedConfig
  }
}
