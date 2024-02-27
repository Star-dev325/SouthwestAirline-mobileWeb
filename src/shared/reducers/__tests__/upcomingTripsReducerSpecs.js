import { upcomingTrips } from 'src/shared/reducers/upcomingTripsReducer';

describe('upcomingTrips', () => {
  it('should clear upcoming trips response when api call begins or clear action is fired', () => {
    let action = {
      type: 'SHARED__FETCH_UPCOMING_TRIPS'
    };

    expect(upcomingTrips('someResponse', action)).to.deep.equal({});

    action = {
      type: 'MY_ACCOUNT__FETCH_UPCOMING_TRIPS'
    };
    expect(upcomingTrips('someResponse', action)).to.deep.equal({});

    action = {
      type: 'MY_ACCOUNT__CLEAR_UPCOMING_TRIPS'
    };
    expect(upcomingTrips('someResponse', action)).to.deep.equal({});

    action = {
      type: 'MY_ACCOUNT__FETCH_ACCOUNT_INFO'
    };
    expect(upcomingTrips('someResponse', action)).to.deep.equal({});
  });

  it('should save upcoming trips response when succeeds', () => {
    const response = 'someResponse';
    let action = {
      type: 'SHARED__FETCH_UPCOMING_TRIPS_SUCCESS',
      response
    };

    expect(upcomingTrips({}, action)).to.deep.equal(response);

    action = {
      type: 'MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS',
      response
    };

    expect(upcomingTrips({}, action)).to.deep.equal(response);
  });

  it('should return default state when action is undefined', () => {
    expect(upcomingTrips().response).to.deep.equal(undefined);
  });
});
