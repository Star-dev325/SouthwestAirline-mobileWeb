import _ from 'lodash';

function search({ wrapper, arg1 }) {
  const { search } = wrapper.prop('history').location;
  const actual = _.startsWith(search, '?') ? search.slice(1) : search;

  this.assert(
    actual === arg1,
    () => `expected page to have search ${arg1}, but it has ${actual}`,
    () => `expected page to not have search ${arg1}, but it has ${actual}`,
    arg1,
    actual
  );
}

export default function searchAssertion(chai, utils) {
  const { Assertion } = chai;

  Assertion.addMethod('search', function(arg1) {
    const element = utils.flag(this, 'object');

    search.call(this, {
      wrapper: element,
      arg1
    });
  });
}