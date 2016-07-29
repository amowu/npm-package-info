import meow from 'meow'

const cli = meow(`
  Usage
    $ wtd <manager> <name>[@<version>]

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

const [ manager, name ] = cli.input
const { listUrl } = cli.flags

if (!manager) {
  console.log('❌ ERROR: package manager is required')
} else if (!name) {
  console.log('❌ ERROR: package name is required')
} else {
  const parser = require(`./lib/parser/${manager}`)
  const result = parser(name, { listUrl })

  console.log(result)
}
