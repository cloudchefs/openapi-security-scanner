const newmanConverter = require('../newman-converter')
const flatten = require('lodash.flattendeep')

module.exports.generateCollectionFromApi = generateCollectionFromApi
module.exports.generateRequestsFromPaths = generateRequestsFromPaths
module.exports.generateRequestsFromPath = generateRequestsFromPath
module.exports.generateRequestsFromOperations = generateRequestsFromOperations
module.exports.generateRequestsFromOperation = generateRequestsFromOperation
module.exports.generateRequest = generateRequest

function generateCollectionFromApi (api) {
  const paths = api.getPaths()

  return flatten(generateRequestsFromPaths(paths))
}

function generateRequestsFromPaths (paths) {
  return paths.map(generateRequestsFromPath)
}

function generateRequestsFromPath (path) {
  return generateRequestsFromOperations(path.getOperations())
}

function generateRequestsFromOperations (operations) {
  return operations.map(generateRequestsFromOperation)
}

function generateRequestsFromOperation (operation) {
  const api = operation.pathObject.api

  return api.schemes
    .map(scheme => generateRequestsFromOperationByScheme(operation, scheme))
    .reduce((result, requests) => result.concat(requests), [])
}

function generateRequestsFromOperationByScheme (operation, scheme) {
  const api = operation.pathObject.api
  const basePath = api.basePath
  const path = operation.pathObject.path

  const parameters = operation.getParameters()

  const queryParameters = parameters.filter(
    parameter => parameter.in === 'query'
  )

  const request = generateRequest({
    name: `${scheme}://${api.host}${basePath}${path}`,
    protocol: scheme,
    host: api.host.split('.'),
    path: basePath.split('/').concat(newmanConverter.convertPath(path)),
    query: queryParameters.map(newmanConverter.convertQuery),
    method: operation.method.toUpperCase(),
    headers: [],
    contentType: operation.consumes
  })

  return {
    info: {
      name: `Security tests for ${api.host}${api.basePath}`,
      schema:
        'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
    },
    item: request
  }
}

function generateRequest ({
  name,
  protocol,
  host,
  path,
  query,
  method,
  headers,
  contentType
}) {
  return {
    name: name,
    request: {
      method: method,
      header: [
        {
          key: 'Content-Type',
          value: contentType
        }
      ].concat(headers),
      url: {
        protocol: protocol,
        host: host,
        path: path,
        query: query
      }
    },
    response: []
  }
}
