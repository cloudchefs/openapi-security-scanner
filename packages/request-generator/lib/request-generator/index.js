const newmanConverter = require('../newman-converter')
const dataGenerator = require('../data-generator')
const flatten = require('lodash.flattendeep')

module.exports.generateCollectionFromApi = generateCollectionFromApi
module.exports.generateCollectionFromPaths = generateCollectionFromPaths
module.exports.generateCollectionFromPath = generateCollectionFromPath
module.exports.generateCollectionFromOperations = generateCollectionFromOperations
module.exports.generateCollectionFromOperation = generateCollectionFromOperation
module.exports.generateRequest = generateRequest

function generateCollectionFromApi(api) {
    const paths = api.getPaths()

    return flatten(generateCollectionFromPaths(paths))
}

function generateCollectionFromPaths(paths) {
    return paths.map(generateCollectionFromPath)
}

function generateCollectionFromPath(path) {
    return generateCollectionFromOperations(path.getOperations())
}

function generateCollectionFromOperations(operations) {
    return operations.map(generateCollectionFromOperation)
}

function generateCollectionFromOperation(operation) {
    const api = operation.pathObject.api

    return api.schemes
        .map(scheme => generateCollectionFromOperationByScheme(operation, scheme))
        .reduce((result, requests) => result.concat(requests), [])
}

function generateCollectionFromOperationByScheme(operation, scheme) {
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
        collection: {
            info: {
                name: `Fuzz request for ${api.host}${api.basePath}${path}`,
                schema:
                    'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
            },
            item: request
        },
        data: dataGenerator.generateData(parameters)
    }
}

function generateRequest(options) {
    return {
        name: options.name,
        request: {
            method: options.method,
            header: [
                {
                    key: 'Content-Type',
                    value: options.contentType
                }
            ].concat(options.headers),
            url: {
                protocol: options.protocol,
                host: options.host,
                path: path,
                query: options.query
            }
        },
        response: []
    }
}
