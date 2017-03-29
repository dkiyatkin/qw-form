import 'babel-polyfill'
import Promise from 'bluebird'

// глобальный Promise bluebird
window.Promise = Promise

require('./render')
