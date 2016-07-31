import 'babel-polyfill' // Support async and await function

export default function loadManager (manager) {
  return new Promise((resolve, reject) => {
    try {
      resolve(require(`../parser/${manager}`))
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        reject('❌ ERROR: package manager is not found')
      } else {
        reject(e)
      }
    }
  })
}
