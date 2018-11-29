module.exports = path => {
  return path
    .replace(/\{(.+?)\}/g, function(m, parameter) {
      return `{{${parameter}}}`;
    })
    .split("/");
};
