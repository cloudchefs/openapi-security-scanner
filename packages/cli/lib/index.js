const program = require('commander')
const jsonParser = require('json-schema-ref-parser')
const path = require('path')
const chalk = require('chalk')
const commands = require('./commands')
const packageJson = require('../package.json')

module.exports = cli

async function cli(argv) {
    const handleError = (error) => {
        console.log(chalk.red(error.message))
        process.exit(1)
    }

    program
        .version(packageJson.version)
        .description(packageJson.description)

    program
        .command('fuzz <open_api_file>')
        .description('Fuzz your API using an OpenAPI definition\n')
        .action(async (openApiFile) => {
            const apiDefinition = await jsonParser.dereference(openApiFile)

            return commands.fuzz({
                apiDefinition: apiDefinition
            }).catch(handleError)
        })

    program
        .parse(argv)

    if (program.args.length === 0) {
        program.help()
    }
}
