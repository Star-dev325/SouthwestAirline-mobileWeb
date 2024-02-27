jest.mock('src/shared/helpers/browserObject', () => ({
  ...jest.requireActual,
  location: { pathname: 'account' }
}));

import i18n from '@swa-ui/locale';
import { fireEvent } from '@testing-library/react';
import { MyAccountLandingPage } from 'src/myAccount/pages/myAccountLandingPage';
import UpcomingTripBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/upcoming-trips/upcomingTripBuilder';
import UpcomingTripsBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/upcoming-trips/upcomingTripsBuilder';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

describe('MyAccountLandingPage', () => {
  let clearFlightReservationFnMock;
  let getAccountInfoForLandingPageFnMock;
  let pushMock;
  let retrieveCarReservationFnMock;
  let setTripTypeForDetailsPageFnMock;

  beforeEach(() => {
    clearFlightReservationFnMock = jest.fn();
    getAccountInfoForLandingPageFnMock = jest.fn().mockResolvedValue('');
    pushMock = jest.fn();
    retrieveCarReservationFnMock = jest.fn().mockResolvedValue('');
    setTripTypeForDetailsPageFnMock = jest.fn().mockResolvedValue('');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('on mount', () => {
    describe('user is logged in', () => {
      it('should fetch user account info', () => {
        createPageComponent();

        expect(getAccountInfoForLandingPageFnMock).toHaveBeenCalled();
      });

      it('should render appropriate components', () => {
        const { container } = createPageComponent();

        expect(container.querySelector('[data-qa="user-name"]').textContent).toContain('Ben Lacy');
        expect(container.querySelector('[data-qa="rapid-rewards-number"]').textContent).toContain(
          `${i18n('MY_ACCOUNT__HEADER__RR_NUMBER')} 1234567890`
        );
      });

      it('should render unused funds panel if WCM response is present', () => {
        const { container } = createPageComponent();

        expect(container.querySelector('.unused-funds-panel--links')).not.toBeNull();
      });

      it('should render promo codes panel if WCM response is present', () => {
        const { container } = createPageComponent({ PROMO_CODE_IN_MY_ACCOUNT: true });

        expect(container).toMatchSnapshot();
      });

      it('should not render promo codes panel if PROMO_CODE_IN_MY_ACCOUNT is false and no WCM response is present', () => {
        const { container } = createPageComponent({ accountPagePlacements: null, PROMO_CODE_IN_MY_ACCOUNT: false });

        expect(container).toMatchSnapshot();
      });

      it('should not render unused funds panel if no WCM response is present', () => {
        const { container } = createPageComponent({ accountPagePlacements: null });

        expect(container).toMatchSnapshot();
      });

      it('and enrolled in RR it should render RapidRewardsPanelEnrolled panel and DynamicPlacement panel', () => {
        const { container } = createPageComponent();

        expect(container).toMatchSnapshot();
      });

      it('and not enrolled in RR it should render RapidRewardsPanelNotEnrolled', () => {
        const { container } = createPageComponent({ rapidRewardsDetails: { isEnrolledInRapidRewards: false } });

        expect(container).toMatchSnapshot();
      });

      it('should use i18n end of year content if present and tier status is pending', () => {
        const { container } = createPageComponent({ isTierStatusPending: true });

        expect(container.querySelector('[data-qa="end-of-year-message"]')).not.toBeNull();
        expect(container.querySelector('[data-qa="end-of-year-message"]').textContent).toContain(
          i18n('MY_ACCOUNT__PENDING_STATUS_TIER_TEXT')
        );
      });

      it('should not show end of year content if tier status is not pending', () => {
        const { container } = createPageComponent({ isTierStatusPending: false });

        expect(container.querySelector('[data-qa="end-of-year-message"]')).toBeNull();
      });

      it('should use promotionCount as 0 if there are no exclusivePromotions for the user', () => {
        createPageComponent({ exclusivePromotions: undefined });

        expect(createPageComponent({ exclusivePromotions: undefined })).toMatchSnapshot();
      });

      describe('click', () => {
        describe('RR Member', () => {
          it('should push to rapid rewards snapshot when click nav item', () => {
            const { container } = createPageComponent();

            fireEvent.click(container.querySelector('.tier-status-group'));

            expect(pushMock).toHaveBeenCalledWith('/my-account/my-rapid-rewards');
          });

          it('should push to tier benefits page when click view benefits link', () => {
            const { container } = createPageComponent();

            fireEvent.click(container.querySelector('[data-qa="view-benefits"]'));

            expect(pushMock).toHaveBeenCalledWith('/my-account/tier-benefits-page');
          });

          it('should push to exclusive promotions page when click nav item IsExclusivePromotionsHidden FALSE', () => {
            const { container } = createPageComponent({ IsExclusivePromotionsHidden: false });

            fireEvent.click(container.querySelector('div[data-qa="exclusive-promotions-item"]'));

            expect(pushMock).toHaveBeenCalledWith('/my-account/my-rapid-rewards/promotions');
          });

          it('should call the push function to navigate to the /travel-funds/look-up page when the View Funds button is clicked', () => {
            const { container } = createPageComponent({ UNUSED_FUNDS: true });

            fireEvent.click(container.querySelector('.unused-funds-panel--view-funds-button'));

            expect(pushMock).toHaveBeenCalledWith('/travel-funds/?clearFormData=false&clk=myaccounttravelfunds');
          });

          it('should call the push function to navigate to the /my-account/promo-codes page when the View Promo Codes button is clicked', () => {
            const { container } = createPageComponent({ PROMO_CODE_IN_MY_ACCOUNT: true });

            fireEvent.click(container.querySelector('div[data-qa="click-view-promo-codes"]'));

            expect(pushMock).toHaveBeenCalledWith('/my-account/promo-codes');
          });
        });

        describe('Non RR Member', () => {
          it('should push to RR enrollment when click enroll button', () => {
            const { container } = createPageComponent({ rapidRewardsDetails: { isEnrolledInRapidRewards: false } });

            fireEvent.click(container.querySelector('.rapid-rewards-panel-not-enrolled Button'));

            expect(pushMock).toHaveBeenCalledWith('/my-account/enroll-rapid-rewards');
          });

          it('should push to RR enrollment when click get details button', () => {
            const { container } = createPageComponent({ rapidRewardsDetails: { isEnrolledInRapidRewards: false } });

            fireEvent.click(container.querySelector('.rapid-rewards-panel-not-enrolled--get-details-link'));

            expect(pushMock).toHaveBeenCalledWith('/about-rapid-rewards');
          });
        });

        it('should nav to air booking landing page if user has no upcoming trips and clicks booking nav item', () => {
          const { container } = createPageComponent();

          expect(container.querySelector('.my-trips-panel--book-trip-call-to-action')).not.toBeNull();

          fireEvent.click(container.querySelector('.my-trips-panel--book-trip-call-to-action'));

          expect(pushMock).toHaveBeenCalledWith('/air/booking/');
        });

        it('should nav to air booking landing page if user has no upcoming trips and clicks view reservation nav item', () => {
          const { container } = createPageComponent();

          expect(container.querySelector('div.my-trips-panel--find-a-trip')).not.toBeNull();

          fireEvent.click(container.querySelector('div.my-trips-panel--find-a-trip'));

          expect(pushMock).toHaveBeenCalledWith('/view-reservation');
        });

        it('should nav to past flights if user clicks past flights nav item', () => {
          const { container } = createPageComponent();

          expect(container.querySelector('div.my-trips-panel--past-flights-button')).not.toBeNull();

          fireEvent.click(container.querySelector('div.my-trips-panel--past-flights-button'));

          expect(pushMock).toHaveBeenCalledWith('/my-account/past-flights');
        });

        it('should nav to saved flights if user clicks saved flights nav item', () => {
          const { container } = createPageComponent();

          expect(container.querySelector('div.my-trips-panel--saved-flights-button')).not.toBeNull();

          fireEvent.click(container.querySelector('div.my-trips-panel--saved-flights-button'));

          expect(pushMock).toHaveBeenCalledWith('/my-account/saved-flights');
        });

        it('should nav to upcoming trips page if user has multiple upcoming trips and clicks nav item', () => {
          const { container } = createPageComponent({
            upcomingTrips: new UpcomingTripsBuilder()
              .withCheckinFlight()
              .addUpcomingTrip(new UpcomingTripBuilder().withStandby().withNonRev(false).build())
              .build().upcomingTripsPage
          });

          expect(container.querySelector('div.my-trips-panel--upcoming-trip-count')).not.toBeNull();

          fireEvent.click(container.querySelector('div.my-trips-panel--upcoming-trip-count'));

          expect(pushMock).toHaveBeenCalledWith('/my-account/upcoming-trips');
        });

        it('should nav to upcoming trip details page if user has one upcoming trip and clicks nav item', () => {
          const { container } = createPageComponent({
            upcomingTrips: new UpcomingTripsBuilder().withCheckinFlight().build().upcomingTripsPage
          });

          expect(container.querySelector('p.my-trips-panel--next-trip-label')).not.toBeNull();

          fireEvent.click(container.querySelector('p.my-trips-panel--next-trip-label'));

          expect(pushMock).toHaveBeenCalledWith(
            '/my-account/upcoming-trip-details/0?recordLocator=QIP34B',
            null,
            null,
            {
              firstName: 'STEVEN',
              lastName: 'JACKIE'
            }
          );
        });

        it('should call retrieveCarReservationFn and nav to upcoming trip details page if user has one upcoming trip and clicks nav item when upcomingTrip has type of CAR', () => {
          const { container } = createPageComponent({
            upcomingTrips: new UpcomingTripsBuilder().withCar().build().upcomingTripsPage
          });

          expect(container.querySelector('p.my-trips-panel--next-trip-label')).not.toBeNull();

          fireEvent.click(container.querySelector('p.my-trips-panel--next-trip-label'));

          expect(retrieveCarReservationFnMock).toHaveBeenCalledWith(
            {
              confirmationNumber: '08172185US0',
              firstName: 'Cannon',
              lastName: 'Biggs',
              pickupDate: '2017-09-16'
            }
          );
        });

        it('should not nav to upcoming trip details page if user has one upcoming trip and clicks nav item but does not have upcomingTrip type of either CAR nor FLIGHT', () => {
          const { container } = createPageComponent({
            upcomingTrips: {
              tripType: 'NO_TYPE'
            }
          });

          expect(container.querySelector('p.my-trips-panel--next-trip-label')).toBeNull();
        });
      });
    });

    describe('user is not logged in', () => {
      it('should push user to login page with my-account route for post-login redirect', () => {
        createPageComponent({ isLoggedIn: false });

        expect(pushMock).toHaveBeenCalledWith('/login', null, { to: '/my-account' });
      });

      it('should return null when the customerInfo object is empty or does not exist', () => {
        expect(createPageComponent({ customerInfo: undefined })).toMatchSnapshot();
      });
    });
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      accountPagePlacements: {
        banner01: {
          contentBlockId: 'mock-value',
          displayType: 'flex-placement',
          isChaseCombo: true,
          isChasePlacement: true,
          isChasePrequal: true,
          placement: {},
          placementData: { response: 'mock response' },
          shouldObserveViewPort: true,
          viewPortThreshold: 10
        },
        promoCodeContentModule: [
          { props: { id: 'main-body' }, textContent: 'text content', type: 'div' },
          { props: { id: 'sub-text' }, textContent: 'text content', type: 'div' },
          {
            props: { id: 'learn-more-btn', target: '/fake/path' },
            textContent: 'text content',
            type: 'Link'
          }
        ],
        unusedFundsContentModule: [
          { props: { id: 'main-body' }, textContent: 'text content', type: 'div' },
          {
            props: { id: 'view-funds-btn', target: 'https://www.viewfunds.com' },
            textContent: 'text content',
            type: 'Link'
          },
          {
            props: { id: 'learn-more-btn', target: 'https://www.learnmore.com' },
            textContent: 'text content',
            type: 'Link'
          }
        ]
      },
      clearFlightReservationFn: clearFlightReservationFnMock,
      customerInfo: {
        accountNumber: '1234567890',
        birthDate: '1980-01-01',
        gender: 'M',
        name: {
          firstName: 'Ben',
          lastName: 'Lacy',
          preferredName: 'Ben'
        }
      },
      exclusivePromotions: {
        eligiblePromotions: [],
        numberOfEligiblePromotions: 0,
        numberOfRegisteredPromotions: 0,
        registeredPromotions: []
      },
      getAccountInfoForLandingPageFn: getAccountInfoForLandingPageFnMock,
      IsExclusivePromotionsHidden: true,
      isLoggedIn: true,
      isTierStatusPending: false,
      push: pushMock,
      rapidRewardsDetails,
      retrieveCarReservationFn: retrieveCarReservationFnMock,
      setTripTypeForDetailsPageFn: setTripTypeForDetailsPageFnMock,
      UNUSED_FUNDS: false,
      upcomingTrips: []
    };

    const mergedProps = { ...defaultProps, ...props };
    const state = {};

    return createComponent(MyAccountLandingPage, { state, props: mergedProps });
  };

  const rapidRewardsDetails = {
    chaseVisaRrEnrolled: false,
    companionPassInfo: {
      companionDeclared: false,
      companionPassAchieved: false,
      companionPassExpirationDate: '2021-12-31',
      companionQualifyingFlights: 0,
      companionQualifyingFlightsRequired: '100',
      companionQualifyingPoints: 0,
      companionQualifyingPointsRequired: '125,000'
    },
    isEnrolledInRapidRewards: true,
    redeemablePoints: 0,
    tierInfo: {
      nextTierQualifyingFlightsRequired: '25',
      nextTierQualifyingPointsRequired: '35,000',
      nextTierTargeted: 'A_LIST',
      tier: 'NON_ELITE',
      tierAchievedDate: '2019-12-31',
      tierEndDate: '2021-12-31',
      tierQualifyingFlights: 0,
      tierQualifyingPoints: 0
    }
  };
});
