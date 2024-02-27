import { getPassengerInfosForForm } from 'src/airBooking/selectors/passengerInfosSelectors';

describe('getPassengerInfos', () => {
  it('should return undefined if passengerInfos is unavailable', () => {
    expect(getPassengerInfosForForm({})).toBe(undefined);
  });

  it('should not cause an exception if there is no personal information', () => {
    const mockState = {
      app: {
        airBooking: {
          passengerInfos: [{
            type: 'ADULT',
            firstName: 'John',
            lastName: 'Test'
          }]
        }
      }
    };
    const getPassengerInfosForFormWithState = () => {
      getPassengerInfosForForm(mockState);
    };

    expect(getPassengerInfosForFormWithState).not.toThrowError();
  });

  it('should not cause an exception if there is no frequent travelers list', () => {
    const mockState = {
      app: {
        airBooking: {
          passengerInfos: [{
            type: 'ADULT',
            firstName: 'John',
            lastName: 'Test',
            passengerInfo: {
              frequentTravelerList: undefined
            }
          }]
        }
      }
    };
    const getPassengerInfosForFormWithState = () => {
      getPassengerInfosForForm(mockState);
    };

    expect(getPassengerInfosForFormWithState).not.toThrowError();
  });

  it('should replace all null values in passenger info', () => {
    const mockState = {
      app: {
        airBooking: {
          passengerInfos: [{
            type: 'ADULT',
            passengerInfo: {
              firstName: null,
              frequentTravelerList: [{
                firstName: null
              }, {
                firstName: 'Frequent Traveler 2'
              }]
            }
          }, {
            type: 'ADULT',
            passengerInfo: {
              firstName: 'Traveler 2',
              frequentTravelerList: [{
                firstName: null
              }]
            }
          }]
        }
      }
    };

    expect(getPassengerInfosForForm(mockState)).toEqual([{
      type: 'ADULT',
      passengerInfo: {
        firstName: '',
        frequentTravelerList: [{
          firstName: ''
        }, {
          firstName: 'Frequent Traveler 2'
        }]
      }
    }, {
      type: 'ADULT',
      passengerInfo: {
        firstName: 'Traveler 2',
        frequentTravelerList: [{
          firstName: ''
        }]
      }
    }]);
  });
});
