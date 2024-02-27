./bin/es6/node_modules/.bin/jscodeshift -t ./bin/es6/node_modules/5to6-codemod/transforms/cjs.js $1
./bin/es6/node_modules/.bin/jscodeshift -t ./bin/es6/node_modules/5to6-codemod/transforms/simple-arrow.js $1
./bin/es6/node_modules/.bin/jscodeshift -t ./bin/es6/node_modules/js-codemod/transforms/arrow-function.js $1
