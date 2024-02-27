import { sandbox } from 'sinon';

import * as ChasePrequalHelper from 'src/shared/helpers/chasePrequalHelper';

const sinon = sandbox.create();

describe('ChasePrequalHelper', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('toChaseCodes', () => {
    it('should return with one acquisitionSourceCode', () => {
      const offers = [{ acquisitionSourceCode: 'one' }];
      const offerIdentifier = 'offer-identifier';
      const highValueIndicator = 'false';

      const response = { highValueIndicator, offers, offerIdentifier };

      const result = ChasePrequalHelper.toChaseCodes(response);

      expect(result).to.deep.equal({
        acquisitionSourceCodes: 'one',
        highValueIndicator,
        offerIdentifier
      });
    });

    it('should return with multiple acquisitionSourceCodes', () => {
      const offers = [
        { acquisitionSourceCode: 'one' },
        { acquisitionSourceCode: 'two' },
        { acquisitionSourceCode: 'three' }
      ];
      const offerIdentifier = 'offer-identifier';
      const highValueIndicator = 'false';

      const response = { highValueIndicator, offers, offerIdentifier };

      const result = ChasePrequalHelper.toChaseCodes(response);

      expect(result).to.deep.equal({
        acquisitionSourceCodes: 'one,two,three',
        highValueIndicator,
        offerIdentifier
      });
    });

    it('should return with no acquisitionSourceCodes', () => {
      const offers = [{ acquisitionSourceCode: '' }];
      const offerIdentifier = 'offer-identifier';
      const highValueIndicator = 'false';

      const response = { highValueIndicator, offers, offerIdentifier };

      const result = ChasePrequalHelper.toChaseCodes(response);

      expect(result).to.deep.equal({
        acquisitionSourceCodes: '',
        highValueIndicator,
        offerIdentifier
      });
    });

    it('should handle empty offers', () => {
      const offers = undefined;
      const offerIdentifier = undefined;
      const highValueIndicator = undefined;

      const response = { offers, offerIdentifier, highValueIndicator };

      const result = ChasePrequalHelper.toChaseCodes(response);

      expect(result).to.deep.equal({
        acquisitionSourceCodes: '',
        offerIdentifier: '',
        highValueIndicator: ''
      });
    });
  });
});
