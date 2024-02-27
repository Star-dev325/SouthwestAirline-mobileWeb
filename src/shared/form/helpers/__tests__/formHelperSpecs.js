import { getMaskProps } from 'src/shared/form/helpers/formHelper';

describe('FormHelper', () => {
  context('getMaskProps', () => {
    it('should return correct mask based on input', () => {
      const firstMask = getMaskProps({ rule: '*', maskChar: '*', repeat: 4 });

      expect(firstMask.mask).to.equal('****');

      const secondMask = getMaskProps({ rule: 'W', maskChar: '*', repeat: 10 });

      expect(secondMask.mask).to.equal('WWWWWWWWWW');
    });

    it('should assign & mask character if passed in', () => {
      const mask = getMaskProps({ rule: '*', maskChar: '&', repeat: 4 });

      expect(mask.maskChar).to.equal('&');
    });

    it('should assign null mask character if nothing is passed in', () => {
      const mask = getMaskProps({ rule: '*', repeat: 4 });

      expect(mask.maskChar).to.equal(null);
    });

    it('should return correct length of mask based on repeat key', () => {
      const mask = getMaskProps({ rule: '*', maskChar: '*', repeat: 4 });

      expect(mask.mask).to.have.length(4);
      expect(mask.maxLength).to.equal(4);
    });

    it("should return default mask length of 1 if repeat key isn't provided", () => {
      const mask = getMaskProps({ rule: '*', maskChar: '*' });

      expect(mask.mask).to.have.length(1);
      expect(mask.maxLength).to.equal(1);
    });

    it('should return correct mask obj when called with a string', () => {
      const mask = getMaskProps('1');

      expect(mask).to.deep.equal({
        mask: '1',
        maskChar: null,
        maxLength: 1
      });
    });
  });
});
