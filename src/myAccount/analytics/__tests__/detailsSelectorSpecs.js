import { getDetails } from 'src/myAccount/analytics/detailsSelector';

describe('detailsSelector', () => {
  context('getDetails', () => {
    it('should set checkInButton to true if isCheckInEligible is true and isCheckedIn is false', () => {
      const state = {
        app: {
          upcomingTrips: {
            upcomingTripsPage: [
              {
                pages: [
                  {
                    isCheckInEligible: true,
                    isCheckedIn: false
                  }
                ]
              }
            ]
          }
        }
      };

      expect(getDetails(state)).to.deep.equal({ checkInButton: true });
    });

    it('should set checkInButton to false if isCheckInEligible is false and isCheckedIn is true', () => {
      const state = {
        app: {
          upcomingTrips: {
            upcomingTripsPage: [
              {
                pages: [
                  {
                    isCheckInEligible: false,
                    isCheckedIn: true
                  }
                ]
              }
            ]
          }
        }
      };

      expect(getDetails(state)).to.deep.equal({ checkInButton: false });
    });

    it('should set checkInButton to false if isCheckInEligible and isCheckedIn are false', () => {
      const state = {
        app: {
          upcomingTrips: {
            upcomingTripsPage: [
              {
                pages: [
                  {
                    isCheckInEligible: false,
                    isCheckedIn: false
                  }
                ]
              }
            ]
          }
        }
      };

      expect(getDetails(state)).to.deep.equal({ checkInButton: false });
    });

    it('should set checkInButton to false if isCheckInEligible and isCheckedIn are true', () => {
      const state = {
        app: {
          upcomingTrips: {
            upcomingTripsPage: [
              {
                pages: [
                  {
                    isCheckInEligible: true,
                    isCheckedIn: true
                  }
                ]
              }
            ]
          }
        }
      };

      expect(getDetails(state)).to.deep.equal({ checkInButton: false });
    });

    it('should set checkInButton to false if upcomingTripsPage does not have trips', () => {
      const state = {
        app: {
          upcomingTrips: {
            upcomingTripsPage: []
          }
        }
      };

      expect(getDetails(state)).to.deep.equal({ checkInButton: false });
    });

    it('should set checkInButton to false if pages value is null', () => {
      const state = {
        app: {
          upcomingTrips: {
            upcomingTripsPage: [
              {
                pages: null
              }
            ]
          }
        }
      };

      expect(getDetails(state)).to.deep.equal({ checkInButton: false });
    });
  });
});
