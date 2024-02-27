import _ from 'lodash';
import { sandbox } from 'sinon';
import * as AnalyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as AsyncValidators from 'src/shared/form/formValidators/asyncValidators';
import * as AppSelector from 'src/shared/selectors/appSelector';
import { TravelInformationPage } from 'src/viewReservation/pages/travelInformationPage';
import EditPNRPassengerPageBuilder from 'test/builders/apiResponse/editPNRPassengerPageBuilder';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';
import { click, enterText, enterTextIntoMaskedField, submitForm } from 'test/unit/helpers/enzymeFormTestUtils';
import { createComponentWithMockedState } from 'test/unit/helpers/testUtils';

const sinon = sandbox.create();

describe('TravelInformationPage', () => {
  let props, travelInfoPage, updateTravelInformationLink;

  beforeEach(() => {
    props = {
      location: {
        state: {
          firstName: 'First',
          lastName: 'Last',
          recordLocator: 'TEST00'
        }
      },
      params: { passengerReference: '2' },
      showDialogFn: sinon.stub(),
      hideDialogFn: sinon.stub().resolves(),
      saveTravelInformationFn: sinon.stub(),
      updateTravelInformationForAnalyticsFn: sinon.stub(),
      goBack: sinon.stub(),
      editPNRPassengerPage: new EditPNRPassengerPageBuilder().withPassengerDetails().withIsInternational(true).build(),
      push: sinon.stub(),
      retrieveFlightAndTravelInformationWithSearchTokenFn: sinon.stub(),
      specialAssistanceSelections: undefined,
      query: undefined,
      viewReservationViewPage: new ViewReservationBuilder().build()
    };
    updateTravelInformationLink = {
      href: '/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/PPUWKZ',
      method: 'POST',
      body: {
        accountNumber: null,
        emergencyContact: null,
        firstName: 'Fred',
        knownTravelerId: null,
        lastName: 'Flinstone',
        redressNumber: '1234567',
        nonChargeableAncillaryProducts: null,
        passengerReference: '2',
        passportInformation: null
      }
    };

    sinon.stub(AsyncValidators, 'rapidRewardsNumberValidator').returns(() => true);
    sinon.stub(AnalyticsEventHelper, 'raiseSatelliteEvent');
    sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');

    travelInfoPage = createComponentWithMockedState(TravelInformationPage, { props });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call retrieveFlightAndTravelInformationWithSearchTokenFn when viewReservationViewPage is empty with searchToken', () => {
    const additionalProps = {
      location: {},
      params: {},
      query: {
        passengerReference: 2,
        searchToken: 'ae!dwerfsgfj12jdsljf'
      },
      viewReservationViewPage: {}
    };

    const combinedProps = { ...props, ...additionalProps };

    travelInfoPage = createComponentWithMockedState(TravelInformationPage, { props: combinedProps });
    expect(AnalyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('TOOL:CHCK:Travel Information');
    expect(props.retrieveFlightAndTravelInformationWithSearchTokenFn).to.have.been.calledWith('ae!dwerfsgfj12jdsljf', 2);
  });

  it('should not call retrieveFlightAndTravelInformationWithSearchTokenFn when viewReservationViewPage is defined', () => {
    const additionalProps = {
      location: {},
      params: {},
      query: {
        passengerReference: 2,
        searchToken: 'ae!dwerfsgfj12jdsljf'
      }
    };

    const combinedProps = { ...props, ...additionalProps };

    travelInfoPage = createComponentWithMockedState(TravelInformationPage, { props: combinedProps });
    expect(AnalyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('TOOL:CHCK:Travel Information');
    expect(props.retrieveFlightAndTravelInformationWithSearchTokenFn).not.have.been.called;
  });

  describe('PageHeaderWithButtons', () => {
    it('should have a pageHeader with title `Passenger Details`', async () => {
      expect(travelInfoPage.find('PageHeaderWithButtons')).to.have.prop('title').to.equal('Passenger Details');
    });

    it('should show dialog when click cancel', async () => {
      click(travelInfoPage.find('button[type="button"]'));
      expect(props.showDialogFn.args[0][0]).to.deep.contains({
        title: 'Are you sure you want to cancel?',
        name: 'travel-info-page-confirm-lost-info-before-cancel',
        message: `If so, the information on this page will not be saved and you'll be taken back to the view reservation details page.`
      });
      expect(props.showDialogFn.args[0][0].buttons[0].onClick).to.equal(props.hideDialogFn);
      await props.showDialogFn.args[0][0].buttons[1].onClick();
      expect(props.goBack).to.have.been.called;
    });

    it('should render TravelInformationForm', () => {
      expect(travelInfoPage.find('TravelInformationForm')).to.exist;
    });

    it('should transition to special assistance page when click special assistance block', () => {
      click(travelInfoPage.find('SpecialAssistanceNavItem NavItemLink'));
      expect(props.push).to.have.been.calledWith(
        '/air/manage-reservation/disability-options.html'
      );
    });

    describe('with searchToken', () => {
      beforeEach(() => {
        const additionalProps = {
          location: {},
          params: {},
          query: {
            passengerReference: 2,
            searchToken: 'ae!dwerfsgfj12jdsljf'
          }
        };
        const combinedProps = { ...props, ...additionalProps };

        travelInfoPage = createComponentWithMockedState(TravelInformationPage, { props: combinedProps });
      });

      it('should show dialog when click cancel', async () => {
        click(travelInfoPage.find('button[type="button"]'));
        await props.showDialogFn.args[0][0].buttons[1].onClick();
        expect(props.push).to.have.been.calledWith(
          '/air/manage-reservation/view.html?searchToken=ae!dwerfsgfj12jdsljf'
        );
      });

      it('should transition to special assistance page when click special assistance block', () => {
        click(travelInfoPage.find('SpecialAssistanceNavItem NavItemLink'));
        expect(props.push).to.have.been.calledWith(
          '/air/manage-reservation/disability-options.html?passengerReference=2&searchToken=ae!dwerfsgfj12jdsljf'
        );
      });
    });
  });

  describe('passport', () => {
    it('should render passport', () => {
      expect(travelInfoPage.find('.passport-form--info')).to.exist;
    });

    it('should not render passport', () => {
      _.set(props, 'editPNRPassengerPage.isInternational', false);
      travelInfoPage = createComponentWithMockedState(TravelInformationPage, { props });
      expect(travelInfoPage.find('.passport-form--info')).to.not.exist;
    });
  });

  describe('submit', () => {
    it('should call saveTravelInformationFn with PNR user clicks save', async () => {
      enterText(travelInfoPage.find('[name="redressNumber"]'), '1234567');
      await submitForm(travelInfoPage);

      expect(props.updateTravelInformationForAnalyticsFn).to.have.been.called;
      expect(props.saveTravelInformationFn).to.have.been.called;
      expect(props.saveTravelInformationFn).to.have.been.calledWith({
        updateTravelInformationLink,
        pnr: {
          firstName: 'Fred',
          middleName: '',
          lastName: 'Flinstone',
          recordLocator: 'TEST00'
        },
        searchToken: undefined,
        editNamesSuccessfulUpdateMessage: null
      });
      expect(props.goBack).to.not.be.called;
    });
    it('should call saveTravelInformationFn when user enters redressNumber and clicks save button', async () => {
      enterText(travelInfoPage.find('[name="redressNumber"]'), '1234567');
      await submitForm(travelInfoPage);

      expect(props.updateTravelInformationForAnalyticsFn).to.have.been.called;
      expect(props.saveTravelInformationFn).to.have.been.called;
      expect(props.saveTravelInformationFn).to.have.been.called;
      expect(props.goBack).to.not.be.called;
    });

    it('should call saveTravelInformationFn with when user enters XXXXX and last4 digit of passport number and clicks save button', async () => {
      enterTextIntoMaskedField(travelInfoPage, 'FormInputMaskField', 'XXXXX1234');

      await submitForm(travelInfoPage);

      expect(props.updateTravelInformationForAnalyticsFn).to.have.been.called;
      expect(props.saveTravelInformationFn).to.have.been.called;
      expect(props.goBack).to.not.be.called;
    });

    it('should call goBack when user does not enter any changes and clicks save button', async () => {
      await submitForm(travelInfoPage);

      expect(props.updateTravelInformationForAnalyticsFn).to.have.been.called;
      expect(props.goBack).to.have.been.called;
      expect(props.saveTravelInformationFn).to.not.be.called;
    });

    describe('customer checked in', () => {
      it('should display popup with message when user changes name and editNamesCheckedInMessage is populated with the msg', async () => {
        _.set(
          props,
          'editPNRPassengerPage',
          new EditPNRPassengerPageBuilder()
            .withPassengerDetails()
            .withEditNamesCheckedInMessage()
            .withEditNameFlags(true, true)
            .build()
        );

        travelInfoPage = createComponentWithMockedState(TravelInformationPage, { props });
        enterText(travelInfoPage.find('[name="firstName"]'), 'Sammy');

        await submitForm(travelInfoPage);

        expect(props.showDialogFn.args[0][0].name).to.equal('travel-info-page-ack-before-save');
        expect(props.showDialogFn.args[0][0].message).to.deep.equal(
          props.editPNRPassengerPage.editNamesCheckedInMessage.body
        );
        expect(props.showDialogFn.args[0][0].buttons[0].label).to.equal('No');
        expect(props.showDialogFn.args[0][0].buttons[1].label).to.equal('Yes');
        expect(props.showDialogFn.args[0][0].buttons[0].onClick).to.equal(props.hideDialogFn);

        await props.showDialogFn.args[0][0].buttons[1].onClick();
        expect(props.hideDialogFn).to.have.been.called;
      });

      it('should not display popup with message when user does not change name, user presses save button and edit name flags are false', async () => {
        _.set(
          props,
          'editPNRPassengerPage',
          new EditPNRPassengerPageBuilder()
            .withPassengerDetails()
            .withEditNamesCheckedInMessage()
            .withEditNameFlags(false, false)
            .build()
        );

        travelInfoPage = createComponentWithMockedState(TravelInformationPage, { props });
        await submitForm(travelInfoPage);

        expect(props.showDialogFn.args).to.deep.equal([]);
      });

      it('should not display popup with message when user changes name, user presses save button and edit name flags are true and editNamesCheckedInMessage is missing', async () => {
        _.set(
          props,
          'editPNRPassengerPage',
          new EditPNRPassengerPageBuilder().withPassengerDetails().withEditNameFlags(true, true).build()
        );

        travelInfoPage = createComponentWithMockedState(TravelInformationPage, { props });
        enterText(travelInfoPage.find('[name="firstName"]'), 'Sammy');

        await submitForm(travelInfoPage);

        expect(props.showDialogFn.args).to.deep.equal([]);
        expect(props.saveTravelInformationFn.args[0][0].updateTravelInformationLink.body.firstName).to.equal('Fred');
      });
    });

    describe('saveTravelInformationFn paramenter editNamesSuccessfulUpdateMessage', () => {
      beforeEach(() => {
        props.editPNRPassengerPage = new EditPNRPassengerPageBuilder()
          .withPassengerDetails()
          .withEditNamesSuccessfulUpdateMessage()
          .withEditNameFlags(true, true)
          .build();
        travelInfoPage = createComponentWithMockedState(TravelInformationPage, { props });
      });

      it('should pass edit name success message when user edits name and chapi returns the message ', async () => {
        enterText(travelInfoPage.find('[name="middleName"]'), 'CHANGED');
        await submitForm(travelInfoPage);

        expect(props.saveTravelInformationFn.args[0][0].editNamesSuccessfulUpdateMessage).to.equal(
          props.editPNRPassengerPage.editNamesSuccessfulUpdateMessage.body
        );
      });

      it('should not pass edit name success message when user does not edit name and chapi returns the message ', async () => {
        enterText(travelInfoPage.find('[name="knownTravelerNumber"]'), '123456789');

        await submitForm(travelInfoPage);

        expect(props.saveTravelInformationFn.args[0][0].editNamesSuccessfulUpdateMessage).to.be.null;
      });
    });
  });
});
