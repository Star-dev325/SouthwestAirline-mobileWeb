import { render } from '@testing-library/react';
import React from 'react';
import * as CheckInLocalStorageHelper from 'src/checkIn/helpers/checkInLocalStorageHelper';
import { MobileBoardingPassPage } from 'src/checkIn/pages/mobileBoardingPassPage';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as BoardingPassHelper from 'src/shared/helpers/boardingPassHelper';
import CheckInRetrieveBoardingPassBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInRetrieveBoardingPassBuilder';
import { mockErrorHeaderContainerWithJest } from 'test/unit/helpers/testUtils';

describe('mobileBoardingPass', () => {
  let hasAcceptedHazmatDeclarationsStub;
  let removeBoardingPassFromSessionStub;
  let replaceStub;
  let retrieveBoardingPassFnStub;
  let satelliteTrackStub;

  mockErrorHeaderContainerWithJest(jest);

  beforeEach(() => {
    hasAcceptedHazmatDeclarationsStub = jest.spyOn(CheckInLocalStorageHelper.default, 'hasAcceptedHazmatDeclarations');
    removeBoardingPassFromSessionStub = jest.spyOn(BoardingPassHelper, 'removeBoardingPassFromSession');
    replaceStub = jest.fn();
    retrieveBoardingPassFnStub = jest.fn().mockImplementationOnce(() => Promise.resolve());
    satelliteTrackStub = jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when initialize', () => {
    it('should call retrieveBoardingPassFn with viewBoardingPassIssuance given available and no mobileBoardingPasses', () => {
      createComponent({ mobileBoardingPasses: null });

      expect(retrieveBoardingPassFnStub).toHaveBeenCalledWith(
        {
          body: {
            checkInSessionToken: 'token',
            firstName: 'Shelton',
            lastName: 'Soon',
            travelerID: ['2401DBDF0000AD6E']
          },
          href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/9YCRRF',
          method: 'POST'
        },
        true
      );
    });

    it('should not call retrieveBoardingPassFn with viewBoardingPassIssuance given available and mobileBoardingPasses', () => {
      createComponent();

      expect(retrieveBoardingPassFnStub).not.toHaveBeenCalled();
    });

    it('should call satellite with the BoardingPass View string when a user has accepted hazmat ack', () => {
      hasAcceptedHazmatDeclarationsStub.mockReturnValueOnce(true);
      createComponent();

      expect(satelliteTrackStub).toBeCalledWith('BoardingPass View');
    });

    it('should not call satellite with the BoardingPass View string when a user has not accepted hazmat ack', () => {
      hasAcceptedHazmatDeclarationsStub.mockReturnValueOnce(false);
      createComponent();

      expect(satelliteTrackStub).not.toBeCalledWith('BoardingPass View');
    });
  });

  describe('when the MBP response is received from the API', () => {
    let mobileBoardingPass;

    it('should display mobile boarding pass', () => {
      const { container } = createComponent();

      mobileBoardingPass = container.querySelector('.mbp');

      expect(mobileBoardingPass).not.toBeNull();
    });

    it('should display tier "ALIST" as "A-List" if found in constants', () => {
      const { getAllByText } = createComponent();

      expect(getAllByText('A-List').length).toBe(1);
    });

    it('should display tier "NOT_IN_CONSTANTS" as "--" if not found in constants', () => {
      const { mobileBoardingPassView } = new CheckInRetrieveBoardingPassBuilder().checkInRetrieveBoardingPassPage
        .mobileBoardingPassViewPage;

      const { getAllByText } = createComponent({
        mobileBoardingPasses: [
          ...mobileBoardingPassView,
          {
            passenger: { ...mobileBoardingPassView[0].passenger, tier: 'NOT_IN_CONSTANTS' },
            style: { gradientStart: 'primary-blue', gradientEnd: 'primary-dark-blue' }
          }
        ]
      });

      expect(getAllByText('- -').length > 0).not.toBeNull();
    });

    it('should call removeBoardingPassFromSession when mobile boarding pass component unmounted', () => {
      const { unmount } = createComponent();

      unmount();

      expect(removeBoardingPassFromSessionStub).toHaveBeenCalled();
    });

    it('should have solid background if documentType is SECURITY_DOCUMENT', () => {
      const { mobileBoardingPassView } = new CheckInRetrieveBoardingPassBuilder().withSecurityDocument().build()
        .checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage;

      const { container } = createComponent({
        mobileBoardingPasses: mobileBoardingPassView
      });

      expect(container).toMatchSnapshot();
    });

    it('should have gradient background if documentType is not SECURITY_DOCUMENT', () => {
      const { container } = createComponent();

      expect(container.querySelector('.mobile-boarding-pass.security-document')).toBeNull();
    });

    it('should have security header text if documentType is SECURITY_DOCUMENT', () => {
      const { mobileBoardingPassView } = new CheckInRetrieveBoardingPassBuilder().withSecurityDocument().build()
        .checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage;

      const { getByText } = createComponent({
        mobileBoardingPasses: mobileBoardingPassView
      });

      expect(getByText('CHECK_IN__MOBILE_BOARDING_PASS__PROCEED_TO_GATE')).not.toBeNull();
    });

    it('should not have security header text if documentType is not SECURITY_DOCUMENT', () => {
      const { container } = createComponent();

      expect(container.querySelector('.mbp-security-header')).toBeNull();
    });

    it('should not have drinks subinfo if documentType is SECURITY_DOCUMENT', () => {
      const { mobileBoardingPassView } = new CheckInRetrieveBoardingPassBuilder().withSecurityDocument().build()
        .checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage;

      const { getByText } = createComponent({
        mobileBoardingPasses: mobileBoardingPassView
      });

      expect(getByText('7:30 AM (was 6:30 AM)')).not.toBeNull();
      expect(getByText('Dallas (Love Field)')).not.toBeNull();
    });

    it('should have drinks subinfo if documentType is not SECURITY_DOCUMENT', () => {
      const { getByText } = createComponent();

      expect(getByText('7:30 AM')).not.toBeNull();
      expect(getByText('CHECK_IN__MOBILE_BOARDING_PASS__DRINK_COUPON')).not.toBeNull();
      expect(getByText('Dallas (Love Field)')).not.toBeNull();
    });
  });

  describe('when user refreshes page', () => {
    const storedBoardingPassData = {
      body: {
        checkInSessionToken: 'session token',
        firstName: 'YANG',
        lastName: 'LU',
        recordLocator: 'R4ZGJ3'
      },
      href: '/v1/mobile-air-operations/page/check-in/view-boarding-pass',
      method: 'POST'
    };

    beforeEach(() => {
      jest.spyOn(BoardingPassHelper, 'getBoardingPassFromSession').mockReturnValue(storedBoardingPassData);
    });

    it('should call retrieve the boarding pass details from session storage instead of the redux layer', () => {
      createComponent({ viewBoardingPassIssuance: null, mobileBoardingPasses: null });

      expect(BoardingPassHelper.getBoardingPassFromSession).toHaveBeenCalled();
      expect(retrieveBoardingPassFnStub).toHaveBeenCalledWith(storedBoardingPassData, true);
    });
  });

  describe('when user links into the page', () => {
    beforeEach(() => {
      jest.spyOn(BoardingPassHelper, 'getBoardingPassFromSession').mockReturnValue(null);
    });

    it('should redirect them to the details page and not call retrieveBoardingPass', () => {
      createComponent({ viewBoardingPassIssuance: null });
      const secondCallArgs = retrieveBoardingPassFnStub.mock.calls[1];

      expect(BoardingPassHelper.getBoardingPassFromSession).toHaveBeenCalled();
      expect(secondCallArgs).not.toBeDefined();
      expect(replaceStub).toHaveBeenCalledWith('/view-reservation/trip-details/9YCRRF', null, null, {
        firstName: 'Firstname',
        lastName: 'Lastname'
      });
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      location: {
        state: {
          firstName: 'Firstname',
          lastName: 'Lastname',
          recordLocator: '9YCRRF'
        }
      },
      mobileBoardingPasses: [
        {
          adaptiveLink: 'https://reach-api.urbanairship.com/v1/pass/adaptive/TLYImiVN8Q%3F...',
          barcodeString: 'M1WHEE%2FLEE++++++++++++EO4XCTX+DALMCIWN...',
          boardingGroup: 'A',
          boardingPassSSRs: 'INFT',
          boardingPosition: '16',
          boardingTime: '07:00',
          boardingTimeString: '7:00 AM',
          confirmationNumber: 'ABC123',
          departureDate: '2018-07-13',
          departureGate: '14',
          departureTime: '07:30',
          departureTimeString: '7:30 AM',
          destinationAirportCode: 'BOS',
          destinationDescription: 'Boston Logan',
          documentType: 'BOARDING_PASS',
          eligibleForDrinkCoupon: true,
          fareType: 'WANNA_GET_AWAY',
          flightNumber: '341',
          hasExtraSeat: true,
          hasTsaPreCheck: true,
          isInfant: false,
          isYoungTraveler: false,
          originAirportCode: 'DAL',
          originAirportDescription: 'Dallas (Love Field)',
          passenger: {
            accountNumber: '0004443333',
            name: {
              firstName: 'First',
              lastName: 'Last',
              middleName: 'Middle'
            },
            tier: 'ALIST',
            travelerId: 'travelerId-01'
          },
          style: {
            bottomLabels: 'secondary-light-blue',
            bottomValues: 'neutral-white',
            gradientEnd: 'primary-dark-blue',
            gradientStart: 'primary-blue',
            topLabels: 'neutral-white',
            topValues: 'primary-yellow'
          },
          travelerSegmentIdentifier: 'pax-01-segmentId-01'
        }
      ],
      replace: replaceStub,
      retrieveBoardingPassFn: retrieveBoardingPassFnStub,
      viewBoardingPassIssuance: {
        body: {
          checkInSessionToken: 'token',
          firstName: 'Shelton',
          lastName: 'Soon',
          travelerID: ['2401DBDF0000AD6E']
        },
        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/9YCRRF',
        method: 'POST'
      }
    };

    return render(<MobileBoardingPassPage {...defaultProps} {...props} />);
  };
});
