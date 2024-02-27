module.exports = function(assert, done) {
  try {
    assert();
    done();
  } catch (error) {
    done(error);
  }
};
