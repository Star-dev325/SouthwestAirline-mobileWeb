jest.mock('src/shared/actions/dialogActions');
jest.mock('src/sameDay/actions/sameDayActions');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn((x) => [x, () => {}])
}));

import React, { useState } from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'test/unit/helpers/configureMockStore';
import SameDayShoppingPage from 'src/sameDay/pages/sameDayShoppingPage';
import SameDayShoppingPageResponseBuilder from 'test/builders/apiResponse/sameDayBuilder';
import * as sameDayActions from 'src/sameDay/actions/sameDayActions';
import * as sameDayHelper from 'src/sameDay/helpers/sameDayModalHelper';
import * as sameDayShoppingSortFilterHelper from 'src/sameDay/helpers/sameDayShoppingSortFilterHelper';
import * as dialogActions from 'src/shared/actions/dialogActions';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';

describe('sameDayShoppingPage', () => {
  let applySameDayShoppingPageSortFilterMock;
  let hideDialogMock;
  let retrieveSameDayFlightDetailsInformationMock;
  let retrieveSameDayPricingDetailsInformationMock;
  let saveChangeFlowMock;
  let selectFareFnMock;
  let setExpandedCardsMock;
  let showDialogMock;

  beforeEach(() => {
    hideDialogMock = dialogActions.hideDialog.mockImplementationOnce(() => () => Promise.resolve({ type: 'hide' }));
    jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
    retrieveSameDayFlightDetailsInformationMock =
      sameDayActions.retrieveSameDayFlightDetailsInformation.mockImplementationOnce(
        () => () => Promise.resolve({ type: 'retrieve' })
      );
    retrieveSameDayPricingDetailsInformationMock =
      sameDayActions.retrieveSameDayPricingDetailsInformation.mockImplementationOnce(() => ({ type: 'retrieve' }));
    applySameDayShoppingPageSortFilterMock = sameDayActions.applySameDayShoppingPageSortFilter.mockImplementationOnce(
      () => ({ type: 'apply' })
    );
    saveChangeFlowMock = sameDayActions.saveChangeFlow.mockImplementationOnce(() => jest.fn());
    selectFareFnMock = sameDayActions.selectFare.mockImplementationOnce(() => ({ type: 'Select Fare' }));
    setExpandedCardsMock = jest.fn();
    showDialogMock = dialogActions.showDialog.mockImplementationOnce(() => ({ type: 'show' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Same day shopping page', () => {
    const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
    const state = { app: { sameDay: { sameDayShoppingPage } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render Same day shopping page with no disclaimer', () => {
    const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().withOutDisclaimer().build();
    const state = { app: { sameDay: { sameDayShoppingPage } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render Same day shopping page with no StandbyListFAQs', () => {
    const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().withOutStandbyListFAQs().build();
    const state = { app: { sameDay: { sameDayShoppingPage } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render Same day shopping page when originAirport is empty', () => {
    const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().withOutOriginAirport().build();
    const state = { app: { sameDay: { sameDayShoppingPage } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render Same day shopping page when DestinationAirport is empty', () => {
    const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().withOutDestinationAirport().build();
    const state = { app: { sameDay: { sameDayShoppingPage } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render Same day shopping page when Cards is empty', () => {
    const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().withOutCards().build();
    const state = { app: { sameDay: { sameDayShoppingPage } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render Same day shopping page with expanded product details', async () => {
    useState.mockImplementationOnce(() => [{ 0: true }, setExpandedCardsMock]);
    const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
    const state = { app: { sameDay: { sameDayShoppingPage } } };

    await act(async () => {
      const { container } = createComponent({}, state);

      fireEvent.click(container.querySelectorAll('.flight-product--container')[1]);

      expect(container).toMatchSnapshot();
    });
  });

  it('should not render Same day shopping page when expanded product details', async () => {
    const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
    const state = { app: { sameDay: { sameDayShoppingPage } } };

    await act(async () => {
      const { container } = createComponent({}, state);

      fireEvent.click(container.querySelectorAll('.flight-product--container')[1]);

      expect(retrieveSameDayPricingDetailsInformationMock).not.toHaveBeenCalled();
    });
  });

  it('should render standby checked baggage', async () => {
    useState.mockImplementationOnce(() => [{ 0: true }, setExpandedCardsMock]);
    const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
    const state = { app: { sameDay: { sameDayShoppingPage } } };
    const { container } = createComponent({}, state);

    await act(async () => {
      fireEvent.click(container.querySelectorAll('.flight-product--container')[1]);
    });

    await act(async () => {
      fireEvent.click(container.querySelector('.flight-product-drop--header_content-standby'));
    });

    expect(container).toMatchSnapshot();
  });

  it('should fire Satellite analytics event when standby checked baggage popup is displayed', async () => {
    useState.mockImplementationOnce(() => [{ 0: true }, setExpandedCardsMock]);
    const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
    const state = { app: { sameDay: { sameDayShoppingPage } } };
    const { container } = createComponent({}, state);

    await act(async () => {
      fireEvent.click(container.querySelectorAll('.flight-product--container')[1]);
    });

    await act(async () => {
      fireEvent.click(container.querySelector('.flight-product-drop--header_content-standby'));
    });

    expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalledWith('squid', {
      page_description: 'modal: baggage display'
    });
  });

  describe('standbyListFAQs', () => {
    it('should open Faq modal', () => {
      const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
      const state = { app: { sameDay: { sameDayShoppingPage } } };
      const { container } = createComponent({}, state);

      fireEvent.click(container.querySelector('.same-day-shopping-page--standby-faq-link_suffix-text'));

      expect(showDialogMock).toHaveBeenCalled();
    });

    it('should call showDialogFn with correct options when standbyListFAQs is available and suffix text clicked', () => {
      jest.spyOn(sameDayHelper, 'getShowStandbyDialogOptions').mockReturnValueOnce({});
      const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
      const state = { app: { sameDay: { sameDayShoppingPage } } };
      const { container } = createComponent({}, state);

      fireEvent.click(container.querySelector('.same-day-shopping-page--standby-faq-link_suffix-text'));

      expect(showDialogMock).toHaveBeenCalledWith({});
    });

    it('should call hideDialogFn when got it button is clicked in the modal', async () => {
      const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
      const state = { app: { sameDay: { sameDayShoppingPage } } };
      const { container } = createComponent({}, state);

      fireEvent.click(container.querySelector('.same-day-shopping-page--standby-faq-link_suffix-text'));

      act(() => {
        showDialogMock.mock.calls[0][0].verticalLinks.links[0].onClick();
      });

      expect(hideDialogMock).toHaveBeenCalled();
    });

    it('should call hideDialogFn when see stand by faqs button is clicked in the modal', async () => {
      const openMock = jest.spyOn(window, 'open').mockImplementation(jest.fn());
      const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
      const state = { app: { sameDay: { sameDayShoppingPage } } };
      const { container } = createComponent({}, state);

      fireEvent.click(container.querySelector('.same-day-shopping-page--standby-faq-link_suffix-text'));

      await act(async () => {
        showDialogMock.mock.calls[0][0].verticalLinks.links[1].onClick();
      });

      expect(hideDialogMock).toHaveBeenCalled();
      expect(openMock).toHaveBeenCalledWith(
        'https://www.southwest.com/airfare-types-benefits/sameday-standbychange?clk=STNDBY_FAQ_MODAL',
        '_blank'
      );
    });

    it('should fire Satellite analytics event when standby FAQ modal is opened', () => {
      const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
      const state = { app: { sameDay: { sameDayShoppingPage } } };
      const { container } = createComponent({}, state);

      fireEvent.click(container.querySelector('.same-day-shopping-page--standby-faq-link_suffix-text'));

      expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalledWith('squid', {
        page_description: 'modal: sdc/sb view standby faqs'
      });
    });
  });

  describe('sort/filter', () => {
    it('should open sort/filter modal', () => {
      const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
      const state = { app: { sameDay: { sameDayShoppingPage } } };
      const { container } = createComponent({}, state);

      fireEvent.click(container.querySelector('.same-day-shopping-page--sort-filter-button-text'));

      expect(showDialogMock).toHaveBeenCalled();
    });

    it('should call showDialogFn with correct options when sort/filter is available and button is clicked', () => {
      jest.spyOn(sameDayShoppingSortFilterHelper, 'getShowSortFilterDialogOptions').mockReturnValueOnce({});
      const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
      const state = { app: { sameDay: { sameDayShoppingPage } } };
      const { container } = createComponent({}, state);

      fireEvent.click(container.querySelector('.same-day-shopping-page--sort-filter-button-text'));

      expect(showDialogMock).toHaveBeenCalledWith({});
    });

    it('should call hideDialogFn when confirm and apply button is clicked in the modal', async () => {
      const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
      const state = { app: { sameDay: { sameDayShoppingPage } } };
      const { container } = createComponent({}, state);

      fireEvent.click(container.querySelector('.same-day-shopping-page--sort-filter-button-text'));

      act(() => {
        showDialogMock.mock.calls[0][0].buttons[0].onClick();
      });

      expect(applySameDayShoppingPageSortFilterMock).toHaveBeenCalled();
      expect(hideDialogMock).toHaveBeenCalled();
    });

    it('should fire Satellite analytics event when sort/filter modal is opened', () => {
      const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
      const state = { app: { sameDay: { sameDayShoppingPage } } };
      const { container } = createComponent({}, state);

      fireEvent.click(container.querySelector('.same-day-shopping-page--sort-filter-button-text'));

      expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalledWith('squid', {
        page_description: 'modal: sdc/sb sort filter'
      });
    });
  });

  describe('Price difference page', () => {
    it('should call price difference', async () => {
      useState.mockImplementationOnce(() => [{ 0: true }, setExpandedCardsMock]);
      const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
      const state = { app: { sameDay: { sameDayShoppingPage } } };
      const { container } = createComponent({}, state);

      await act(async () => {
        fireEvent.click(container.querySelectorAll('.flight-product--container')[1]);
      });

      await act(async () => {
        fireEvent.click(container.querySelector('.flight-product-drop--header_content-standby'));
      });

      await act(async () => {
        showDialogMock.mock.calls[0][0].buttons[1].onClick();
      });

      expect(retrieveSameDayPricingDetailsInformationMock).toHaveBeenCalled();
    });

    it('should not render standby checked baggage when confirmBaggageMessage is null', () => {
      const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().withoutConfirmBaggageMessage().build();
      const state = { app: { sameDay: { sameDayShoppingPage } } };
      const { container } = createComponent({}, state);

      fireEvent.click(container.querySelectorAll('.flight-product--container')[1]);

      waitFor(() => {
        fireEvent.click(container.querySelector('.flight-product-drop--header_content-standby'));

        expect(showDialogMock).not.toHaveBeenCalled();
      });
    });

    it('should render price difference when confirmBaggageMessage is null', () => {
      useState.mockImplementationOnce(() => [{ 0: true }, setExpandedCardsMock]);
      const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().withoutConfirmBaggageMessage().build();
      const mockRequestPayload = {
        body: sameDayShoppingPage.sameDayShoppingInformation._links.sameDayPricing.body,
        href: '/v1/mobile-air-operations/page/same-day/pricing/2UIXQR',
        method: 'POST'
      };
      const state = { app: { sameDay: { sameDayShoppingPage } } };
      const { container } = createComponent({}, state);

      fireEvent.click(container.querySelectorAll('.flight-product--container')[1]);

      waitFor(() => {
        fireEvent.click(container.querySelector('.flight-product-drop--header_content-standby'));

        expect(retrieveSameDayPricingDetailsInformationMock).toHaveBeenCalledWith(mockRequestPayload);
      });
    });

    it('should call price difference when allowSameDayChange is false', () => {
      useState.mockImplementationOnce(() => [{ 0: true }, setExpandedCardsMock]);
      const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().withoutAllowSameDayChange().build();
      const state = { app: { sameDay: { sameDayShoppingPage } } };
      const { container } = createComponent({}, state);

      fireEvent.click(container.querySelectorAll('.flight-product--container')[1]);

      fireEvent.click(container.querySelector('.button--blue'));

      waitFor(() => {
        showDialogMock.mock.calls[0][0].buttons[1].onClick();

        expect(retrieveSameDayPricingDetailsInformationMock).toHaveBeenCalled();
      });
    });

    it('should move to select fare page when change is selected', async () => {
      useState.mockImplementationOnce(() => [{ 0: true }, setExpandedCardsMock]);
      const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
      const state = { app: { sameDay: { sameDayShoppingPage } } };
      const { container } = createComponent({}, state);

      await act(async () => {
        fireEvent.click(container.querySelectorAll('.flight-product--container')[1]);
      });

      await act(async () => {
        fireEvent.click(container.querySelector('.flight-product-drop--header_content-change'));
      });

      await act(async () => {
        showDialogMock.mock.calls[0][0].buttons[1].onClick();
      });

      expect(selectFareFnMock).toHaveBeenCalled();
    });

    it('should call price difference without standby pricing details', async () => {
      useState.mockImplementationOnce(() => [{ 0: true }, jest.fn()]);
      const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().withoutStandbyPricing().build();
      const state = { app: { sameDay: { sameDayShoppingPage } } };
      const { container } = createComponent({}, state);

      await act(async () => {
        fireEvent.click(container.querySelectorAll('.flight-product--container')[1]);
      });

      await act(async () => {
        fireEvent.click(container.querySelector('.flight-product-drop--header_content-standby'));
      });

      await act(async () => {
        showDialogMock.mock.calls[0][0].buttons[1].onClick();
      });

      expect(retrieveSameDayPricingDetailsInformationMock).toHaveBeenCalled();
      expect(saveChangeFlowMock).toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      applySameDayShoppingPageSortFilterFn: applySameDayShoppingPageSortFilterMock,
      hideDialogFn: hideDialogMock,
      location: {},
      match: { params: '' },
      retrieveSameDayFlightDetailsInformationFn: retrieveSameDayFlightDetailsInformationMock,
      retrieveSameDayPricingDetailsInformationFn: retrieveSameDayPricingDetailsInformationMock,
      showDialogFn: showDialogMock,
      standbyListFAQs: true
    };
    const defaultState = {
      app: {
        errorHeader: {
          hasError: false,
          errorMessage: null
        },
        sameDay: {}
      },
      router: {
        location: {
          search: 'search'
        }
      }
    };
    const store = configureMockStore()({ ...defaultState, ...state });
    const mergedProps = { ...defaultProps, ...props };

    return render(
      <div>
        <Provider store={store}>
          <SameDayShoppingPage {...mergedProps} />
        </Provider>
      </div>
    );
  };
});
