const sway = require('sway')
const requestGenerator = require('./request-generator')

module.exports = async apiDefinition => {
  const api = await sway.create({ definition: apiDefinition })

  return requestGenerator.generateCollectionFromApi(api)
}
