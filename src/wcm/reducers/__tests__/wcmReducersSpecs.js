import _ from 'lodash';
import wcmReducers from 'src/wcm/reducers/wcmReducers';
import wcmConfig from 'src/wcm/constants/wcmConfig';

describe('wcmReducers', () => {
  const response = { fakeProperty: 'fake overlay' };

  _.forIn(wcmConfig, (config, key) => {
    it(`should update ${key} wcm content`, () => {
      expect(
        wcmReducers(undefined, {
          type: `${config.actionType}_SUCCESS`,
          response
        })[key]
      ).to.deep.equal(response);
    });
  });

  context('homeNavMenu', () => {
    it('should update home nav menu when successful response', () => {
      expect(
        wcmReducers(undefined, {
          type: 'WCM__FETCH_HOME_NAV_MENU_SUCCESS',
          response
        }).homeNavMenu
      ).to.have.keys(['expirationDate', 'fakeProperty']);
    });

    it('should update home nav menu with null when INIT is triggered', () => {
      expect(
        wcmReducers(undefined, {
          type: 'INIT'
        }).homeNavMenu
      ).to.be.null;
    });

    it('should return default state when action is undefined', () => {
      expect(wcmReducers().homeNavMenu).to.deep.equal(null);
    });

    it('should return expirationDate', () => {
      const state = { existing: 'state' };
      const action = { type: 'WCM__EXPIRE_HOME_NAV_MENU' };

      const result = wcmReducers({ homeNavMenu: { ...state } }, action).homeNavMenu;

      expect(result).to.have.property('expirationDate');
      expect(result).to.deep.include(state);
    });
  });

  context('footer', () => {
    it('should update footer when successful response', () => {
      expect(
        wcmReducers(undefined, {
          type: 'WCM__FETCH_FOOTER_SUCCESS',
          response
        }).footer
      ).to.deep.equal(response);
    });

    it('should update footer with null when INIT is triggered', () => {
      expect(
        wcmReducers(undefined, {
          type: 'INIT'
        }).footer
      ).to.be.null;
    });

    it('should return default state when action is undefined', () => {
      expect(wcmReducers().footer).to.deep.equal(null);
    });
  });

  context('fareDetails', () => {
    it('should update fareDetails page when successful response', () => {
      expect(
        wcmReducers(undefined, {
          type: 'WCM__FETCH_FARE_DETAILS_SUCCESS',
          response
        }).fareDetails
      ).to.deep.equal(response);
    });

    it('should update footer with null when INIT is triggered', () => {
      expect(
        wcmReducers(undefined, {
          type: 'INIT'
        }).fareDetails
      ).to.be.empty;
    });

    it('should return default state when action is undefined', () => {
      expect(wcmReducers().fareDetails).to.deep.equal({});
    });
  });
});
