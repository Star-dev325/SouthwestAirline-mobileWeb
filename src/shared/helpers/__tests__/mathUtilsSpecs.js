import { permutations } from 'src/shared/helpers/mathUtils';

describe('Math Utils', () => {
  describe('permutations', () => {
    it('should get all combinations for array', () => {
      expect(permutations(['adult'], ['outbound'])).to.deep.equal([['adult', 'outbound']]);
      expect(permutations(['adult'], ['outbound', 'inbound'])).to.deep.equal([
        ['adult', 'outbound'],
        ['adult', 'inbound']
      ]);
      expect(permutations(['adult', 'robot'], ['outbound', 'inbound'])).to.deep.equal([
        ['adult', 'outbound'],
        ['adult', 'inbound'],
        ['robot', 'outbound'],
        ['robot', 'inbound']
      ]);
    });
  });
});
