module.exports.command = function(selector) {
  const client = this;
  const params = [selector];

  // eslint-disable-next-line prefer-arrow-callback
  client.execute(function(selector) {
    document.querySelectorAll(selector)[0].scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, params);

  return this;
};
