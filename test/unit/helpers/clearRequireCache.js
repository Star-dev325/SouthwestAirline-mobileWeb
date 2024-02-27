const _ = require('lodash');
const path = require('path');

const ROOT_FOLDER_NAME = path.basename(process.cwd());

function clearRequireCache() {
  const cachedModules = Object.keys(require.cache);
  const modulesToDelete = _.filter(cachedModules, (module) => {
    const srcFolderRegex = RegExp(`${ROOT_FOLDER_NAME}/src/`);
    const tempSrcFolderRegex = RegExp(`${ROOT_FOLDER_NAME}/.temp/src/`);
    const createReduxStoreFilePath = 'src/shared/redux/createStore';

    return (srcFolderRegex.test(module) || tempSrcFolderRegex.test(module)) && !module.includes(createReduxStoreFilePath);
  });

  modulesToDelete.forEach((module) => {
    delete require.cache[module];
  });
}

module.exports = clearRequireCache;
