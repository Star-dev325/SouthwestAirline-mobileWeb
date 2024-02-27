import _ from 'lodash';
import { getSearch as searchSelector } from 'src/flightStatus/analytics/searchSelector';

describe('searchSelector', () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  it('should return search data when formData is populated is populated in state tree', () => {
    state = _.set(state, 'app.formData.FLIGHT_STATUS_SEARCH_FORM.data', {
      originAirport: 'DAL',
      destinationAirport: 'HOU'
    });
    expect(searchSelector(state)).to.be.deep.equal({
      origin: 'DAL',
      destination: 'HOU',
      currentLocationUsed: false
    });
  });

  it('should return search data when getSelectedRecentSearchRequest is populated in state tree', () => {
    state = _.set(state, 'app.flightStatus.selectedRecentSearchRequest', {
      from: 'DAL',
      to: 'HOU'
    });
    expect(searchSelector(state)).to.be.deep.equal({
      origin: 'DAL',
      destination: 'HOU',
      currentLocationUsed: false
    });
  });

  it('should return search data when route pathname is populated in state tree', () => {
    state = _.set(state, 'router.location.pathname', '/flight-status/DAL/HOU/2018-03-23');

    expect(searchSelector(state)).to.be.deep.equal({
      origin: 'DAL',
      destination: 'HOU',
      currentLocationUsed: false
    });
  });

  context('current location is used', () => {
    it('should return currentLocationUsed true when origin current location is used', () => {
      state = _.set({}, 'app.airportInfo.originAirport.isCurrentLocation', true);
      state = _.set(state, 'router.location.pathname', '/flight-status/DAL/HOU/2018-03-23');

      expect(searchSelector(state)).to.be.deep.equal({
        origin: 'DAL',
        destination: 'HOU',
        currentLocationUsed: true
      });
    });
    it('should return currentLocationUsed true when destination current location is used', () => {
      state = _.set({}, 'app.airportInfo.destinationAirport.isCurrentLocation', true);
      state = _.set(state, 'router.location.pathname', '/flight-status/DAL/HOU/2018-03-23');

      expect(searchSelector(state)).to.be.deep.equal({
        origin: 'DAL',
        destination: 'HOU',
        currentLocationUsed: true
      });
    });
  });
});
