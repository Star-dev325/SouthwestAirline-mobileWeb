const server = require('./server');

module.exports = () => ({
  options: {
    server: server().options.server
  }
});
