const fuzzers = require('@openapi-security-scanner/fuzzers')
const flatten = require('lodash.flattendeep')

exports.generateData = generateData

function generateData (parameters) {
  return flatten(
    parameters.map(parameter => generateDataByParameter(parameter, parameters))
  )
}

function generateDataByParameter (parameter, parameters) {
  const defaultValues = parameters.reduce((result, parameter) => {
    result[`${parameter.name}`] = parameter.getSample()

    return result
  }, {})

  return Object
    .keys(fuzzers)
    .map((category) => {
      const payloads = fuzzers[category]

      return payloads.map(payload => {
        const result = Object.assign({}, defaultValues)

        result[`${parameter.name}`] = payload

        return result
      })
    })
}
