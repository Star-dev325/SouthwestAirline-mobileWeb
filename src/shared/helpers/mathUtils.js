function BaseX(initRadix) {
  this.radix = initRadix ? initRadix : 1;
  this.value = 0;
  this.increment = function () {
    return (this.value = (this.value + 1) % this.radix) === 0;
  };
}

export const permutations = function (...input) {
  const output = [];
  const counters = [];
  let remainder = false;

  for (let i = input.length - 1; i >= 0; i--) {
    counters.unshift(new BaseX(input[i].length));
  }

  while (!remainder) {
    const temp = [];

    remainder = true;

    for (let i = input.length - 1; i >= 0; i--) {
      temp.unshift(input[i][counters[i].value]);

      if (remainder) {
        remainder = counters[i].increment();
      }
    }
    output.push(temp);
  }

  return output;
};
