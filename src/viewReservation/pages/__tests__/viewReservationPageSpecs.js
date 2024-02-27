import dayjs from 'dayjs';
import _ from 'lodash';
import proxyquire from 'proxyquire';
import React from 'react';
import { sandbox } from 'sinon';
import { MEDIUM_DATE_FORMAT } from 'src/shared/constants/dateConstants';
import { DEFAULT_CAR_BOOKING_MAX_DAYS_OUT } from 'src/viewReservation/constants/viewReservationConstants';
import BrowserObject from 'src/shared/helpers/browserObject';
import { mapStateToProps } from 'src/viewReservation/pages/viewReservationPage';
import { click, enterText, select, submitForm } from 'test/unit/helpers/enzymeFormTestUtils';
import { integrationMount } from 'test/unit/helpers/testUtils';

const { location } = BrowserObject;
const sinon = sandbox.create();

describe(`ViewReservationPage`, () => {
  let ViewReservationPage;
  let ViewReservationActions;

  let analyticsActions;
  let fetchRecentTripSearchesFnStub;
  let formDataActions;
  let getNormalizedRouteFnStub;
  let recentTripSearchesData;
  let saveRecentTripSearchFnStub;
  let viewReservationPage;

  beforeEach(() => {
    recentTripSearchesData = [];
    saveRecentTripSearchFnStub = sinon.stub();
    fetchRecentTripSearchesFnStub = sinon.stub();

    analyticsActions = require('src/shared/analytics/actions/analyticsActions');
    formDataActions = require('src/shared/actions/formDataActions');
    ViewReservationActions = require('src/viewReservation/actions/viewReservationActions');

    sinon
      .stub(ViewReservationActions, 'retrieveCarReservationAndTransitionToCarDetailPage')
      .returns({ type: 'FAKE_ACTION_TYPE' });
    sinon.stub(analyticsActions, 'viewTab').returns({ type: 'FAKE_ACTION_TYPE' });
    sinon.stub(formDataActions, 'clearFormDataById').returns({ type: 'FAKE_ACTION_TYPE' });
    ViewReservationPage = proxyquire('src/viewReservation/pages/viewReservationPage', {
      'src/shared/enhancers/withRecentTripSearches': { default: mockWithRecentTripSearches }
    }).default;
  });

  afterEach(() => {
    sinon.restore();
  });

  context('rendered retrieve reservation', () => {
    it('should clear form data when viewReservation page first loaded', () => {
      viewReservationPage = createComponent({
        history: {
          replace: () => {},
          push: () => {},
          action: 'PUSH',
          location: {
            search: ''
          }
        }
      });

      expect(formDataActions.clearFormDataById).to.be.calledTwice;
    });

    it('should not clear form data when back/forward to viewReservation page', () => {
      viewReservationPage = createComponent({
        history: {
          replace: () => {},
          push: () => {},
          action: 'POP',
          location: {
            search: ''
          }
        }
      });

      expect(formDataActions.clearFormDataById).not.to.be.called;
    });

    context('#onRetrieveFlightReservation', () => {
      const enterAndSubmitForm = (page) => {
        const reservationForm = page.find('ReservationRetrievalForm');

        enterText(reservationForm.find('FormInputField').at(0), 'ABC123');
        enterText(reservationForm.find('FormInputField').at(1), 'Liu');
        enterText(reservationForm.find('FormInputField').at(2), 'QQ');
        submitForm(reservationForm);
      };

      it('should transition to viewReservationDetailsPage page when submit is successful', () => {
        const isOnOldRouteStub = sinon.stub().returns(true);

        getNormalizedRouteFnStub = sinon.stub().returns('/view-reservation/trip-details/:recordLocator');
        ViewReservationPage = proxyquire('src/viewReservation/pages/viewReservationPage', {
          'src/shared/enhancers/withRecentTripSearches': { default: mockWithRecentTripSearches },
          'src/shared/helpers/urlHelper': { getNormalizedRoute: getNormalizedRouteFnStub, isOnOldRoute: isOnOldRouteStub }
        }).default;

        viewReservationPage = createComponent();
        enterAndSubmitForm(viewReservationPage);
        expect(viewReservationPage.instance().props.history.location.pathname).to.equal(
          '/view-reservation/trip-details/ABC123'
        );
        expect(viewReservationPage.instance().props.history.location.state).to.deep.equal({ firstName: 'Liu', lastName: 'QQ' });
      });

      it('should navigate to the normalized viewReservationDetailsPage with correct state on successful form submission', () => {
        const isOnOldRouteStub = sinon.stub().returns(false);

        getNormalizedRouteFnStub = sinon.stub().returns('/air/manage-reservation/view.html');
        ViewReservationPage = proxyquire('src/viewReservation/pages/viewReservationPage', {
          'src/shared/enhancers/withRecentTripSearches': { default: mockWithRecentTripSearches },
          'src/shared/helpers/urlHelper': { getNormalizedRoute: getNormalizedRouteFnStub, isOnOldRoute: isOnOldRouteStub }
        }).default;

        viewReservationPage = createComponent();
        enterAndSubmitForm(viewReservationPage);
        expect(viewReservationPage.instance().props.history.location.pathname).to.equal(
          '/air/manage-reservation/view.html'
        );
        expect(viewReservationPage.instance().props.history.location.state).to.deep.equal({
          firstName: 'Liu',
          lastName: 'QQ',
          recordLocator: 'ABC123'
        });
      });
    });

    context('when user is not logged in', () => {
      beforeEach(() => {
        const state = _.set({}, 'app.account.isLoggedIn', false);

        viewReservationPage = createComponent({}, '', state);
      });

      it('should show a link to view upcoming trips', () => {
        expect(viewReservationPage.find('UpcomingTripsLink')).to.not.be.exist;
      });
    });

    context('when user is logged in', () => {
      beforeEach(() => {
        const state = _.set({}, 'app.account.isLoggedIn', true);

        viewReservationPage = createComponent({}, '', state);
      });

      it('should show a link to view upcoming trips', () => {
        expect(viewReservationPage.find('UpcomingTripsLink')).to.exist;
      });
    });

    describe('car viewReservationPage mapStateToProps', () => {
      it('should have default value for car lastBookableDate if state is empty', () => {
        const state = {};

        expect(mapStateToProps(state).lastBookableDate).to.equal(
          dayjs().add(DEFAULT_CAR_BOOKING_MAX_DAYS_OUT, 'days').format(MEDIUM_DATE_FORMAT)
        );
      });

      it('should have default value for car lastBookableDate if state has no wcmContent', () => {
        const state = {
          app: {}
        };

        expect(mapStateToProps(state).lastBookableDate).to.equal(
          dayjs().add(DEFAULT_CAR_BOOKING_MAX_DAYS_OUT, 'days').format(MEDIUM_DATE_FORMAT)
        );
      });

      it('should have lastBookableDate if CAR_BOOKING_MAX_DAYS_OUT is set', () => {
        const state = {
          app: {
            wcmContent: {
              applicationProperties: {
                CAR_BOOKING_MAX_DAYS_OUT: 340
              }
            }
          }
        };

        expect(mapStateToProps(state).lastBookableDate).to.equal(dayjs().add(340, 'days').format(MEDIUM_DATE_FORMAT));
      });
    });
  });

  context('detached tabs', () => {
    it('should default to flight tab', () => {
      expect(activeTab()).to.contain.text('FLIGHT');
    });

    it('should show the view flight reservation form', () => {
      expect(viewReservationPage.find('ReservationRetrievalForm')).to.exist;
    });

    it('should not show the view car reservation form', () => {
      expect(viewReservationPage.find('CarReservationRetrievalForm')).to.not.exist;
    });

    context('when you tap car tab', () => {
      beforeEach(() => {
        getNormalizedRouteFnStub = sinon.stub().returns('/view-reservation');
        ViewReservationPage = proxyquire('src/viewReservation/pages/viewReservationPage', {
          'src/shared/enhancers/withRecentTripSearches': { default: mockWithRecentTripSearches },
          'src/shared/helpers/urlHelper': { getNormalizedRoute: getNormalizedRouteFnStub }
        }).default;
        viewReservationPage = createComponent();
        const carTab = viewReservationPage.find('[data-qa="detached-tab-bar-car"]');

        click(carTab);
      });

      it(`should call replaceWith with query: {tab: 'CAR'}`, () => {
        expect(viewReservationPage.instance().props.history.location.pathname).to.equal('/view-reservation');
        expect(viewReservationPage.instance().props.history.location.search).to.equal('?tab=CAR&clearFormData=false');
      });
    });

    describe('when you tap flight tab', () => {
      beforeEach(() => {
        getNormalizedRouteFnStub = sinon.stub().returns('/car/manage-reservation');
        ViewReservationPage = proxyquire('src/viewReservation/pages/viewReservationPage', {
          'src/shared/enhancers/withRecentTripSearches': { default: mockWithRecentTripSearches },
          'src/shared/helpers/urlHelper': { getNormalizedRoute: getNormalizedRouteFnStub }
        }).default;
        viewReservationPage = createComponent({}, '/car/manage-reservation');
        const flightTab = viewReservationPage.find('[data-qa="detached-tab-bar-flight"]');

        click(flightTab);
      });

      it(`should call replaceWith with query: {tab: 'CAR'}`, () => {
        expect(viewReservationPage.instance().props.history.location.pathname).to.equal('/car/manage-reservation');
        expect(viewReservationPage.instance().props.history.location.search).to.equal('?tab=FLIGHT&clearFormData=false');
      });
    });
  });

  context(`when navigating to ViewReservationPage from the Nav Bar -> Flight -> View Reservation menu item`, () => {
    it(`'FLIGHT' tab should be active`, () => {
      viewReservationPage = createComponent({
        query: {
          tab: 'FLIGHT'
        }
      });

      expect(activeTab()).to.contain.text('FLIGHT');
    });
  });

  context('Car Reservation Retrieval Form', () => {
    let carReservationRetrievalForm;

    beforeEach(() => {
      viewReservationPage = createComponent({}, '/view-reservation?tab=CAR');
      carReservationRetrievalForm = viewReservationPage.find('CarReservationRetrievalForm');
    });

    context('when navigating to ViewReservationPage from Nav Bar -> Car -> View Reservation', () => {
      it(`'CAR' tab should be active`, () => {
        expect(activeTab()).to.contain.text('CAR');
      });
    });

    context(`and 'Retrieve Reservation' button is clicked`, () => {
      beforeEach(() => {
        fillOutCarReservationForm();
        submitForm(carReservationRetrievalForm);
      });

      it(`should call action to retrieve car reservation`, () => {
        expect(ViewReservationActions.retrieveCarReservationAndTransitionToCarDetailPage).to.be.calledWith({
          confirmationNumber: '121313',
          firstName: 'Charith',
          lastName: 'Tangirala',
          pickupDate: '2015-01-01'
        });
      });

      const fillOutCarReservationForm = () => {
        const confirmationNumber = viewReservationPage.find('input').at(0);
        const firstName = viewReservationPage.find('input').at(1);
        const lastName = viewReservationPage.find('input').at(2);
        const pickupDate = viewReservationPage.find('select').at(0);

        enterText(confirmationNumber, '121313');
        enterText(firstName, 'Charith');
        enterText(lastName, 'Tangirala');
        select(pickupDate, '2015-01-01');
      };
    });
  });

  context(
    'when navigating to ViewReservationPage from homepage after visiting view car reservation from nav bar',
    () => {
      beforeEach(() => {
        viewReservationPage.unmount();

        viewReservationPage = createComponent();
      });

      it('should default to the FLIGHT tab', () => {
        expect(activeTab()).to.contain.text('FLIGHT');
      });
    }
  );

  context('recent trip search', () => {
    it('should render the recentTripSearches when searches are present', () => {
      recentTripSearchesData = [
        {
          firstName: 'Tom',
          lastName: 'Jones',
          recordLocator: 'UNGJ23'
        }
      ];
      viewReservationPage = createComponent();

      expect(viewReservationPage.find('RecentTripSearchCardsList'))
        .to.have.prop('recentTripSearches')
        .deep.equal(recentTripSearchesData);
      expect(viewReservationPage.find('RecentTripSearchCardsList')).to.have.prop('onCardClick');
    });

    it('should not render the recentTripSearches when searches is empty', () => {
      viewReservationPage = createComponent();

      expect(viewReservationPage.find('RecentTripSearchCardsList')).to.not.exist;
    });

    it('should not render the recentTripSearches when activeTab is not FLIGHT_TAB', () => {
      recentTripSearchesData = [
        {
          firstName: 'Tom',
          lastName: 'Jones',
          recordLocator: 'UNGJ23'
        }
      ];
      viewReservationPage = createComponent({}, '/view-reservation?tab=CAR');

      expect(activeTab()).to.contain.text('CAR');
      expect(viewReservationPage.find('RecentTripSearchCardsList')).to.not.exist;
    });

    it('should call the saveRecentTripSearchFn and fetchRecentTripSearchesFnStub when submit the form', () => {
      viewReservationPage = createComponent();
      const reservationForm = viewReservationPage.find('ReservationRetrievalForm');

      enterText(reservationForm.find('FormInputField').at(0), 'ABC123');
      enterText(reservationForm.find('FormInputField').at(1), 'Liu');
      enterText(reservationForm.find('FormInputField').at(2), 'QQ');
      submitForm(reservationForm);

      expect(saveRecentTripSearchFnStub).to.be.calledWith({
        recordLocator: 'ABC123',
        firstName: 'Liu',
        lastName: 'QQ'
      });
      expect(fetchRecentTripSearchesFnStub).to.be.called;
    });

    it('should call the fetchRecentTripSearchesFnStub when submit the form for car reservation normalized route', () => {
      location.href = "http://example.com/car/manage-reservation";
      viewReservationPage = createComponent();
      const reservationForm = viewReservationPage.find('ReservationRetrievalForm');

      enterText(reservationForm.find('FormInputField').at(0), 'ABC123');
      enterText(reservationForm.find('FormInputField').at(1), 'Liu');
      enterText(reservationForm.find('FormInputField').at(2), 'QQ');
      submitForm(reservationForm);

      expect(fetchRecentTripSearchesFnStub).to.be.called;
    });

    it('should render form container with no bottom padding when showing recent searches', () => {
      recentTripSearchesData = [
        {
          firstName: 'Tom',
          lastName: 'Jones',
          recordLocator: 'UNGJ23'
        }
      ];
      viewReservationPage = createComponent();
      expect(viewReservationPage.find('div.custom-container.pb0')).to.exist;
    });

    it('should render form container with bottom padding when not showing recent searches', () => {
      viewReservationPage = createComponent();
      expect(viewReservationPage.find('div.custom-container.pb0')).to.not.exist;
    });

    it('should display car reservation form', () => {
      location.href = 'http://example.com/car/manage-reservation';
      viewReservationPage = createComponent({}, '');

      expect(activeTab()).to.contain.text('CAR');
    });
  });

  const activeTab = () => viewReservationPage.find('.border-none.bgtransp');

  const createComponent = (props = {}, location = '/view-reservation?tab=FLIGHT&cleanFlow=true', state) =>
    integrationMount({ location })(state, ViewReservationPage, props);

  const mockWithRecentTripSearches = () => (Component) =>
    class WithRecentTripSearches extends React.Component {
      render() {
        return (
          <Component
            {...this.props}
            saveRecentTripSearchFn={saveRecentTripSearchFnStub}
            recentTripSearches={recentTripSearchesData}
            fetchRecentTripSearchesFn={fetchRecentTripSearchesFnStub}
          />
        );
      }
    };
});
