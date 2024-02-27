jest.mock('src/shared/helpers/pathUtils', () => ({
  ...jest.requireActual('src/shared/helpers/pathUtils'),
  buildPathWithParamAndQuery: jest.fn()
}));
jest.mock('src/airBooking/selectors/flightConfirmationPageSelector', () => ({
  getFlightConfirmationPageSelector: jest.fn()
}));

import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FlightsPurchasePageBuilder from 'test/builders/apiResponse/flightsPurchasePageBuilder';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import ChaseAndPromoBannerContent from 'test/builders/apiResponse/v1/content-delivery/query/placements';
import { bottomPromo1, defaultBounds } from 'mocks/flexPlacement/purchaseConfirmationPagePlacements';
import { AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM, AIRBOOKING_PASSENGER_INFO_EDIT } from 'src/shared/constants/formIds';
import MockPromoBuilder from 'test/builders/model/mockPromoBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { mapStateToProps, PurchaseConfirmationPage } from 'src/airBooking/pages/purchaseConfirmationPage';
import { getFlightConfirmationPageSelector } from 'src/airBooking/selectors/flightConfirmationPageSelector';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';

describe('PurchaseConfirmationPage', () => {
  let response;
  let pushStub;
  let getConfirmationPagePlacementsFnStub;
  let removeSelectedCompanyFnStub;
  let displayAppReviewFnStub;
  let enableNavigationControlsFnStub;
  let exitWebViewStub;
  let clearFormDataByIdFnStub;
  let cleanUpFrequentTravelerSelectedFnStub;

  beforeEach(() => {
    pushStub = jest.fn();
    getConfirmationPagePlacementsFnStub = jest.spyOn(AirBookingActions, 'getConfirmationPagePlacements');
    removeSelectedCompanyFnStub = jest.fn();
    displayAppReviewFnStub = jest.fn();
    enableNavigationControlsFnStub = jest.fn();
    exitWebViewStub = jest.fn();
    clearFormDataByIdFnStub = jest.fn();
    cleanUpFrequentTravelerSelectedFnStub = jest.fn();

    response = new FlightsPurchasePageBuilder().build().flightConfirmationPage;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('component did mount', () => {
    it('should not call enableNavigationControlsFn or displayAppReviewFn when not in web view state', () => {
      createComponent({ isWebView: false });

      expect(getConfirmationPagePlacementsFnStub).toHaveBeenCalled();
      expect(enableNavigationControlsFnStub).not.toHaveBeenCalled();
      expect(displayAppReviewFnStub).not.toHaveBeenCalled();
      expect(clearFormDataByIdFnStub).toHaveBeenCalledWith(AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM, false);
      expect(clearFormDataByIdFnStub).toHaveBeenCalledWith(AIRBOOKING_PASSENGER_INFO_EDIT);
      expect(cleanUpFrequentTravelerSelectedFnStub).toHaveBeenCalled();
    });

    it('should call enableNavigationControlsFn and displayAppReviewFn when in web view state', () => {
      createComponent({ isWebView: true });

      expect(getConfirmationPagePlacementsFnStub).toHaveBeenCalled();
      expect(enableNavigationControlsFnStub).toHaveBeenCalledWith(false);
      expect(displayAppReviewFnStub).toHaveBeenCalled();
      expect(clearFormDataByIdFnStub).toHaveBeenCalledWith(AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM, false);
      expect(clearFormDataByIdFnStub).toHaveBeenCalledWith(AIRBOOKING_PASSENGER_INFO_EDIT);
      expect(cleanUpFrequentTravelerSelectedFnStub).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    it('should have a NavGroupItemLinks component', () => {
      const { container } = createComponent();

      expect(container.querySelectorAll('.link-bar').length).toEqual(4);
    });

    it('should show partial booking component when there is some passenger failed get the the confirmation', () => {
      const { container } = createComponent({
        failedPassengers: ['Amber Awesome'],
        _meta: {
          partialSuccess: true
        }
      });

      expect(container.querySelector('[data-qa="partial-booking"]')).toBeInTheDocument();
    });

    it('should exit webview when searching flights from partial booking component while in a webview', () => {
      const { container } = createComponent({
        failedPassengers: ['Amber Awesome'],
        _meta: {
          partialSuccess: true
        },
        isWebView: true
      });

      fireEvent.click(
        container.querySelector('[data-qa="partial-booking"]').querySelector('[data-qa="search-flight"]')
      );

      expect(exitWebViewStub).toHaveBeenCalled();
    });

    it('should show confirmation trip header', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should show FundResultsList', () => {
      const { container } = createComponent();

      expect(container.querySelector('.fund-results-list')).toBeInTheDocument();
    });

    it('should render MessageWithInstructions', () => {
      const { container } = createComponent();

      expect(container.querySelector('.trip-booked--content')).toMatchSnapshot();
      expect(container.querySelector('.info-banner--alert')).not.toBeInTheDocument();
    });

    it('should render warning InfoBanner', () => {
      response = new FlightsPurchasePageBuilder().withWarningIcon().build().flightConfirmationPage;
      const { container } = createComponent();

      expect(container.querySelector('.info-banner--alert')).toMatchSnapshot();
      expect(container.querySelector('.trip-booked--content')).not.toBeInTheDocument();
    });

    describe('should display auto provisioning message correctly', () => {
      it('should not show auto provisioning message if there is no auto provisioning message', () => {
        const { container } = createComponent({});

        expect(container.querySelector('.chase-auto-provisioning')).not.toBeInTheDocument();
      });

      it('should render auto provisioning message', () => {
        response = new FlightsPurchasePageBuilder().withChaseAutoProvisioningCard().build().flightConfirmationPage;
        const { container } = createComponent();

        expect(container.querySelector('.chase-auto-provisioning')).toBeInTheDocument();
      });
    });

    describe('should handle passport', () => {
      it('should not show passport InfoBanner if there is no passport required message', () => {
        const { container } = createComponent({});

        expect(container.querySelector('.purchase-confirmation--passport-link')).not.toBeInTheDocument();
      });

      it('should render passport required InfoBanner', () => {
        response = new FlightsPurchasePageBuilder().withPassportRequiredMessage().build().flightConfirmationPage;
        const { container } = createComponent();

        expect(container.querySelector('.info-banner')).toMatchSnapshot();
      });

      it('should transition to view reservation page', () => {
        response = new FlightsPurchasePageBuilder().withPassportRequiredMessage().build().flightConfirmationPage;
        const { container } = createComponent();

        buildPathWithParamAndQuery.mockImplementationOnce(() => '/view-reservation/trip-details/ABC123');

        fireEvent.click(container.querySelector('.purchase-confirmation--passport-link'));

        expect(pushStub).toHaveBeenCalledWith('/view-reservation/trip-details/ABC123', null, null, {
          firstName: 'Xin',
          lastName: 'Wang'
        });
      });

      it('should call pushStub function upon calling _onCompletePassportClick', () => {
        const instance = React.createRef();

        createComponent({ ref: instance });

        instance.current._onCompletePassportClick();

        expect(pushStub).toHaveBeenCalled();
      });
    });

    describe('should handle placements', () => {
      const shouldShallow = true;

      it('and not render promoTop01 if it does not exist', () => {
        const { container } = createComponent({ confirmationPagePlacements: {} });

        expect(container.querySelector('[data-qa="promoTop01"]')).not.toBeInTheDocument();
      });

      it('and render promoTop01 if it exists', () => {
        const promoTop01 = new ChaseAndPromoBannerContent().getContentOf('promoTop01');

        const { container } = createComponent({ confirmationPagePlacements: { promoTop01 } });

        expect(container.querySelector('[data-qa="promoTop01"]')).toMatchSnapshot();
      });

      it('and not render bottomPromo01 if it does not exist', () => {
        const { container } = createComponent();

        expect(container.querySelector('[data-qa="placement-link"]')).not.toBeInTheDocument();
      });

      it('and render bottomPromo01 if it exists', () => {
        const { container } = createComponent({ confirmationPagePlacements: { bottomPromo1 } });

        expect(container.querySelector('[data-qa="bottomPromo1"]')).toMatchSnapshot();
      });

      it('and render bottomPromo01 if trip is two way', () => {
        const instance = React.createRef();
        const { container } = createComponent({ bounds: defaultBounds, ref: instance });

        expect(container.querySelector('[data-qa="bottomPromo1"]')).toMatchSnapshot();
        expect(instance.current.getHotelUpsellTemplateData()).toEqual({
          IATA: 'CUN',
          checkinDate: '2021-11-07',
          checkoutDate: '2021-11-10'
        });
      });

      it('check template data if bounds is null', () => {
        const instance = React.createRef();

        createComponent({ bounds: null, ref: instance });

        expect(instance.current.getHotelUpsellTemplateData()).toEqual({
          IATA: '',
          checkinDate: '',
          checkoutDate: ''
        });
      });

      it('and render promoBottom01 if it exists', () => {
        const { container } = createComponent({
          confirmationPagePlacements: {
            promoBottom01: new MockPromoBuilder().withPromoTextContent('promoBottom01').build()
          }
        });

        expect(container.querySelector('[data-qa="promoBottom01"]')).toMatchSnapshot();
      });

      it('and not render promoBottom02 if _link.carBooking is not exists', () => {
        const { container } = createComponent({
          _links: {
            carBooking: null
          }
        });

        expect(container.querySelector('[data-qa="promoBottom02"]')).not.toBeInTheDocument();
      });

      it('and not render promoBottom02 if it is not exists', () => {
        const { container } = createComponent({
          confirmationPagePlacements: {}
        });

        expect(container.querySelector('[data-qa="promoBottom02"]')).not.toBeInTheDocument();
      });

      it('and render promoBottom02 if it exists', () => {
        const { container } = createComponent({
          confirmationPagePlacements: {
            promoBottom02: new MockPromoBuilder().withPromoTextContent('promoBottom02').build()
          }
        });

        expect(container.querySelector('[data-qa="promoBottom02"]')).toMatchSnapshot();
      });

      it('and render promoBottom03 if it exists', () => {
        const { container } = createComponent(
          {
            confirmationPagePlacements: {
              promoBottom03: new MockPromoBuilder().withPromoTextContent('promoBottom03').build()
            }
          },
          shouldShallow
        );

        expect(container.querySelector('[data-qa="promoBottom03"]')).toMatchSnapshot();
      });

      it('and render promoBottom04 if it exists', () => {
        const { container } = createComponent({
          confirmationPagePlacements: {
            promoBottom04: new MockPromoBuilder().withPromoTextContent('promoBottom04').build()
          }
        });

        expect(container.querySelector('[data-qa="promoBottom04"]')).toMatchSnapshot();
      });
    });
  });

  it('should render the confirmation header', () => {
    const { container } = createComponent();

    expect(container.querySelector('.confirmation-trip-header')).toBeInTheDocument();
  });

  describe('when corporate', () => {
    it('should not show company header section if there is no associated company', () => {
      const { container } = createComponent({});

      expect(container.querySelector('.company-name-banner')).not.toBeInTheDocument();
    });

    it('should show company header section if there is an associated company', () => {
      const { container } = createComponent({
        selectedCompanyName: 'Dunder Mifflin Paper Company'
      });

      expect(container.querySelector('.company-name-banner')).toBeInTheDocument();
    });

    it('should show IRN # if it exists', () => {
      const { container } = createComponent({ selectedIrn: 'IrnName' });

      expect(container.querySelector('.purchase-confirmation--irn-container')).toBeInTheDocument();
      expect(container.querySelector('.purchase-confirmation--irn').textContent).toEqual('IrnName');
    });

    it('should switch corporate token to leisure token when user lands on the confirmation page', () => {
      createComponent({ selectedCompanyName: 'Company Name', isWebView: false });

      expect(removeSelectedCompanyFnStub).toHaveBeenCalled();
    });

    describe('confirmationYoungTravelerSection', () => {
      it('should render confirmation young traveler section', () => {
        response = new FlightsPurchasePageBuilder().withYoungTravelerParentGuardianPnr().build().flightConfirmationPage;
        const { container } = createComponent();

        expect(container.querySelector('.confirmation-young-traveler-section')).toMatchSnapshot();
      });
    });
  });

  describe('mapStateToProps', () => {
    it('should return correct state properties', () => {
      const initialState = {
        app: {
          airBooking: {
            passengerInfos: [{ passengerInfo: { firstName: 'Xin', lastName: 'Wang' } }],
            selectedIrn: 'ABC123',
            confirmationPagePlacements: {
              promoBottom01: new MockPromoBuilder().withPromoTextContent('promoBottom01').build()
            }
          },
          account: {
            corporateInfo: {
              selectedCompany: {
                companyName: 'Mock Company'
              }
            }
          },
          webView: {
            isWebView: true
          }
        }
      };

      getFlightConfirmationPageSelector.mockImplementationOnce(() => {});

      expect(mapStateToProps(initialState).isWebView).toEqual(true);
      expect(mapStateToProps(initialState).confirmationPagePlacements).toEqual({
        promoBottom01: new MockPromoBuilder().withPromoTextContent('promoBottom01').build()
      });
    });

    it('should return default state', () => {
      getFlightConfirmationPageSelector.mockImplementationOnce(() => {});

      expect(mapStateToProps({}).isWebView).toEqual(false);
      expect(mapStateToProps({}).confirmationPagePlacements).toEqual({});
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      ...response,
      push: pushStub,
      getConfirmationPagePlacementsFn: getConfirmationPagePlacementsFnStub,
      prepareCarCrossSellFromQueryAndTransitionToCarBookingFn: jest.fn(),
      removeSelectedCompanyFn: removeSelectedCompanyFnStub,
      confirmationPagePlacements: {},
      isWebView: false,
      exitWebViewFn: exitWebViewStub,
      displayAppReviewFn: displayAppReviewFnStub,
      enableNavigationControlsFn: enableNavigationControlsFnStub,
      clearFormDataByIdFn: clearFormDataByIdFnStub,
      cleanUpFrequentTravelerSelectedFn: cleanUpFrequentTravelerSelectedFnStub,
      ref: null
    };

    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <PurchaseConfirmationPage {..._.merge({}, defaultProps, props)} ref={props.ref} />
        </BrowserRouter>
      </Provider>
    );
  };
});
