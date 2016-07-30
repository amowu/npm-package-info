import 'babel-polyfill' // Support async and await function
import fetch from 'node-fetch'

/**
 * npm dependencies parser
 * @param {string} name
 * @param {{listUrl: boolean}} options
 * @return {Promise.<{{name: string, description: string}}[], Error>}
 */
module.exports = async function (name, options) {
  try {
    // example: if you typing `$ wtd npm express --list-url`
    // listUrl should be true
    const { listUrl } = options
    // packageJSON should be { name: 'express', dependencies: { 'accepts': 'x.x.x', ... }, ... }
    const packageJSON = await fetchJSON(`https://registry.npmjs.org/${name}/latest`)
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
    return resultList.map(result => {
      // only return you need, [{ name, description}, {...}, ...]
      const { name, description } = result
      return {
        name,
        description
      }
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
