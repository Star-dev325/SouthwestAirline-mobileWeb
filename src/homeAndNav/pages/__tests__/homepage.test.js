jest.mock('@swa-ui/geolocation', () => ({
  useGeolocation: jest.fn().mockReturnValue({
    nearestStation: 'DAL'
  })
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn().mockReturnValue({ current: undefined })
}));

import { cleanup, fireEvent } from '@testing-library/react';
import homeNavMenu from 'mocks/templates/content-delivery/homeNavMenu';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { DEFAULT_OFFERS } from 'src/chase/constants/chaseConstants';
import { Homepage } from 'src/homeAndNav/pages/homepage';
import { CAR } from 'src/myAccount/constants/upcomingTripType';
import * as AnalyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import BrowserObject from 'src/shared/helpers/browserObject';
import deviceInfo from 'src/shared/helpers/deviceInfo';
import { noop } from 'src/shared/helpers/jsUtils';
import { mockErrorHeaderContainerWithJest } from 'test/unit/helpers/testUtils';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

const { window } = BrowserObject;

describe('Homepage', () => {
  let clearFlightReservationFnMock,
    clearUpcomingTripsCountFnMock,
    getAccountUpcomingTripsFnMock,
    getTravelAdvisoriesFnMock,
    handleFirmOfferOfCreditFnMock,
    loadHomepagePlacementsFnMock,
    pushMock,
    raiseSatelliteEventMock,
    resetHeroContentsFnMock,
    retrieveCarReservationFnMock,
    retrieveHomepagePromotionsFnMock,
    setTripTypeForDetailsPageFnMock,
    updateChaseAnalyticsCodesFnMock;

  beforeEach(() => {
    mockErrorHeaderContainerWithJest(jest);
    clearFlightReservationFnMock = jest.fn();
    clearUpcomingTripsCountFnMock = jest.fn();
    getAccountUpcomingTripsFnMock = jest.fn();
    getTravelAdvisoriesFnMock = jest.fn();
    handleFirmOfferOfCreditFnMock = jest.fn();
    loadHomepagePlacementsFnMock = jest.fn();
    pushMock = jest.fn();
    raiseSatelliteEventMock = jest.spyOn(AnalyticsEventHelper, 'raiseSatelliteEvent');
    resetHeroContentsFnMock = jest.fn();
    retrieveCarReservationFnMock = jest.fn().mockResolvedValue({});
    retrieveHomepagePromotionsFnMock = jest.fn();
    setTripTypeForDetailsPageFnMock = jest.fn();
    updateChaseAnalyticsCodesFnMock = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    const { container } = createComponent({}, []);

    expect(container).toMatchSnapshot();
  });

  describe('when a user is not logged in', () => {
    it('should not display page header', () => {
      const { container } = createComponent({ isLoggedIn: false });

      expect(container).toMatchSnapshot();
    });
  });

  describe('when a user is logged in', () => {
    it('should display page header', () => {
      const { container } = createComponent({ isLoggedIn: true, name: 'Ron' });

      expect(container).toMatchSnapshot();
    });

    it('should transition to the upcoming trips list page if more than 1 upcoming trip', () => {
      const { container } = createComponent({ upcomingTripsCount: 2 });

      fireEvent.click(container.querySelector('div.my-account-nav-item'));

      expect(pushMock).toHaveBeenCalled();
    });

    describe('upcoming trips count', () => {
      it('should display when count is 2', () => {
        const { container } = createComponent({ isLoggedIn: true, name: 'Ron', upcomingTripsCount: 2 });
        
        expect(container).toMatchSnapshot();
      });

      it('should display when count is 1', () => {
        const { container } = createComponent({ isLoggedIn: true, name: 'Ron', upcomingTripsCount: 1 });

        expect(container).toMatchSnapshot();
      });

      it('should transition to upcomingTrips page when click', () => {
        const givenTrip = {
          tripType: 'FLIGHT',
          confirmationNumber: 'TEST01',
          dates: {
            first: 'a date',
            second: null
          },
          destinationDescription: '',
          pages: null,
          isWithin24Hours: false,
          isWithin48Hours: false,
          _links: {
            viewReservationViewPage: {
              href: '/som/TEST01',
              query: {
                'first-name': 'Test',
                'last-name': 'Haha'
              }
            }
          }
        };

        const { container } = createComponent({
          isLoggedIn: true,
          name: 'Ron',
          upcomingTripsCount: 2,
          trip: givenTrip
        });

        fireEvent.click(container.querySelector('.my-account-nav-item'));

        expect(pushMock).toHaveBeenCalled();
      });

      it('should clear the upcoming trips count and reset hero contents when we leave homePage', () => {
        const { unmount } = createComponent();

        unmount();

        expect(clearUpcomingTripsCountFnMock).toHaveBeenCalled();
        expect(resetHeroContentsFnMock).toHaveBeenCalled();
      });
    });

    describe('TravelAdvisory', () => {
      it('should call TravelAdvisory Stub', async () => {
        createComponent();

        expect(getTravelAdvisoriesFnMock).toHaveBeenCalled();
      });

      it('should transition to travel advisory details page if only have one travel advisory', () => {
        const { container } = createComponent({
          travelAdvisories: [
            {
              advisoryInfo: 'advisory one',
              advisoryTitle: 'advisory one title',
              id: '67890'
            }
          ]
        });

        fireEvent.click(container.querySelector('.travel-advisory-nav-item'));

        expect(pushMock).toHaveBeenCalled();
      });

      it('should transition to travel advisories list page if have more than one travel advisory', () => {
        const { container } = createComponent({
          travelAdvisories: [
            {
              advisoryInfo: 'advisory two',
              advisoryTitle: 'advisory two title',
              id: '123456'
            }
          ]
        });

        fireEvent.click(container.querySelector('.travel-advisory-nav-item'));

        expect(pushMock).toHaveBeenCalled();
        expect(getTravelAdvisoriesFnMock).toHaveBeenCalled();
      });

      it('should not display travel advisory nav item if there is no travel advisory', () => {
        const { container } = createComponent();

        expect(container).toMatchSnapshot();
      });
    });

    describe('HomeNavGrid', () => {
      it('should call navGridItemClick', () => {
        const { container } = createComponent({ homePagePromotions });

        fireEvent.click(container.querySelectorAll('.home-nav-grid-item')[0]);

        expect(pushMock).toHaveBeenCalled();
      });
    });

    describe('HomeNavList', () => {
      it('should call raiseSatelliteEvent when android or ios', () => {
        const { container } = createComponent({ homePagePromotions });

        fireEvent.click(container.querySelectorAll('.rich-nav-item--link')[3]);

        expect(raiseSatelliteEventMock).toHaveBeenCalledWith('squid', { pagedescription: 'link:get the app' });
      });

      it('should not call raiseSatelliteEvent when android or ios target value is empty', () => {
        const { container } = createComponent({ homePagePromotions });

        fireEvent.click(container.querySelectorAll('.rich-nav-item--link')[0]);

        expect(raiseSatelliteEventMock).not.toHaveBeenCalled();
      });
    });

    describe('when there is 1 upcoming trips', () => {
      it('should transition to the upcoming trip details page for a flight reservation', () => {
        const givenTrip = {
          tripType: 'FLIGHT',
          confirmationNumber: 'TEST01',
          dates: {
            first: 'a date',
            second: null
          },
          destinationDescription: '',
          pages: null,
          isWithin24Hours: false,
          isWithin48Hours: false,
          _links: {
            viewReservationViewPage: {
              href: '/som/TEST01',
              query: {
                'first-name': 'Test',
                'last-name': 'Haha'
              }
            }
          }
        };

        const { container } = createComponent({ trip: givenTrip, upcomingTripsCount: 1 });

        fireEvent.click(container.querySelector('.my-account-nav-item'));

        expect(setTripTypeForDetailsPageFnMock).toHaveBeenCalled();
        expect(clearFlightReservationFnMock).toHaveBeenCalled();
      });

      it('should transition to the upcoming trip details page for a car reservation', () => {
        const givenTrip = {
          tripType: CAR,
          confirmationNumber: '08460860US2',
          dates: {
            first: 'a date',
            second: null
          },
          destinationDescription: '',
          pages: null,
          isWithin24Hours: false,
          isWithin48Hours: false,
          _links: {
            carReservationDetails: {
              href: '/some/08460860US2',
              query: {
                'first-name': 'Test',
                'last-name': 'Haha',
                'pickup-date': '2017-10-24'
              }
            }
          }
        };

        const { container } = createComponent({ trip: givenTrip, upcomingTripsCount: 1 });

        fireEvent.click(container.querySelector('.my-account-nav-item'));

        expect(setTripTypeForDetailsPageFnMock).toHaveBeenCalled();
        expect(retrieveCarReservationFnMock).toHaveBeenCalled();
      });
    });
  });

  describe('when wcm call is successful', () => {
    it('should display three rich nav items', () => {
      deviceInfo.os.name = 'iOS';

      const { container } = createComponent({
        homePagePromotions
      });

      expect(loadHomepagePlacementsFnMock).toHaveBeenCalled();
      expect(container).toMatchSnapshot();
    });
  });

  describe('in-flight', () => {
    const homeProps = {
      push: noop,
      homePagePromotions: [],
      homeBanners: [],
      heroContents: [],
      upcomingTripsCount: 0,
      clearUpcomingTripsCountFn: noop,
      resetHeroContentsFn: noop,
      retrieveHomepagePromotionsFn: noop,
      loadHomepagePlacementsFn: noop,
      getAccountUpcomingTripsFn: noop,
      getTravelAdvisoriesFn: noop,
      trip: null,
      travelAdvisories: [],
      isLoggedIn: true,
      name: 'example',
      retrieveCarReservationFn: noop,
      clearFlightReservationFn: noop,
      setTripTypeForDetailsPageFn: noop,
      updateChaseAnalyticsCodesFn: noop,
      footerLinkRows: [],
      handleFirmOfferOfCreditFn: noop
    };

    it('should show the in flight entertainment menu when inFlightWifi is true', () => {
      window.swa = {
        inflight: true
      };

      const { container } = createComponent(homeProps, []);

      expect(container).toMatchSnapshot();
    });

    it('should hide the in flight entertainment menu when inFlightWifi is false', () => {
      window.swa = {
        inflight: false
      };

      const { container } = createComponent(homeProps, []);

      expect(container).toMatchSnapshot();
    });
  });

  describe('when retrieving segment ids and promotions', () => {
    it('should retrieve segment ids action', () => {
      createComponent();

      expect(loadHomepagePlacementsFnMock).toHaveBeenCalled();
    });
  });

  it('should show PageFooterWcmSourced by default', () => {
    const footerLinkRows = homeNavMenu.results.footer.content.placement.linkRows;

    const { container } = createComponent({}, footerLinkRows);

    expect(container).toMatchSnapshot();
  });

  it('should not show PageFooterWcmSourced when in a webview', () => {
    const footerLinkRows = homeNavMenu.results.footer.content.placement.linkRows;

    const { container } = createComponent({ isWebView: true }, footerLinkRows);

    expect(container).toMatchSnapshot();
  });

  it('should call the useEffect functions', () => {
    createComponent();

    expect(loadHomepagePlacementsFnMock).toHaveBeenCalledWith('DAL');
    expect(retrieveHomepagePromotionsFnMock).toHaveBeenCalled();
    expect(getTravelAdvisoriesFnMock).toHaveBeenCalled();

    cleanup();

    expect(clearUpcomingTripsCountFnMock).toHaveBeenCalled();
    expect(updateChaseAnalyticsCodesFnMock).toHaveBeenCalledWith(DEFAULT_OFFERS);
    expect(resetHeroContentsFnMock).toHaveBeenCalled();
  });

  it('should call loadHomepagePlacementsFn when ref.current is undefined', () => {
    const refMock = { current: undefined };

    React.useRef.mockReturnValue(refMock);
    createComponent();
    expect(loadHomepagePlacementsFnMock).toHaveBeenCalledTimes(1);
  });

  it('should call the loadHomepagePlacementsFn when isLoggedIn props has changeed', () => {
    const isLoggedIn = false;
    const refMock = { current: true };

    React.useRef.mockReturnValue(refMock);
    createComponent({ isLoggedIn }, []);
    expect(loadHomepagePlacementsFnMock).toHaveBeenCalledTimes(2);
  });

  it('should not call the loadHomepagePlacementsFn when isLoggedIn props has not changed', () => {
    const isLoggedIn = false;
    const refMock = { current: false };

    React.useRef.mockReturnValue(refMock);
    createComponent({ isLoggedIn }, []);
    expect(loadHomepagePlacementsFnMock).toHaveBeenCalledTimes(1);
  });

  const createComponent = (props = {}, footerLinkRows = []) => {
    const defaultProps = {
      homePagePromotions: [],
      homeBanners: [],
      heroContents: [],
      homepagePromotions: [],
      upcomingTripsCount: 0,
      trip: null,
      retrieveHomepagePromotionsFn: retrieveHomepagePromotionsFnMock,
      loadHomepagePlacementsFn: loadHomepagePlacementsFnMock,
      getAccountUpcomingTripsFn: getAccountUpcomingTripsFnMock,
      clearUpcomingTripsCountFn: clearUpcomingTripsCountFnMock,
      resetHeroContentsFn: resetHeroContentsFnMock,
      getTravelAdvisoriesFn: getTravelAdvisoriesFnMock,
      isLoggedIn: false,
      travelAdvisories: [],
      name: '',
      push: pushMock,
      retrieveCarReservationFn: retrieveCarReservationFnMock,
      clearFlightReservationFn: clearFlightReservationFnMock,
      setTripTypeForDetailsPageFn: setTripTypeForDetailsPageFnMock,
      updateChaseAnalyticsCodesFn: updateChaseAnalyticsCodesFnMock,
      handleFirmOfferOfCreditFn: handleFirmOfferOfCreditFnMock,
      footerLinkRows
    };

    const state = configureMockStore()({
      router: {
        location: {
          search: ''
        }
      }
    });
    const finalProps = { ...defaultProps, ...props };

    return integrationRender()(state, Homepage, finalProps);
  };
});

const homePagePromotions = [
  {
    id: 'promo01',
    title: 'Flying Southwest',
    description: 'Retrieve reservation, checkin for upcoming flights & more',
    'promotion-image': '/content/mkt/images/promotions/AboutRR_Icon_FPO.png',
    alt: 'Flying Southwest',
    link_type: 'webview',
    target: '/flying-southwest'
  },
  {
    id: 'promo02',
    title: 'Book a car with us',
    description: 'Great selection, unbeatable rates & Rapid Rewards',
    'promotion-image': '/images/homeAndNav/promo_car.43f3725b.svg',
    alt: 'Book a car with us',
    link_type: 'app',
    target: 'carbooking'
  },
  {
    id: 'promo03',
    title: 'Book a helicopter with us',
    description: 'Great selection, unbeatable rates & Rapid Rewards',
    'promotion-image': '/images/homeAndNav/promo_car.43f3725b.svg',
    alt: 'Book a helicopter with us',
    link_type: 'app',
    target: 'helicopterbooking'
  },
  {
    id: 'iosPromo',
    title: 'iOS',
    description: 'description of iOS',
    alt: 'test alt',
    link_type: 'app',
    target: 'https://itunes.apple.com/us/app/southwest-airlines/id344542975'
  }
];
