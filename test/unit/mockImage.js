const _ = require('lodash');

class Image {
  constructor() {
    this.onload = _.noop;
    this.onerror = _.noop;
    this.src = '';
  }
}

class InValidImage extends Image {
  set src(value) {
    this.onerror(value);
  }
}

class ValidImage extends Image {
  set src(value) {
    this.onload(value);
  }
}

class TimeOutImage extends Image {
  set src(value) {
    if (value === '') {
      this.onerror(value);
    }
  }
}

module.exports = {
  InValidImage,
  ValidImage,
  TimeOutImage
};
