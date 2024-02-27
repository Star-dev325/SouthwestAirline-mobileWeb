import * as AdobeHelper from 'src/shared/helpers/adobeHelper';

describe('Adobe Helper', () => {
  context('toAdobeParams', () => {
    const chaseOfferCodes = {
      offerIdentifier: 'identifier',
      acquisitionSourceCodes: 'aqsc'
    };
    let userInfo = {
      customers: {
        UserInformation: {
          redeemablePoints: 1000,
          companionPassInfo: {
            companionRemainingPoints: 1250
          }
        }
      }
    };

    it('should return formatted Target params with normal offers and user info', () => {
      const expectedParams = {
        offerIdentifier: 'identifier',
        acquisitionSourceCodes: 'aqsc',
        redeemablePoints: 1000,
        companionRemainingPoints: 1250,
        chaseVisaRrEnrolled: false
      };

      const result = AdobeHelper.toAdobeParams(chaseOfferCodes, userInfo, undefined, false);

      expect(result).to.deep.equal(expectedParams);
    });

    it('should return formatted Target params with early bird', () => {
      const expectedParams = {
        offerIdentifier: 'identifier',
        acquisitionSourceCodes: 'aqsc',
        earlyBirdEligible: true,
        earlyBirdSelected: false,
        redeemablePoints: 1000,
        companionRemainingPoints: 1250,
        chaseVisaRrEnrolled: false
      };
      const earlyBird = {
        earlyBirdEligible: true,
        earlyBirdSelected: false
      };

      const result = AdobeHelper.toAdobeParams(chaseOfferCodes, userInfo, earlyBird);

      expect(result).to.deep.equal(expectedParams);
    });

    it('should return formatted Target params with chaseVisaRrEnrolled data', () => {
      const expectedParams = {
        offerIdentifier: 'identifier',
        acquisitionSourceCodes: 'aqsc',
        earlyBirdEligible: true,
        earlyBirdSelected: false,
        redeemablePoints: 1000,
        companionRemainingPoints: 1250,
        chaseVisaRrEnrolled: true
      };
      const earlyBird = {
        earlyBirdEligible: true,
        earlyBirdSelected: false
      };

      const result = AdobeHelper.toAdobeParams(chaseOfferCodes, userInfo, earlyBird, true);

      expect(result).to.deep.equal(expectedParams);
    });

    it('should return formatted Target params with undefined chase offers', () => {
      const expectedParams = {
        redeemablePoints: 1000,
        companionRemainingPoints: 1250,
        chaseVisaRrEnrolled: false
      };

      const result = AdobeHelper.toAdobeParams(undefined, userInfo);

      expect(result).to.deep.equal(expectedParams);
    });

    it('should return formatted Target params with undefined user info', () => {
      const expectedParams = {
        offerIdentifier: 'identifier',
        acquisitionSourceCodes: 'aqsc',
        redeemablePoints: undefined,
        companionRemainingPoints: undefined,
        chaseVisaRrEnrolled: false
      };

      const result = AdobeHelper.toAdobeParams(chaseOfferCodes, undefined);

      expect(result).to.deep.equal(expectedParams);
    });

    it('should return formatted Target params with missing redeemablePoints', () => {
      userInfo = {
        customers: {
          UserInformation: {
            companionPassInfo: {
              companionRemainingPoints: 1250
            }
          }
        }
      };

      const expectedParams = {
        offerIdentifier: 'identifier',
        acquisitionSourceCodes: 'aqsc',
        redeemablePoints: undefined,
        companionRemainingPoints: 1250,
        chaseVisaRrEnrolled: false
      };

      const result = AdobeHelper.toAdobeParams(chaseOfferCodes, userInfo);

      expect(result).to.deep.equal(expectedParams);
    });

    it('should return formatted Target params with undefined redeemablePoints', () => {
      userInfo = {
        customers: {
          UserInformation: {
            redeemablePoints: undefined,
            companionPassInfo: {
              companionRemainingPoints: 1250
            }
          }
        }
      };

      const expectedParams = {
        offerIdentifier: 'identifier',
        acquisitionSourceCodes: 'aqsc',
        redeemablePoints: undefined,
        companionRemainingPoints: 1250,
        chaseVisaRrEnrolled: false
      };

      const result = AdobeHelper.toAdobeParams(chaseOfferCodes, userInfo);

      expect(result).to.deep.equal(expectedParams);
    });

    it('should return formatted Target params with empty companionPassInfo', () => {
      userInfo = {
        customers: {
          UserInformation: {
            redeemablePoints: 1000,
            companionPassInfo: {}
          }
        }
      };

      const expectedParams = {
        offerIdentifier: 'identifier',
        acquisitionSourceCodes: 'aqsc',
        redeemablePoints: 1000,
        companionRemainingPoints: undefined,
        chaseVisaRrEnrolled: false
      };

      const result = AdobeHelper.toAdobeParams(chaseOfferCodes, userInfo);

      expect(result).to.deep.equal(expectedParams);
    });

    it('should return formatted Target params with undefined companionRemainingPoints', () => {
      userInfo = {
        customers: {
          UserInformation: {
            redeemablePoints: 1000,
            companionPassInfo: {
              companionRemainingPoints: undefined
            }
          }
        }
      };

      const expectedParams = {
        offerIdentifier: 'identifier',
        acquisitionSourceCodes: 'aqsc',
        redeemablePoints: 1000,
        companionRemainingPoints: undefined,
        chaseVisaRrEnrolled: false
      };

      const result = AdobeHelper.toAdobeParams(chaseOfferCodes, userInfo);

      expect(result).to.deep.equal(expectedParams);
    });
  });

  context('parseMbox', () => {
    it('should parse a JSON string', () => {
      const content = JSON.stringify({
        key: 'value'
      });

      expect(AdobeHelper.parseMbox(content)).to.deep.equal({
        key: 'value'
      });
    });

    it('should return an empty object when parse fails', () => {
      const content = {
        key: 'value'
      };

      expect(AdobeHelper.parseMbox(content)).to.deep.equal({});
    });
  });
});
