const portscanner = require('portscanner');

function findAPortNotInUse(options) {
  options = options || {};

  return new Promise((resolve, reject) => {
    portscanner.findAPortNotInUse(options.portStart || 1000, options.portEnd || 60000, '127.0.0.1', (err, port) =>
      (err ? reject(err) : resolve(port))
    );
  });
}

module.exports = findAPortNotInUse;
