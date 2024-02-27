import { sandbox } from 'sinon';
import Q from 'q';
import _ from 'lodash';
import FakeClock from 'test/unit/helpers/fakeClock';
import { integrationMount } from 'test/unit/helpers/testUtils';
import waitFor from 'test/unit/helpers/waitFor';
import * as StandbyActions from 'src/standby/actions/standbyActions';
import { StandbyPage } from 'src/standby/pages/standbyPage';

const sinon = sandbox.create();

describe('Standby Page', () => {
  let standbyPage;
  let checkStandbyNearAirportStub;
  let checkEnhancedStandbyNearAirportFnStub;
  let defaultProps;

  beforeEach(() => {
    checkStandbyNearAirportStub = sinon.stub(StandbyActions, 'checkStandbyNearAirport');
    checkStandbyNearAirportStub.returns(Q());

    checkEnhancedStandbyNearAirportFnStub = sinon.stub(StandbyActions, 'checkEnhancedStandbyNearAirport');
    checkEnhancedStandbyNearAirportFnStub.returns(Q());

    defaultProps = {
      standbyListPage: {
        header: {
          flightNumber: '2004',
          date: '2017-09-07',
          from: 'San Diego, CA (SAN)',
          to: 'New Orleans, LA (MSY)',
          hasWifi: true,
          departureTime: '06:40',
          arrivalTime: '12:15'
        },
        standbyList: [
          {
            isConfirmed: true,
            displayName: 'OTHER / TI'
          },
          {
            isConfirmed: false,
            displayName: 'ONVAC / SI',
            number: '1'
          }
        ],
        disclaimerText: 'Standby Disclaimer Text',
        _links: {
          standbyListPolices: {
            href: 'chapi/standby/url',
            method: 'GET'
          }
        }
      },
      checkStandbyNearAirportFn: checkStandbyNearAirportStub,
      checkEnhancedStandbyNearAirportFn: checkEnhancedStandbyNearAirportFnStub
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    beforeEach(() => {
      standbyPage = createComponent();
    });

    afterEach(() => {
      FakeClock.restore();
    });

    it('should render page header', () => {
      const standbyPageHeader = standbyPage.find('SubHeader');

      expect(standbyPageHeader).to.have.text('Standby List');
    });

    it('should render flight information', () => {
      const flightInfo = standbyPage.find('SearchFlightsSummaryHeader');

      expect(flightInfo).to.contain.text('Today -  Thu, Sep 7, 2017');
      expect(flightInfo).to.contain.text('From: San Diego, CA (SAN)');
      expect(flightInfo).to.contain.text('To: New Orleans, LA (MSY)');
    });

    it('should render flight number', () => {
      const flightNumber = standbyPage.find('FlightNumber');

      expect(flightNumber).to.contain.text('2004');
    });

    it('should render flight times', () => {
      const flightTimes = standbyPage.find('FlightTimes');

      expect(flightTimes).to.contain.text('6:40AM');
      expect(flightTimes).to.contain.text('12:15PM');
    });

    it('should render standby list', () => {
      expect(standbyPage.find('StandbyList')).to.be.present();
    });

    it('should render wcm disclaimer text', () => {
      const standbyDisclaimer = standbyPage.find('[data-qa="standby-disclaimer"]');

      expect(standbyDisclaimer).to.contain.text('Standby Disclaimer Text');
    });

    it('should render wcm policies link', () => {
      const standbyPolicies = standbyPage.find('.standby-wcm');

      expect(standbyPolicies).to.contain.text('Standby list policies and information');
    });

    it('should render last update time', () => {
      FakeClock.setTimeTo('2017-12-10T10:00:00.000');

      standbyPage = createComponent();

      expect(standbyPage).to.contain.text('Last Updated 12/10/17 10:00:00');
    });
  });

  context('checkStandbyNearAirport', () => {
    it('should not call checkStandbyNearAirport action when enter the page and redux store standbyListPage is not empty', () => {
      const initialState = {};

      _.set(initialState, 'app.standby.standbyPage.response.standbyListPage', 'whatever');

      createComponent(defaultProps, initialState);
      expect(checkStandbyNearAirportStub).to.be.not.called;
    });

    it('should call checkStandbyNearAirport action when enter the page and standbyListPage is empty', (done) => {
      _.set(defaultProps, 'standbyListPage', {});

      createComponent(defaultProps);

      waitFor.untilAssertPass(() => {
        expect(checkStandbyNearAirportStub).to.be.calledWith({ query: 'query' }, false, false);
      }, done);
    });

    it('should call checkEnhancedStandbyNearAirport when ENHANCED_STANDBY_TOGGLE/isEnhancedStandbyList is true', (done) => {
      _.set(defaultProps, 'standbyListPage', {});
      _.set(defaultProps, 'isEnhancedStandbyList', true);
      createComponent(defaultProps);

      waitFor.untilAssertPass(() => {
        expect(checkEnhancedStandbyNearAirportFnStub).to.be.called;
      }, done);
    });
  });

  const createComponent = (props = defaultProps, state = {}) =>
    integrationMount({ location: '/standby?query=query' })(state, StandbyPage, props);
});
