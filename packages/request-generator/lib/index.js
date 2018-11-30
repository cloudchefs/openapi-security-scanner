const sway = require('sway')
const requestGenerator = require('./request-generator')
const dataGenerator = require('./data-generator')

module.exports = async apiDefinition => {
  const api = await sway.create({ definition: apiDefinition })

  return {
    requests: requestGenerator.generateCollectionFromApi(api),
    data: dataGenerator.generateData(api)
  }
}
