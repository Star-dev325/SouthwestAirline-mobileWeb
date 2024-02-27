import TravelAdvisoryReducer from 'src/travelAdvisory/reducers/travelAdvisoryReducer';

describe('TravelAdvisoryReducer', () => {
  it('should set the TravelAdvisory state when the status is FETCH_TRAVEL_ADVISORIES_SUCCESS', () => {
    const state = TravelAdvisoryReducer(false, {
      type: 'TRAVEL_ADVISORY__FETCH_TRAVEL_ADVISORIES_SUCCESS',
      response: {
        messageTravelAdvisory: [
          {
            id: '1234567890',
            advisoryTitle: 'Fake Advisory Title',
            advisoryInfo: 'Fake Advisory Info',
            stationInfo: [
              {
                station: 'Fake Station',
                stationDetails: 'Fake Station Details'
              }
            ]
          }
        ]
      }
    });

    expect(state.messageTravelAdvisory).to.deep.equal([
      {
        id: '1234567890',
        advisoryTitle: 'Fake Advisory Title',
        advisoryInfo: 'Fake Advisory Info',
        stationInfo: [
          {
            station: 'Fake Station',
            stationDetails: 'Fake Station Details'
          }
        ]
      }
    ]);
  });

  it('should return default state when action is undefined', () => {
    expect(TravelAdvisoryReducer().messageTravelAdvisory).to.deep.equal(null);
  });
});
