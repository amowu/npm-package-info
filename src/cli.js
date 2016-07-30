import meow from 'meow'
import loadManger from './lib/utils/load-manager'

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
} else {
  loadManger(manager).then(parser => {
    // Parser return format should be a JSON array like [{...}, ...]
    parser(packageName, { listUrl }).then(jsonAry => {
      jsonAry.map(json => {
        // Print all JSON object properties,
        // if JSON is { name, description }, CLI should show 'name - description'
        // or JSON is { name, description, url }, CLI show 'name - description- url'
        const valueAry = Object.keys(json).map(key => {
          return json[key]
        })
        const str = valueAry.join(' - ')
        console.log(str)
      })
    }, reason => {
      console.log(reason)
      cli.showHelp()
    })
  }, reason => {
    console.log(reason)
    cli.showHelp()
  })
}
