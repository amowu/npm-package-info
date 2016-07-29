import 'babel-polyfill' // Support async and await function
import fetch from 'node-fetch'

/**
 * npm dependencies parser
 * @param {string} name
 * @param {{listUrl: string}} options
 * @return {Promise.<{{name: string, description: string}}[], Error>}
 */
module.exports = async function (name, options) {
  try {
    // example: $ wtd npm express
    const packageJSON = await fetchJSON(`https://registry.npmjs.org/${name}/latest`)
    // packageJSON = { name: 'express', dependencies: { 'accepts': 'x.x.x', ... }, ... }
    const { dependencies } = packageJSON
    // dependencies = { 'accepts': 'x.x.x', ... }
    const fetchList = Object.keys(dependencies).map(dependency => {
      const version = dependencies[dependency]
      return fetchJSON(`https://registry.npmjs.org/${dependency}/${version}`)
    })
    // fetchList = [fetchJSON(...), fetchJSON(...), ...]
    const resultList = await Promise.all(fetchList)
    // resultList = [{ name, description, version, author, ...}, {...}, ...]
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
