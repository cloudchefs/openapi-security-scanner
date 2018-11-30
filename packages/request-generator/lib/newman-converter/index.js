module.exports.convertPath = convertPath
module.exports.convertQuery = convertQuery

function convertPath (path) {
  return path
    .replace(/\{(.+?)\}/g, function (m, parameter) {
      return `{{${parameter}}}`
    })
    .split('/')
}

function convertQuery (parameter) {
  return {
    key: parameter.name,
    value: `{{${parameter.name}}}`
  }
}
