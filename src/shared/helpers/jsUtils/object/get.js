const delimiterRe = /\.|\[/;
const stripRightBracket = (path) => path.replace(/\]/g, '');
const _generateTokens = (path = '') => (Array.isArray(path) ? path : stripRightBracket(path).split(delimiterRe));

export const get = (obj, path, def) =>
  _generateTokens(path).reduce((current, subPath) => current?.[subPath], obj) ?? def;