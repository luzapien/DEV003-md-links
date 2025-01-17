#!/usr/bin/env node
const { mdLinks } = require('./index');
const process = require('process');
const colors = require('colors/safe')
const pathToFile = process.argv[2]
const argv = process.argv

function cli() {
  const validate = argv.includes('--validate');
  const stats = argv.includes('--stats');
  const help = argv.includes('--help');

  if (help || argv.includes('--h')) {
    console.log(colors.rainbow('\n======================== HELP =================================='));
    console.log(colors.yellow('Command: ') + ('md-links <path-to-file> [options(--validate)]'));
    console.log(colors.yellow('<Options>: --validate --stats'))
    console.log(colors.red('--validate : ') + colors.cyan('Check and show links (File,URL,Status,Status code,Link text)'));
    console.log(colors.red('--state : ') + colors.cyan('Total and unique links'));
    console.log(colors.green('--validate --state : Total,unique and broken links'));
    console.log(colors.rainbow('======================================================================'));
    process.exit(0);
  }

  mdLinks(pathToFile, { validate: validate }).then((resp) => {

    let uniqueUrlsArray = []
    let brokenUrlsArray = []

    resp.forEach(element => {
      const { file, href, ok, status, text } = element
      let hrefTruncated = href

      if (hrefTruncated.length > 50) {
        hrefTruncated = hrefTruncated.slice(0, 50) + '...'
      }

      const uniqueUrls = resp.filter((obj) => href === obj.href)

      if (uniqueUrls.length === 1) {
        uniqueUrlsArray.push(uniqueUrls[0])
      }

      if (status === 404) {
        brokenUrlsArray.push(element)
      }

      console.log(colors.magenta('\n=========================================================='))
      console.log('File: ', colors.cyan(file))
      console.log('URL: ', colors.blue.underline(href))
      if (validate) {
        console.log('Status: ', colors.yellow(ok))
        console.log('Status Code: ', status)
      }
      console.log('Link Text: ', colors.cyan(text))
      console.log('Validated? ', validate ? colors.green('✅') : colors.red('❌'))
      console.log(colors.magenta('============================================================'))
    })

    if (stats) {
      console.log(colors.rainbow('\nTotal: ' + resp.length))
      console.log(colors.rainbow('Unique: ' + uniqueUrlsArray.length))
      if (validate) {
        console.log(colors.red('Broken: ' + brokenUrlsArray.length))
      }
    }
    process.exit(0);
  })
    .catch((error) => {
      console.log(error)
    });
    
}
cli()
