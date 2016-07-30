import meow from 'meow'

const cli = meow(`
  Usage
    $ wtd <manager> <package_name>[@<version>]

  Options
    --list-url, -u  List dependencies URL

  Examples
    $ wtd npm express
    accepts - Higher-level content negotiation
    array-flatten - Flatten nested arrays
    content-disposition - Create and parse Content-Disposition header
    content-type - Create and parse HTTP Content-Type header
    cookie - HTTP server cookie parsing and serialization
    ...
`, {
  alias: {
    u: 'list-url'
  }
})

const { listUrl } = cli.flags
const [ manager, packageName ] = cli.input

if (!manager) {
  console.log('❌ ERROR: package manager is required')
  cli.showHelp()
} else if (!packageName) {
  console.log('❌ ERROR: package name is required')
  cli.showHelp()
} else {
  try {
    const parser = require(`./lib/parser/${manager}`)
    const result = parser(packageName, { listUrl })

    // Parser return format should be a JSON array like [{...}, ...]
    result.then(jsonAry => {
      jsonAry.map(json => {
        // Print all JSON object properties,
        // if JSON is { name, description }, CLI should show 'name - description'
        // or JSON is { name, description, url }, CLI show 'name - description'
        const valueAry = Object.keys(json).map(key => {
          return json[key]
        })
        const str = valueAry.join(' - ')
        console.log(str)
      })
    })
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.log('❌ ERROR: package manager is not found')
    } else {
      throw e
    }
  }
}
