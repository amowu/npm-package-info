import * as fs from 'fs'

import 'babel-polyfill' // Support async and await function
import fetch from 'node-fetch'
/**
 * npm dependencies parser
 * @param {string} name
 * @param {{listUrl: boolean}} options
 * @return {Promise.<{{name: string, description: string}}[], Error>}
 */
const DEFAULT_PACKAGE_FILE = 'package.json'

module.exports = async function (name, options) {
  let packageJSON
  if (!name || name.endsWith('.json')) {
    packageJSON = await fetchLocalJSON(name || DEFAULT_PACKAGE_FILE)
  } else {
    // packageJSON should be { name: 'express', dependencies: { 'accepts': 'x.x.x', ... }, ... }
    packageJSON = await fetchJSON(`https://registry.npmjs.org/${name}/latest`)
  }
  try {
    // example: if you typing `$ wtd npm express --list-url`
    // listUrl should be true
    const { listUrl } = options
    // packageJSON should be { name: 'express', dependencies: { 'accepts': 'x.x.x', ... }, ... }
    // const packageJSON = await fetchJSON(`https://registry.npmjs.org/${name}/latest`)
    // dependencies is { 'accepts': 'x.x.x', ... }
    const { dependencies } = packageJSON
    // fetchList should be a Promise array like [fetchJSON(...), fetchJSON(...), ...]
    const fetchList = Object.keys(dependencies).map(dependency => {
      const version = dependencies[dependency]
      return fetchJSON(`https://registry.npmjs.org/${dependency}/${version}`)
    })
    // Use Promise.all to fetch every dependencies info
    // and resultList shoule be dependencies info array [{ name, description, version, author, ...}, {...}, ...]
    const resultList = await Promise.all(fetchList)
    // finally, only return dependencies field that you need,
    // like [{ name, description }, {...}, ...],
    // or [{ name, description, url }, {...}, ...] with --list-url
    return resultList.map(result => {
      const { name, description, repository: { url } } = result
      return listUrl ? { name, description, url } : { name, description }
    })
  } catch (e) {
    console.log(e)
  }
}

function fetchJSON (url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(json => resolve(json))
  })
}

function fetchLocalJSON (name) {
  return new Promise((resolve, reject) => {
    fs.readFile(name, (err, data) => {
      if (err) reject('❌ ERROR: package name is required')
      else resolve(JSON.parse(data))
    })
  })
}
