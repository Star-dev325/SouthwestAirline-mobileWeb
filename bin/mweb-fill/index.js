const Fill = require('./lib/fill');
const forms = require('./forms/index.js');
let formObject = {};

Object.keys(forms).forEach(function (key) {
  formObject = Object.assign(formObject, forms[key]);
});

let formsShouldFill = {};

Object.keys(formObject).forEach(function (key) {
  if (Fill.matchPath(key)) {
    formsShouldFill = formObject[key];
  }
});

formsShouldFill.forEach(function (field) {
  Fill.fillField(field);
});
