const fs = require('fs');

function getAllEnvironments() {
  return fs.readdirSync('./config').map(trimJsFileExtension);
}

function trimJsFileExtension(filename) {
  return filename.replace(/.js/, '');
}

module.exports = getAllEnvironments;
