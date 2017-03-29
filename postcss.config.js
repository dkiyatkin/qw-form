const _ = require('lodash')
const bootstrapPostcssConfig = require('bootstrap/grunt/postcss')

const postcssConfig = _.cloneDeep(bootstrapPostcssConfig)
postcssConfig.autoprefixer.remove = false

module.exports = postcssConfig
