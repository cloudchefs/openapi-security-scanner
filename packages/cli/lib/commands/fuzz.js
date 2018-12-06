const requestGenerator = require('@openapi-security-scanner/request-generator')

module.exports = async ({apiDefinition}) => {
    const requests = await requestGenerator(apiDefinition)

    console.log(requests);
    // implement newman scanner
}