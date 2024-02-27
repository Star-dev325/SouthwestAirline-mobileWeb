const _ = require('lodash');
const path = require('path');

const ROOT_FOLDER_NAME = path.basename(process.cwd());

function clearRequireCacheOfMocks() {
  const cachedModules = Object.keys(require.cache);
  const myArray = _.filter(cachedModules, (module) => {
    const srcFolderRegex = RegExp(`${ROOT_FOLDER_NAME}/mocks/`);

    return srcFolderRegex.test(module);
  });

  myArray.forEach((module) => {
    delete require.cache[module];
  });
}

module.exports = clearRequireCacheOfMocks;
