/**
 * npm dependencies parser
 * @param  {string} name Package name
 * @param  {Object} options
 * @param  {boolean} options.listUrl Whether show repo URL
 * @return {string} Dependencies info
 */
module.exports = function (name, options) {
  return `
  accepts - Higher-level content negotiation
  array-flatten - Flatten nested arrays
  content-disposition - Create and parse Content-Disposition header
  content-type - Create and parse HTTP Content-Type header
  cookie - HTTP server cookie parsing and serialization
  cookie-signature - Sign and unsign cookies
  debug - small debugging utility
  depd - Deprecate all the things
  encodeurl - Encode a URL to a percent-encoded form, excluding already-encoded sequences
  escape-html - Escape string for use in HTML
  etag - Create simple ETags
  finalhandler - Node.js final http responder
  fresh - HTTP response freshness testing
  merge-descriptors - Merge objects using descriptors
  methods - HTTP methods that node supports
  on-finished - Execute a callback when a request closes, finishes, or errors
  parseurl - parse a url with memoization
  path-to-regexp - Express style path to RegExp utility
  proxy-addr - Determine address of proxied request
  qs - A querystring parser that supports nesting and arrays, with a depth limit
  range-parser - Range header field string parser
  send - Better streaming static file server with Range and conditional-GET support
  serve-static - Serve static files
  type-is - Infer the content-type of a request.
  utils-merge - merge() utility function
  vary - Manipulate the HTTP Vary header
  `
}
