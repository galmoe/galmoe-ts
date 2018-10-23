const MD5 = require('md5.js')
// import * as MD5 from 'md5.js'
const SUFFIX = 'THIS IS MD5 SUFFIX'

export function md5SUFFIX(val: number | string): string {
  return new MD5().update(val + SUFFIX).digest('hex')
}
