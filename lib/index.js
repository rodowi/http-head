var http = require('http')
var https = require('https')
var sanitize = (uri) => uri.replace(/"/g, '')

/**
 * Grab the headers of remote resource without downloading the resource
 * @param {string} uri to check
 * @param {function} done callback returning HTTP headers
 */
module.exports = function (uri, done) {
  uri = sanitize(uri)
  var protocol = uri.startsWith('https') ? https : http
  var req = protocol.get(sanitize(uri), (res) => {
    var headers = res.headers
    req.abort()
    res.on('data', (chunk) => console.log('you will not see this'))
    res.on('end', () => done(null, headers))
  }).on('error', (e) => done(Object.assign(e, { uri })))
}
