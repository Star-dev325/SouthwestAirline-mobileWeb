module.exports.command = function(selector, size) {
  const client = this;

  client.elements('css selector', selector, (result) => {
    client.assert.equal(result.value.length, size);
  });

  return this;
};
