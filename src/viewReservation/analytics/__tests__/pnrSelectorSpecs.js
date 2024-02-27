import { getPnr } from 'src/viewReservation/analytics/pnrSelector';

describe('detailsSelector', () => {
  context('getPnr', () => {
    it('should generate the pnr', () => {
      const state = {
        app: {
          viewReservation: {
            searchRequest: {
              recordLocator: 'ABC123'
            }
          }
        }
      };

      expect(getPnr(state)).to.deep.equal({ pnr: 'ABC123' });
    });
  });
});
