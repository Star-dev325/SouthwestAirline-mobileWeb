import { flowRight } from 'src/shared/helpers/jsUtils';

describe('flowRight', () => {
  const funcA = (val) => val.toString().concat('a');
  const funcB = (val) => val.toString().concat('b');

  it('should return the initial value if no functions are provided', () => {
    expect(flowRight()('c')).toEqual('c');
  });

  it('should apply a single funtion', () => {
    expect(flowRight(funcA)('c')).toEqual('ca');
  });

  it('should apply multiple functions in reverse order', () => {
    expect(flowRight(funcA, funcB)('c')).toEqual('cba');
  });
});