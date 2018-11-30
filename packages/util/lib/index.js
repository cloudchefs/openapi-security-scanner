module.exports.getPathId = getPathId

function getPathId (path) {
  return Buffer.from(path).toString('base64')
}
