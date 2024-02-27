import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ConnectedPage, { ContactTracingPage } from '../contactTracingPage';
import UpdateAPIsTransformers from 'src/checkIn/transformers/updateAPIsTransformer';
import * as AnalyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { integrationMount } from 'test/unit/helpers/testUtils';

const DIALOG_OK_BUTTON_INDEX = 0;
const passengers = [
  {
    destination: {
      city: 'Beverly Hills',
      country: 'US',
      stateProvinceRegion: 'CA',
      streetAddress: '123 Fake Street',
      zipOrPostalCode: '90210'
    },
    contactEmail: 'example@wnco.com',
    contactPhone1: {
      countryCode: '1',
      number: '3115552310'
    },
    contactPhone2: {
      countryCode: '42',
      number: '311555123456'
    },
    name: 'John Doe',
    passengerId: 'eyJmaXJzdE5hbWUiOiJO-passenger-1'
  },
  {
    destination: {
      city: 'Beverly Hills',
      country: 'US',
      stateProvinceRegion: 'CA',
      streetAddress: '123 Fake Street',
      zipOrPostalCode: '90210'
    },
    contactEmail: 'example@wnco.com',
    contactPhone1: {
      countryCode: '1',
      number: '3115552310'
    },
    contactPhone2: {
      countryCode: '42',
      number: '311555123456'
    },
    name: 'Jane Doe',
    passengerId: 'eyJmaXJzdE5hbWUiOiJO-passenger-2'
  }
];
const passengerProps = { passengers };

