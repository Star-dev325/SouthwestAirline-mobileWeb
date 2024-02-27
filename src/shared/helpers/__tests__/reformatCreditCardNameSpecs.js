import reformatCreditCardName from 'src/shared/helpers/reformatCreditCardName';

describe('reformatCreditCardName', () => {
  context('with middle name', () => {
    it('should merge multi space to single space', () => {
      expect(reformatCreditCardName('fName   mName lName')).to.deep.equal('fName mName lName');
    });

    it('should return the origin string when there is only single space', () => {
      expect(reformatCreditCardName('fName mName lName')).to.deep.equal('fName mName lName');
    });
  });

  context('without middle name', () => {
    it('should merge multi space to single space', () => {
      expect(reformatCreditCardName('fName    lName')).to.deep.equal('fName lName');
    });

    it('should return the origin string when there is only single space', () => {
      expect(reformatCreditCardName('fName lName')).to.deep.equal('fName lName');
    });
  });
});
