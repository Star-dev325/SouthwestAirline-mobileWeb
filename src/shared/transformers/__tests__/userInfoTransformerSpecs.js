import { transformUserInfo } from 'src/shared/transformers/userInfoTransformer';

describe('UserInfoTransformer', () => {
  context('transformUserInfo', () => {
    it('should return formatted user info on success', () => {
      const oauthLoginResponse = {
        'customers.UserInformation.companionPassInfo.companionQualifyingPoints': 0,
        'customers.UserInformation.companionPassInfo.companionQualifyingPointsRequired': 12500
      };

      const expectedResponse = {
        customers: {
          UserInformation: {
            companionPassInfo: {
              companionQualifyingPoints: 0,
              companionQualifyingPointsRequired: 12500,
              companionRemainingPoints: 12500
            }
          }
        }
      };

      expect(transformUserInfo(oauthLoginResponse)).to.deep.equal(expectedResponse);
    });

    it('should return formatted user info on when missing companionQualifyingPoints', () => {
      const oauthLoginResponse = {
        'customers.UserInformation.companionPassInfo.companionQualifyingPointsRequired': 12500
      };

      const expectedResponse = {
        customers: {
          UserInformation: {
            companionPassInfo: {
              companionQualifyingPointsRequired: 12500,
              companionRemainingPoints: undefined
            }
          }
        }
      };

      expect(transformUserInfo(oauthLoginResponse)).to.deep.equal(expectedResponse);
    });

    it('should return formatted user info on when undefined companionQualifyingPoints', () => {
      const oauthLoginResponse = {
        'customers.UserInformation.companionPassInfo.companionQualifyingPoints': undefined,
        'customers.UserInformation.companionPassInfo.companionQualifyingPointsRequired': 12500
      };

      const expectedResponse = {
        customers: {
          UserInformation: {
            companionPassInfo: {
              companionQualifyingPoints: undefined,
              companionQualifyingPointsRequired: 12500,
              companionRemainingPoints: undefined
            }
          }
        }
      };

      expect(transformUserInfo(oauthLoginResponse)).to.deep.equal(expectedResponse);
    });

    it('should return formatted user info on when missing companionQualifyingPointsRequired', () => {
      const oauthLoginResponse = {
        'customers.UserInformation.companionPassInfo.companionQualifyingPoints': 0
      };

      const expectedResponse = {
        customers: {
          UserInformation: {
            companionPassInfo: {
              companionQualifyingPoints: 0,
              companionRemainingPoints: undefined
            }
          }
        }
      };

      expect(transformUserInfo(oauthLoginResponse)).to.deep.equal(expectedResponse);
    });

    it('should return formatted user info on when undefined companionQualifyingPointsRequired', () => {
      const oauthLoginResponse = {
        'customers.UserInformation.companionPassInfo.companionQualifyingPoints': 0,
        'customers.UserInformation.companionPassInfo.companionQualifyingPointsRequired': undefined
      };

      const expectedResponse = {
        customers: {
          UserInformation: {
            companionPassInfo: {
              companionQualifyingPoints: 0,
              companionQualifyingPointsRequired: undefined,
              companionRemainingPoints: undefined
            }
          }
        }
      };

      expect(transformUserInfo(oauthLoginResponse)).to.deep.equal(expectedResponse);
    });

    it('should return formatted user info on when missing companionPassInfo', () => {
      const oauthLoginResponse = {};

      const expectedResponse = {
        customers: {
          UserInformation: {
            companionPassInfo: {
              companionRemainingPoints: undefined
            }
          }
        }
      };

      expect(transformUserInfo(oauthLoginResponse)).to.deep.equal(expectedResponse);
    });

    it('should return formatted user info on when undefined login response', () => {
      const oauthLoginResponse = undefined;

      const expectedResponse = {
        customers: {
          UserInformation: {
            companionPassInfo: {
              companionRemainingPoints: undefined
            }
          }
        }
      };

      expect(transformUserInfo(oauthLoginResponse)).to.deep.equal(expectedResponse);
    });
  });
});
