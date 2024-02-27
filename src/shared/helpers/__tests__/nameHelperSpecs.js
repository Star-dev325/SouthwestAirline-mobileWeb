import { toTitleCase } from 'src/shared/helpers/nameHelper';

describe('NameHelper', () => {
  context('toTitleCase', () => {
    it('should title case first and last name ', () => {
      expect(toTitleCase('BLACK DYNAMITE')).to.equal('Black Dynamite');
      expect(toTitleCase('napoleon dynamite')).to.equal('Napoleon Dynamite');
      expect(toTitleCase('MR dynamite')).to.equal('Mr Dynamite');
    });

    it('should not capitals in names after first letter', () => {
      expect(toTitleCase('McDonald leRoy')).to.equal('Mcdonald Leroy');
    });
  });
});
