import { someExecute } from 'src/shared/helpers/functionHelper';

describe('functionHelper', () => {
  describe('someExecute', () => {
    it('should return undefined if none of the functions return', () => {
      const functionArray = [() => {}, () => {}];

      const result = someExecute(functionArray)('context');

      expect(result).toBeUndefined;
    });

    it('should return on the first function to return a result', () => {
      const functionArray = [() => {}, () => 'value', () => 'secondvalue'];

      const result = someExecute(functionArray)('context');

      expect(result).toEqual('value');
    });
  });
});
