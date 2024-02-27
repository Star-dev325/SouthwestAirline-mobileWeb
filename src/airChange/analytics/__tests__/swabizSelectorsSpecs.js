import { getSwabiz } from 'src/airChange/analytics/swabizSelectors';

describe('swabizSelectors', () => {
  context('getSwabiz', () => {
    it('should generate swabiz data', () => {
      const state = {
        app: {
          airChange: {
            changeFlightPage: {
              response: {
                _meta: {
                  isSwabiz: false
                }
              }
            }
          }
        }
      };

      expect(getSwabiz(state)).to.be.deep.equal({ isSwabiz: false });
    });
  });
});
