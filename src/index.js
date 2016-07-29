import meow from 'meow'
import shell from 'shelljs'

const cli = meow(`
  Usage
    $ wtd <name>[@<version>]

  Options
    --list-url, -u  List dependencies URL

  Examples
    $ wtd express
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

const [ name ] = cli.input
const { listUrl } = cli.flags

if (!name) {
  console.log(`
    ❌ ERROR: package name is required,

    Examples
      $ wtd express

    See more
      $ wtd --help
  `)
} else {
  shell.exec(`./wtd.sh ${name}`);
}
