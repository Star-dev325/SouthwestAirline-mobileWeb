const _ = require('lodash');

function Builder(Model) {
  this.data = {};
  this.model = Model;
  this.dataKeys = [];

  return this._init();
}

Builder.prototype._init = function() {
  try {
    this.dataKeys = _.keys(new this.model(this.data));
  } catch (e) {
    throw new Error('must have a Model when new a Builder');
  }

  _.forEach(this.dataKeys, (key) => {
    this[_.camelCase(`with-${key}`)] = this.set.bind(this, key);
  });

  return this;
};

Builder.prototype.defaults = function(data) {
  this.data = _.pick(data, this.dataKeys);

  return this;
};

Builder.prototype.set = function(key, value) {
  if (_.includes(this.dataKeys, key)) {
    this.data[key] = value;
  }

  return this;
};

Builder.prototype.with = Builder.prototype.set;

Builder.prototype.build = function() {
  return new this.model(this.data);
};

module.exports = Builder;
