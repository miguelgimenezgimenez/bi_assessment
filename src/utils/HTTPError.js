
const { STATUS_CODES } = require('http');
const uppercamelcase = require('uppercamelcase');

class HTTPError extends Error {
  constructor(code, message) {
    super(message || STATUS_CODES[code]);
    this.name = toName(code);
    this.code = code
  }
}

/**
 * Converts an HTTP status code to an Error `name`.
 * Ex:
 *   302 => "Found"
 *   404 => "NotFoundError"
 *   500 => "InternalServerError"
 */

function toName(code) {
  const suffix = (code / 100 | 0) === 4 || (code / 100 | 0) === 5 ? 'error' : '';
  return uppercamelcase(String(STATUS_CODES[code]).replace(/error$/i, ''), suffix);
}

module.exports = HTTPError