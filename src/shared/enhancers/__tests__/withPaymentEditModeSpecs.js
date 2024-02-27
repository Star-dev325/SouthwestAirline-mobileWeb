import React from 'react';
import proxyquire from 'proxyquire';
import _ from 'lodash';
import dayjs from 'dayjs';
import Q from 'q';
import PropTypes from 'prop-types';
import sinonModule from 'sinon';
import { integrationMount } from 'test/unit/helpers/testUtils';
import * as AccountsApi from 'src/shared/api/accountsApi';
import localStorage from 'store2';
import { click, enterText } from 'test/unit/helpers/enzymeFormTestUtils';
import CreditCardUpdateInfoBuilder from 'test/builders/model/creditCardUpdateInfoBuilder';
import { UNSELECTED_CREDIT_CARD } from 'src/shared/constants/creditCardConstants';

const sinon = sinonModule.sandbox.create();

describe('WithPaymentEditMode', () => {
  const options = { fullScreenModalId: 'airBookingCreditCardUpdate' };
  const tomorrow = dayjs().add(1, 'day');
  const FakeComponent = (props) => (
    <div>
      <input onChange={(e) => props.onSelectedCreditCardChanged(e.target.value)} />
      <button onClick={() => props.onUpdateGlobalHeader(props.savedCreditCardId)} />
      <button onClick={props.onUpdateCreditCard} />
      <p>Mock Component</p>
    </div>
  );

  FakeComponent.propTypes = {
    onUpdateGlobalHeader: PropTypes.func,
    onSelectedCreditCardChanged: PropTypes.func,
    onUpdateCreditCard: PropTypes.func,
    savedCreditCardId: PropTypes.string
  };

  let withPaymentEditMode;
  let GlobalHeaderActions;
  let wrapper;
  let resetGlobalHeaderStub;
  let showEditButtonStub;
  let showCancelButtonStub;
  let hideButtonStub;
  let CreditCardActions;
  let AirBookingActions;
  let addForbidUserClickBrowserForwardStub;
  let removeForbidUserClickBrowserForwardStub;
  let continueAsGuestFnStub;
  let addHistoryBackToHomeFnStub;
  let setReLoginCallbackFunctionsFnStub;
  let fullScreenModal;
  let withSessionExpiredStub;

  beforeEach(() => {
    addForbidUserClickBrowserForwardStub = sinon.stub();
    removeForbidUserClickBrowserForwardStub = sinon.stub();
    AirBookingActions = require('src/airBooking/actions/airBookingActions');
    CreditCardActions = require('src/shared/actions/creditCardActions');
    GlobalHeaderActions = require('src/shared/actions/globalHeaderActions');
    withSessionExpiredStub = () => (Comp) => (props) => <Comp {...props} />;
    withPaymentEditMode = proxyquire('src/shared/enhancers/withPaymentEditMode', {
      'src/shared/enhancers/withSessionExpired': { default: withSessionExpiredStub },
      'src/shared/helpers/historyHelper': {
        addForbidUserClickBrowserForward: addForbidUserClickBrowserForwardStub,
        removeForbidUserClickBrowserForward: removeForbidUserClickBrowserForwardStub
      }
    }).default;
    const creditCard = new CreditCardUpdateInfoBuilder().build();

    resetGlobalHeaderStub = sinon.stub(GlobalHeaderActions, 'resetGlobalHeader').returns({ type: 'resetGlobalHeader' });
    showEditButtonStub = sinon.stub(GlobalHeaderActions, 'showEditButton').returns({ type: 'showEditButton' });
    showCancelButtonStub = sinon.stub(GlobalHeaderActions, 'showCancelButton').returns({ type: 'showCancelButton' });
    hideButtonStub = sinon.stub(GlobalHeaderActions, 'hideButton').returns({ type: 'hideButton' });
    continueAsGuestFnStub = sinon.stub();
    addHistoryBackToHomeFnStub = sinon.stub();
    setReLoginCallbackFunctionsFnStub = sinon.stub();
    sinon.stub(AccountsApi, 'fetchSavedCreditCardsById').returns(Q({ updateSavedCreditCardPage: creditCard }));
    sinon.stub(AccountsApi, 'updateCreditCard').returns(Q());
    sinon.stub(AccountsApi, 'fetchNewSavedCreditCards').returns(Q({ savedCreditCards: 'savedCreditCards' }));
    sinon.stub(AirBookingActions, 'resetAirBookingPurchaseData').returns({ type: 'mockAction' });
    wrapper = createComponent();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should pass editMode to sub component', () => {
    expect(wrapper.find('FakeComponent')).to.have.prop('editMode', false);
  });

  it('should pass onMakePrimaryCreditCard to sub component', () => {
    expect(wrapper.find('FakeComponent')).to.have.prop('onMakePrimaryCreditCard');
  });

  it('should pass addHistoryBackToHome to sub component', () => {
    expect(wrapper.find('FakeComponent')).to.have.prop('addHistoryBackToHome');
  });

  it('should call reset global header action when component unmount', () => {
    wrapper.unmount();

    expect(resetGlobalHeaderStub).to.be.called;
  });

  it('should call showEditButton action when click fake component without edit mode', () => {
    click(wrapper.find('FakeComponent').find('button').at(0));

    expect(showEditButtonStub).to.be.called;
  });

  it('should not show edit button when click rapid rewards visa card', () => {
    wrapper = createComponent({
      props: {
        savedCreditCardId: 'RAPID_REWARDS_VISA_ID'
      }
    });

    click(wrapper.find('FakeComponent').find('button').at(0));

    expect(showEditButtonStub).to.not.be.called;
  });

  it('should not show edit button when click new credit card', () => {
    wrapper = createComponent({
      props: {
        savedCreditCardId: 'NEW_CREDIT_CARD_ID'
      }
    });

    click(wrapper.find('FakeComponent').find('button').at(0));

    expect(showEditButtonStub).to.not.be.called;
  });

  it('should not show edit button when click new paypal card', () => {
    wrapper = createComponent({
      props: {
        savedCreditCardId: 'PAY_PAL_CARD_ID'
      }
    });

    click(wrapper.find('FakeComponent').find('button').at(0));

    expect(showEditButtonStub).to.not.be.called;
  });

  it('should not show edit button when savedCreditCardId is undefined', () => {
    wrapper = createComponent({
      props: {
        savedCreditCardId: UNSELECTED_CREDIT_CARD
      }
    });

    click(wrapper.find('FakeComponent').find('button').at(0));

    expect(showEditButtonStub).to.not.be.called;
  });

  it('should call showCancelButton action when click fake component in edit mode', () => {
    wrapper = createComponent({ isEditMode: true });

    click(wrapper.find('FakeComponent').find('button').at(0));

    expect(showCancelButtonStub).to.be.called;
  });

  it('should handle addHistoryBackToHomeFn correctly', () => {
    wrapper = createComponent();

    wrapper.find('FakeComponent').props().addHistoryBackToHome(true);

    expect(addHistoryBackToHomeFnStub).to.be.calledWith(true);
  });

  it('should have fullscreen modal', () => {
    expect(wrapper.find('FullScreenModal')).to.exist;
  });

  it('should call hideButton action when fake component on change event triggered', () => {
    wrapper = createComponent();

    enterText(wrapper.find('FakeComponent'), 'NEW_CREDIT_CARD_ID');

    expect(hideButtonStub).to.be.called;
  });

  it('should call full screen modal function', () => {
    expect(wrapper.find('FullScreenModal')).to.be.exist;
  });

  it('should show CreditCardUpdateForm when get credit card information success', () => {
    wrapper = createComponent({ isEditMode: true, search: '_modal=airBookingCreditCardUpdate', isOpen: true });
    fullScreenModal = wrapper.find('.update-saved-credit-card-page');

    expect(fullScreenModal.find('CreditCardUpdateForm')).to.have.lengthOf(1);
  });

  it('should close full screen modal when update success', () => {
    wrapper = createComponent({ isEditMode: true });
    fullScreenModal = wrapper.find('.update-saved-credit-card-page');

    expect(fullScreenModal).to.not.be.exist;
  });

  context('when using api gateway cookies', () => {
    it('should call appropriate actions', () => {
      sinon.stub(localStorage, 'get').returns({ expirationDate: 'token' });
      sinon.stub(CreditCardActions, 'getSavedCreditCardById').returns({ type: 'mockActionType' });
      wrapper = createComponent({});
      wrapper.find('FakeComponent').prop('onUpdateCreditCard')('selectedId');

      expect(CreditCardActions.getSavedCreditCardById).to.have.been.calledWith('selectedId');
    });
  });

  function createComponent({ isEditMode = false, search = '', props = {} } = {}) {
    const initState = {
      app: {
        globalHeader: { editMode: isEditMode },
        airBooking: {
          updateSavedCreditCardPage: {
            type: 'VISA',
            lastFourDigits: '9999',
            nameOnCard: 'Li Rui',
            expiryMonth: tomorrow.month() + 1,
            expiryYear: tomorrow.year(),
            billingAddress: {
              isoCountryCode: 'US',
              addressLine1: '956 Main St',
              addressLine2: '',
              zipOrPostalCode: '37693',
              city: 'Brooklyn',
              stateProvinceRegion: 'NY',
              isUSAddress: true
            },
            _infoNeededToUpdate: { savedCreditCardId: '1-ENKS4K', cardDescription: 'VISA 9999' }
          }
        }
      },
      router: {
        location: {
          search
        }
      }
    };

    const defaultProps = {
      push: _.noop,
      checkSessionExpired: _.noop,
      savedCreditCardId: 'savedCreditCardId',
      updateFormDataValueFn: _.noop,
      setReLoginCallbackFunctionsFn: setReLoginCallbackFunctionsFnStub,
      addHistoryBackToHomeFn: addHistoryBackToHomeFnStub
    };

    return integrationMount({ withDialog: true })(
      initState,
      withPaymentEditMode(options, continueAsGuestFnStub)(FakeComponent),
      { ...defaultProps, ...props }
    );
  }
});
