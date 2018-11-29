const fuzzers = require('@openapi-security-scanner/fuzzers')
const util = require('@openapi-security-scanner/util')
const flatten = require('lodash.flattendeep')

exports.generateData = generateData

function generateData(api) {
    const paths = api.getPaths()

    const parameterSets = paths
        .reduce((result, path) => result.concat(path.getOperations()), [])
        .map((operation) => ({operation, parameters: operation.getParameters()}))

    return parameterSets
        .map(({operation, parameters}) => {
            const path = operation.pathObject.path
            const pathId = util.getPathId(path)

            const defaultValues = parameters
                .reduce((result, parameter) => {
                    result[`${pathId}.${parameter.name}`] = parameter.getSample()

                    return result
                }, {})

            return flatten(parameters.map((parameter) => {
                const fuzzList = fuzzers["004-SQL-INJ:SQL Injection"]
                    .map((fuzz) => {
                        const result = Object.assign({}, defaultValues)
                        result[`${pathId}.${parameter.name}`] = fuzz

                        return result
                    })

                return fuzzList
            }))
        })
}