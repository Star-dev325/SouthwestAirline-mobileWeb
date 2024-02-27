'use strict';

function injectAdobeAnalyticsMiddleware() {
  const styleSheetNode = `<link rel="stylesheet" type="text/css" href="/css/index`;
  const analyticsMockScript = `<script type="text/javascript" src="/adobeAnalyticsMock.js"></script>`;

  return (req, res, next) => {
    const isIndexHTML = req.url.includes('index.html');

    if (isIndexHTML) {
      const _write = res.write;

      res.write = function (chunk, encoding) {
        let injectedChunkData;

        const decodedChunkData = chunk instanceof Buffer ? chunk.toString(encoding) : chunk;
        const styleSheetIndex = decodedChunkData.indexOf(styleSheetNode);

        if (styleSheetIndex >= 0) {
          const injectedData = `${decodedChunkData.slice(
            0,
            styleSheetIndex
          )} ${analyticsMockScript} ${decodedChunkData.slice(styleSheetIndex)}`;

          injectedChunkData = new Buffer(injectedData);
        } else {
          injectedChunkData = chunk;
        }

        return _write.call(this, injectedChunkData, encoding);
      };
    }

    next();
  };
}

module.exports = injectAdobeAnalyticsMiddleware;
