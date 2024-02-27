import { getPageHeaderSubtitle } from 'src/airChange/selectors/airChangeConfirmationPageSelectors';
import BoundDetailBuilder from 'test/builders/model/boundDetailBuilder';

describe('airChangeConfirmationSelectors', () => {
  context('getPageHeaderSubtitle', () => {
    it('should return proper page header subtitle when it is one way flight', () => {
      expect(getPageHeaderSubtitle([new BoundDetailBuilder().build()])).to.equal('DAL - ATL');
    });

    it('should return proper page header subtitle when it is round trip flight', () => {
      expect(getPageHeaderSubtitle([new BoundDetailBuilder().build(), new BoundDetailBuilder().build()])).to.equal(
        'DAL - ATL (Round Trip)'
      );
    });
  });
});
