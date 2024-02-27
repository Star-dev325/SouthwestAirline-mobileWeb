import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { CompanionPassengerPage } from 'src/companion/pages/companionPassengerPage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('CompanionPassengerPage', () => {
  let fetchSavedCreditCardsAndGoToNextPageFnMock;
  let pushMock;
  let saveCompanionPassengerFnMock;

  beforeEach(() => {
    pushMock = jest.fn();
    fetchSavedCreditCardsAndGoToNextPageFnMock = jest.fn();
    saveCompanionPassengerFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show progress bar', () => {
    const { container } = createComponent();

    expect(container.querySelector('.step-item--inner')).toMatchSnapshot();
  });

  it('should show passenger form', () => {
    const { container } = createComponent();

    expect(container.querySelector('.companion-personal-form')).toMatchSnapshot();
  });

  it('should passing correct companion info prop to companion passenger form', () => {
    const { container } = createComponent();

    expect(container.querySelector('.companion-personal-info')).toMatchSnapshot();
  });

  it('should passing correct props for CompanionPassengerForm', () => {
    const { container } = createComponent();

    expect(container.querySelector('.nav-item-field-value').textContent).toEqual(
      `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_EMAIL')}, a@gmail.com`
    );
  });

  it('should transition to contact method page when click contact method block', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('.contact-method .nav-item-field'));

    expect(pushMock).toHaveBeenCalledWith('/companion/contact-method');
  });

  it('should transition to special assistance page when click special assistance block', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('.special-assistance-item'));

    expect(pushMock).toHaveBeenCalledWith('/companion/special-assistance');
  });

  it('should now transition directly to purchase page when user click continue button', () => {
    const saveCompanionPassengerFnMock = jest.fn();
    const instance = React.createRef();
    const props = {
      saveCompanionPassengerFn: saveCompanionPassengerFnMock,
      fetchSavedCreditCardsAndGoToNextPageFn: fetchSavedCreditCardsAndGoToNextPageFnMock
    };

    createComponent({ ...props, ref: instance });

    const mockData = {
      contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_EMAIL')}, a@gmail.com`,
      emailReceiptTo: 'aterris@example.com',
      knownTravelerNumber: '12345678',
      redressNumber: '123456',
      shareItineraryEmail: 'test@test.com'
    };

    instance.current._onSubmit({ mockData });

    expect(fetchSavedCreditCardsAndGoToNextPageFnMock).toHaveBeenCalledWith('/companion/purchase');
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      push: pushMock,
      saveCompanionPassengerFn: saveCompanionPassengerFnMock,
      contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_EMAIL')}, a@gmail.com`,
      declineNotifications: false,
      isInternationalBooking: false,
      fetchSavedCreditCardsAndGoToNextPageFn: fetchSavedCreditCardsAndGoToNextPageFnMock,
      formData: {
        emailReceiptTo: 'aterris@example.com',
        shareItineraryEmail: 'test@test.com',
        redressNumber: '123456',
        knownTravelerNumber: '12345678'
      },
      companionInfo: {
        name: 'Companion Fang',
        gender: 'F',
        dateOfBirth: '1995-02-05'
      },
      savedCreditCards: {
        primaryCard: null,
        otherCards: []
      },
      specialAssistanceSelections: {}
    };

    return render(
      <Provider store={createMockedFormStore()}>
        <CompanionPassengerPage {...defaultProps} {...props} />
      </Provider>
    );
  };
});
