function pathname({ wrapper, arg1 }) {
  const actual = wrapper.prop('history').location.pathname;

  this.assert(
    actual === arg1,
    () => `expected page to have pathname ${arg1}, but it has ${actual}`,
    () => `expected page to not have pathname ${arg1}, but it has ${actual}`,
    arg1,
    actual
  );
}

export default function pathnameAssertion(chai, utils) {
  const { Assertion } = chai;

  Assertion.addMethod('pathname', function(arg1) {
    const element = utils.flag(this, 'object');

    pathname.call(this, {
      wrapper: element,
      arg1
    });
  });
}