describe('Contact Tracing Page', () => {
  let defaultProps;
  let exitWebViewFnMock;
  let goBackMock;
  let hideDialogFnMock;
  let resetFlowFnMock;
  let retrieveContractTracingFnMock;
  let showDialogFnMock;
  let updateContactTracingFnMock;
  let updateFormDataValueFnMock;
  let updatePassengerIndexFnMock;
  let updatePassengerToApplyToAllFnMock;

  beforeEach(() => {
    exitWebViewFnMock = jest.fn();
    goBackMock = jest.fn();
    hideDialogFnMock = jest.fn(() => Promise.resolve());
    resetFlowFnMock = jest.fn();
    retrieveContractTracingFnMock = jest.fn();
    showDialogFnMock = jest.fn();
    updateContactTracingFnMock = jest.fn();
    updateFormDataValueFnMock = jest.fn();
    updatePassengerIndexFnMock = jest.fn();
    updatePassengerToApplyToAllFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const clickDialogButton = async (buttonIndex) => {
    await showDialogFnMock.mock.calls[0][0].buttons[buttonIndex].onClick();
  };

  it('should load when search link is present', () => {
    const confirmationNumber = 'ABC123';
    const link = { method: 'GET' };

    createComponent({
      currentConfirmationNumber: null,
      search: {
        confirmationNumber,
        link
      }
    });

    expect(retrieveContractTracingFnMock).toHaveBeenCalledWith({ confirmationNumber, link });
    expect(resetFlowFnMock).toHaveBeenCalled();
  });

  it('should load when a location state link is present ', () => {
    const confirmationNumber = 'ABC123';
    const link = { method: 'GET' };

    createComponent({
      location: {
        pathname: '',
        state: { confirmationNumber, link }
      },
      search: {}
    });

    expect(retrieveContractTracingFnMock).toHaveBeenCalledWith({ confirmationNumber, link });
    expect(resetFlowFnMock).toHaveBeenCalled();
  });

  it('loaded state for webview', () => {
    const { container } = createComponent({
      ...passengerProps,
      isWebView: true,
      passengerIndex: 1
    });

    expect(container).toMatchSnapshot();
  });

  it('should map redux state to props', () => {
    const passengerIndex = 4;
    const search = {
      confirmationNumber: 'ABC123'
    };
    const updateLink = { method: 'POST' };

    const state = {
      app: {
        webView: {
          isWebView: true
        },
        contactTracing: {
          detailPage: {
            response: {
              confirmationNumber: 'ABC123',
              passengers,
              _links: {
                contactTracingUpdate: updateLink
              }
            },
            passengerIndex,
            search
          }
        }
      }
    };

    const expectedProps = {
      isWebView: true,
      passengers,
      passengerIndex,
      updateLink,
      search
    };

    const component = integrationMount({})(state, ConnectedPage, {}).find('ContactTracingPage');
    const pickedProps = Object.keys(component.props())
      .filter((key) => Object.keys(expectedProps).includes(key))
      .reduce((object, key) => {
        object[key] = component.props()[key];

        return object;
      }, {});

    expect(pickedProps).toEqual(expectedProps);
  });

  describe('when supporting analytics', () => {
    beforeEach(() => {
      jest.spyOn(AnalyticsEventHelper, 'raiseSatelliteEvent');
    });

    it('should send contact tracing as param', () => {
      createComponent();

      expect(AnalyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalledWith('TOOL:CHCK:contact tracing');
    });
  });

  describe('loaded state for first passenger', () => {
    let contactTracingPageComponent;

    beforeEach(() => {
      jest.spyOn(UpdateAPIsTransformers, 'transformDestinationFormData');
    });

    it('should render', () => {
      const { container } = createComponent({
        ...passengerProps,
        isWebView: true,
        passengerIndex: 0
      });

      expect(container).toMatchSnapshot();
    });

    it('should save and continue to next passenger on submit', () => {
      contactTracingPageComponent = createComponent({
        ...passengerProps,
        isWebView: true,
        passengerIndex: 0
      });

      fireEvent.submit(contactTracingPageComponent.getByRole('submit'));

      const [onComplete, data] = defaultProps.updateContactTracingFn.mock.calls[0];

      expect(data).toEqual({
        link: { method: 'POST' },
        update: {
          contactEmail: 'example@wnco.com',
          contactPhone1: { countryCode: '1', number: '3115552310' },
          contactPhone2: { countryCode: '42', number: '311555123456' },
          destination: {
            city: 'Beverly Hills',
            country: 'US',
            stateProvinceRegion: 'CA',
            streetAddress: '123 Fake Street',
            zipOrPostalCode: '90210'
          },
          passengerId: 'eyJmaXJzdE5hbWUiOiJO-passenger-1'
        }
      });

      expect(UpdateAPIsTransformers.transformDestinationFormData).toHaveBeenCalledWith({
        addressLine: '123 Fake Street',
        city: 'Beverly Hills',
        contactEmail: 'example@wnco.com',
        contactPhone1CountryCode: '1',
        contactPhone1Number: '311-555-2310',
        contactPhone2CountryCode: '42',
        contactPhone2Number: '311555123456',
        isoCountryCode: 'US',
        stateProvinceRegion: 'CA',
        zipOrPostalCode: '90210'
      });

      onComplete();

      expect(updatePassengerIndexFnMock).toHaveBeenCalledWith(1);
      expect(resetFlowFnMock).toHaveBeenCalled();
      expect(goBackMock).not.toHaveBeenCalled();
    });

    it('should skip passenger', () => {
      contactTracingPageComponent = createComponent({
        ...passengerProps,
        isWebView: true,
        passengerIndex: 0
      });

      fireEvent.click(contactTracingPageComponent.getByText('SHARED__BUTTON_TEXT__SKIP'));

      expect(updatePassengerIndexFnMock).toHaveBeenCalledWith(1);
      expect(resetFlowFnMock).toHaveBeenCalled();
      expect(goBackMock).not.toHaveBeenCalled();
      expect(updateContactTracingFnMock).not.toHaveBeenCalled();
    });
  });

  describe('loaded state for final passenger', () => {
    let contactTracingPageComponent;

    describe('not WebView', () => {
      it('should render', () => {
        contactTracingPageComponent = createComponent({
          ...passengerProps,
          isWebView: false,
          passengerIndex: 1
        });

        expect(contactTracingPageComponent).toMatchSnapshot();
      });

      it('should save and show success dialog', () => {
        contactTracingPageComponent = createComponent({
          ...passengerProps,
          isWebView: false,
          passengerIndex: 1
        });

        fireEvent.submit(contactTracingPageComponent.getByRole('submit'));

        const [onComplete, data] = defaultProps.updateContactTracingFn.mock.calls[0];

        expect(data).toEqual({
          link: { method: 'POST' },
          update: {
            contactEmail: 'example@wnco.com',
            contactPhone1: {
              countryCode: '1',
              number: '3115552310'
            },
            contactPhone2: {
              countryCode: '42',
              number: '311555123456'
            },
            destination: {
              city: 'Beverly Hills',
              country: 'US',
              stateProvinceRegion: 'CA',
              streetAddress: '123 Fake Street',
              zipOrPostalCode: '90210'
            },
            passengerId: 'eyJmaXJzdE5hbWUiOiJO-passenger-2'
          }
        });

        onComplete('key');

        expect(showDialogFnMock).toHaveBeenCalled();
      });

      it('should exitWebView on cancel if loads on device', () => {
        contactTracingPageComponent = createComponent({
          ...passengerProps,
          isWebView: false,
          passengerIndex: 1
        });

        fireEvent.click(contactTracingPageComponent.getByText('SHARED__BUTTON_TEXT__CANCEL'));

        expect(resetFlowFnMock).toHaveBeenCalledTimes(2);
        expect(goBackMock).toHaveBeenCalled();
        expect(exitWebViewFnMock).not.toHaveBeenCalled();
      });

      it('should go back on cancel', () => {
        contactTracingPageComponent = createComponent({
          ...passengerProps,
          isWebView: false,
          passengerIndex: 1
        });

        fireEvent.click(contactTracingPageComponent.getByText('SHARED__BUTTON_TEXT__CANCEL'));

        expect(resetFlowFnMock).toHaveBeenCalledTimes(2);
        expect(goBackMock).toHaveBeenCalled();
        expect(updatePassengerIndexFnMock).not.toHaveBeenCalled();
        expect(updateContactTracingFnMock).not.toHaveBeenCalled();
      });

      it('should close the modal after form submission and the OK button is clicked', async () => {
        contactTracingPageComponent = createComponent({
          ...passengerProps,
          isWebView: false,
          passengerIndex: 1
        });

        fireEvent.submit(contactTracingPageComponent.getByRole('submit'));
        const [onComplete] = defaultProps.updateContactTracingFn.mock.calls[0];

        onComplete();

        await clickDialogButton(DIALOG_OK_BUTTON_INDEX);

        expect(hideDialogFnMock).toHaveBeenCalled();
      });
    });

    describe('webView', () => {
      it('should exit webView on cancel', () => {
        contactTracingPageComponent = createComponent({
          ...passengerProps,
          isWebView: true,
          passengerIndex: 1
        });

        fireEvent.click(contactTracingPageComponent.getByText('SHARED__BUTTON_TEXT__CANCEL'));

        expect(resetFlowFnMock).toHaveBeenCalledTimes(2);
        expect(exitWebViewFnMock).toHaveBeenCalled();
        expect(updatePassengerIndexFnMock).not.toHaveBeenCalled();
        expect(updateContactTracingFnMock).not.toHaveBeenCalled();
      });
    });
  });

  const createComponent = (props) => {
    defaultProps = {
      currentConfirmationNumber: 'ABC123',
      destinationConfig: {
        contactEmailRequired: false,
        contactPhone1Required: false,
        contactPhone2Required: false
      },
      exitWebViewFn: exitWebViewFnMock,
      goBack: goBackMock,
      hideDialogFn: hideDialogFnMock,
      location: {
        pathname: ''
      },
      resetFlowFn: resetFlowFnMock,
      retrieveContractTracingFn: retrieveContractTracingFnMock,
      search: {
        link: 'TEST_LINK'
      },
      showDialogFn: showDialogFnMock,
      updateContactTracingFn: updateContactTracingFnMock,
      updateFormDataValueFn: updateFormDataValueFnMock,
      updateLink: { method: 'POST' },
      updatePassengerIndexFn: updatePassengerIndexFnMock,
      updatePassengerToApplyToAllFn: updatePassengerToApplyToAllFnMock
    };
    const combinedProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <BrowserRouter>
        <Provider store={createMockedFormStore()}>
          <ContactTracingPage {...combinedProps} />
        </Provider>
      </BrowserRouter>
    );
  };
});
