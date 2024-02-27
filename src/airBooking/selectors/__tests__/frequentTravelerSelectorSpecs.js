import { shouldShowFrequentTravelers } from 'src/airBooking/selectors/frequentTravelerSelector';

describe('shouldShowFrequentTravelers', () => {
  let state;

  beforeEach(() => {
    state = {
      app: {
        account: {
          isLoggedIn: true
        },
        airBooking: {
          accountInfo: {
            frequentTravelerList: [{}]
          }
        }
      }
    };
  });

  context('Logged In', () => {
    it('should return true if user already logged in and has frequent taveler list', () => {
      const result = shouldShowFrequentTravelers(state);

      expect(result).to.be.true;
    });

    it('should return false if user is not logged in', () => {
      state.app.account.isLoggedIn = false;
      const result = shouldShowFrequentTravelers(state);

      expect(result).to.be.false;
    });
  });

  context('should return false', () => {
    it("should return false if user is logged in but doesn't have a frequent traveler list", () => {
      state.app.airBooking.accountInfo.frequentTravelerList = null;
      const result = shouldShowFrequentTravelers(state);

      expect(result).to.be.false;
    });
  });
});
