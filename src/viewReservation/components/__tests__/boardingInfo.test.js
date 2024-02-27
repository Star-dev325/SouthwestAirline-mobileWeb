jest.mock('@swa-ui/encryption', () => ({
  useHref: jest.fn().mockReturnValue({ href: 'mock_href' })
}));
jest.mock('src/shared/actions/dialogActions', () => ({
  hideDialog: jest.fn().mockReturnValue({ type: 'HIDE_DIALOG' }),
  showDialog: jest.fn().mockReturnValue({ type: 'SHOW_DIALOG' })
}));

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import { BoardingInfo } from 'src/viewReservation/components/boardingInfo';
import { getShowDialogOptions } from 'src/viewReservation/helpers/viewReservationHelper';
import { getModifyBaggageDetailsMockData } from 'test/builders/model/reservationDetailBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('boardingInfo', () => {
  const mockCheckIn = {
    href: '/v1/mobile-air-operations/page/check-in',
    method: 'GET',
    body: {
      recordLocator: 'J5LOZM',
      'first-name': 'YANG',
      'last-name': 'LU'
    }
  };
  const mockHref = 'mock_href';
  const mockPassengers = [
    {
      accountNumber: '6125489756',
      hasAnyEarlyBird: false,
      hasCompletePassportInfo: false,
      hasExtraSeat: false,
      isCheckedIn: false,
      isCheckInEligible: true,
      name: 'Amber Awesome',
      passengerReference: '1'
    },
    {
      accountNumber: '6125486987',
      hasAnyEarlyBird: false,
      hasCompletePassportInfo: true,
      hasExtraSeat: false,
      isCheckedIn: true,
      isCheckInEligible: true,
      name: 'Ron hackman',
      passengerReference: '2'
    },
    {
      accountNumber: '6125481234',
      hasAnyEarlyBird: false,
      hasCompletePassportInfo: true,
      hasExtraSeat: false,
      isCheckedIn: false,
      isCheckInEligible: false,
      name: 'Bear USASEL',
      passengerReference: '3'
    },
    {
      accountNumber: '6125480001',
      hasAnyEarlyBird: false,
      hasCompletePassportInfo: true,
      hasExtraSeat: false,
      isCheckedIn: true,
      isCheckInEligible: false,
      name: 'Checked In',
      passengerReference: '4'
    }
  ];
  const mockTrackCheckedBags = {
    labelText: 'Track checked bags',
    url: mockUrl,
    query: {
      first_name: 'FIRSTNAME',
      last_name: 'LASTNAME',
      record_locator: 'ABC123'
    }
  };
  const mockUrl = 'mock_url';
  const mockViewModifyCheckedBags = {
    labelText: 'Check standard bags now',
    url: mockUrl
  };
  const noop = () => {};
  let hideDialogFnStub;
  let onCheckBagsButtonClickStub;
  let onCheckInButtonClickStub;
  let showDialogFnStub;

  beforeEach(() => {
    hideDialogFnStub = jest.fn().mockResolvedValue({ type: 'FAKE-ACTION' });
    jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
    onCheckBagsButtonClickStub = jest.fn();
    onCheckInButtonClickStub = jest.fn();
    showDialogFnStub = jest.fn(() => ({ type: 'FAKE-ACTION' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should display correctly', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should show trip date and city name', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should show origin airport and destination airport', () => {
      const { container } = createComponent();

      expect(container.querySelector('.airport-info--detail').textContent).toEqual('DAL toAUS');
    });

    it('should show confirmation number', () => {
      const { container } = createComponent();

      expect(container.querySelector('[data-qa="confirmation-label"]')).toBeInTheDocument();
      expect(container.querySelector('.passenger-record-locator').textContent).toEqual('ABCDEF');
    });
  });

  describe('View boarding pass button', () => {
    let props;
    const viewBoardingPass = {
      href: '/v1/mobile-air-operations/page/check-in',
      method: 'POST',
      body: {
        recordLocator: 'J5LOZM',
        firstName: 'YANG',
        lastName: 'LU'
      }
    };
    const viewBoardingPassIssuance = {
      href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
      method: 'POST',
      body: {
        recordLocator: 'J5LOZM',
        firstName: 'YANG',
        lastName: 'LU'
      }
    };
    const onViewBoardingPassButtonClickCbStub = jest.fn();

    beforeEach(() => {
      props = {
        onViewBoardingPassButtonClickCb: onViewBoardingPassButtonClickCbStub,
        viewBoardingPass,
        viewBoardingPassIssuance
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render view boarding pass button with default text when labelText not set and when this PNR has both viewBoardingPass or viewBoardingPassIssuance response', () => {
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
      expect(container.querySelector('MobileBoardingPassMessage')).not.toBeInTheDocument();
    });

    it('should render view boarding pass button when this PNR has both viewBoardingPass or viewBoardingPassIssuance response', () => {
      props.viewBoardingPassIssuance.labelText = 'button text';
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
      expect(container.querySelector('MobileBoardingPassMessage')).not.toBeInTheDocument();
    });

    it('should render view boarding pass button when this PNR has only viewBoardingPass response', () => {
      props.viewBoardingPassIssuance = null;
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
      expect(container.querySelector('MobileBoardingPassMessage')).not.toBeInTheDocument();
    });

    it('should render view boarding pass button when this PNR has only viewBoardingPassIssuance response', () => {
      props.viewBoardingPass = null;
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
      expect(container.querySelector('MobileBoardingPassMessage')).not.toBeInTheDocument();
    });

    it('should not render view boarding pass button when this PNR has null values for viewBoardingPass and viewBoardingPassIssuance responses', () => {
      props.viewBoardingPass = null;
      props.viewBoardingPassIssuance = null;
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
      expect(container.querySelector('MobileBoardingPassMessage')).not.toBeInTheDocument();
    });
  });

  describe('check standard bags now button', () => {
    describe('when viewModifyCheckedBags has value', () => {
      it('should render check standard bags now button', () => {
        const { container } = createComponent({ viewModifyCheckedBags: mockViewModifyCheckedBags });

        expect(container.querySelector('.check-baggage-button-boarding')).toMatchSnapshot();
      });
    });

    describe('when trackCheckedBags has value', () => {
      it('should render track checked bags button', () => {
        const { container } = createComponent({ trackCheckedBags: mockTrackCheckedBags });

        expect(container.querySelector('.check-baggage-button-boarding')).toMatchSnapshot();
      });
    });

    describe('when viewModifyCheckedBags and trackCheckedBags is null', () => {
      it('should not render check standard bags now or track checked bags button', () => {
        const { container } = createComponent({ trackCheckedBags: null, viewModifyCheckedBags: null });

        expect(container.querySelector('.check-baggage-button-boarding')).toMatchSnapshot();
      });
    });

    describe('when viewModifyCheckedBags and trackCheckedBags have a value', () => {
      it('should render track checked bags button', () => {
        const { container } = createComponent({
          trackCheckedBags: mockTrackCheckedBags,
          viewModifyCheckedBags: mockViewModifyCheckedBags
        });

        expect(container.querySelector('.check-baggage-button-boarding')).toMatchSnapshot();
      });
    });
  });

  describe('baggage details', () => {
    const withModifyBaggageDetails = { modifyBaggageDetails: getModifyBaggageDetailsMockData() };

    it('should render baggage details when modifyBaggageDetails exists', () => {
      const { container } = createComponent(withModifyBaggageDetails);

      expect(container).toMatchSnapshot();
    });

    it('should call showDialogFn with correct options when modifyBaggageDetails is available and suffix text clicked', () => {
      const { container } = createComponent(withModifyBaggageDetails);

      fireEvent.click(container.querySelector('.baggage-details--suffix-text'));

      expect(showDialogFnStub).toHaveBeenCalledWith(
        getShowDialogOptions(getModifyBaggageDetailsMockData(), hideDialogFnStub)
      );
    });

    it('should call hideDialogFn on dialog button click', async () => {
      const { container } = createComponent(withModifyBaggageDetails);

      fireEvent.click(container.querySelector('.baggage-details--suffix-text'));

      await showDialogFnStub.mock.calls[0][0].buttons[0].onClick();

      expect(hideDialogFnStub).toHaveBeenCalled();
    });
  });

  describe('boarding positions', () => {
    const boardingInfoResponse = {
      passengers: [
        {
          name: 'Amber Awesome',
          hasExtraSeat: false,
          isCheckedIn: true,
          isCheckInEligible: true,
          hasCompletePassportInfo: false,
          passengerReference: '1',
          accountNumber: '6125489756',
          hasAnyEarlyBird: false
        },
        {
          name: 'Ron hackman',
          hasExtraSeat: false,
          isCheckedIn: true,
          isCheckInEligible: true,
          hasCompletePassportInfo: false,
          passengerReference: '2',
          accountNumber: '6125486987',
          hasAnyEarlyBird: false
        }
      ],
      checkInIneligibilityReason: 'some reason',
      viewBoardingPositions: {
        href: '/v1/mobile-air-operations/page/check-in',
        method: 'POST',
        body: {
          recordLocator: 'J5LOZM',
          'first-name': 'YANG',
          'last-name': 'LU'
        }
      }
    };
    
    it('should show view boarding positions button when this PNR has boarding position link with default button text if label text not set', () => {
      const { container } = createComponent(boardingInfoResponse);

      expect(container).toMatchSnapshot();
    });

    it('should show view boarding positions button when this PNR has boarding position link', () => {
      boardingInfoResponse.viewBoardingPositions.labelText = 'button text';
      const { container } = createComponent(boardingInfoResponse);

      expect(container).toMatchSnapshot();
    });

    it('should not show boardingPositions button when checkin link is present', () => {
      boardingInfoResponse.checkIn = _.cloneDeep(boardingInfoResponse.viewBoardingPositions);
      boardingInfoResponse.checkIn.method = 'GET';
      boardingInfoResponse.passengers.forEach((passenger) => {
        passenger.isCheckedIn = false;
      });

      const { container } = createComponent(boardingInfoResponse);

      expect(container).toMatchSnapshot();
    });
  });

  describe('Add Early Bird Button', () => {
    it('should show add early bird button when time is not 36 hours before departure time', () => {
      const { container } = createComponent({
        shouldShowAddEarlyBirdButton: true
      });

      expect(container.querySelector('button.boarding-info--early-bird-button')).toBeInTheDocument();
      expect(container.querySelector('button.boarding-info--early-bird-button').textContent).toEqual(
        'SHARED__EARLY_BIRD__CHECK_IN_TITLE'
      );
    });

    it('should trigger onEarlyBirdButtonClick when user click the Add Early Bird button', () => {
      const onEarlyBirdButtonClickStub = jest.fn();
      const { container } = createComponent({
        shouldShowAddEarlyBirdButton: true,
        onEarlyBirdButtonClick: onEarlyBirdButtonClickStub
      });

      fireEvent.click(container.querySelector('button.boarding-info--early-bird-button'));

      expect(onEarlyBirdButtonClickStub).toHaveBeenCalled();
    });
  });

  describe('Add Contact Tracing Button', () => {
    it('should show add contact tracing button when provided', () => {
      const { container } = createComponent({
        shouldShowContactTracingButton: true,
        contactTracing: {
          labelText: 'This Adds Contact Tracing'
        }
      });

      expect(container.querySelector('button.boarding-info--contact-tracing-button')).toBeInTheDocument();
      expect(container.querySelector('button.boarding-info--contact-tracing-button').textContent).toEqual(
        'This Adds Contact Tracing'
      );
    });

    it('should trigger click handler on button click', () => {
      const onContactTracingButtonClickStub = jest.fn();

      const { container } = createComponent({
        shouldShowContactTracingButton: true,
        onContactTracingButtonClick: onContactTracingButtonClickStub
      });

      fireEvent.click(container.querySelector('button.boarding-info--contact-tracing-button'));

      expect(onContactTracingButtonClickStub).toHaveBeenCalled();
    });
  });

  describe('check in button', () => {
    it('should show checkin button when this PNR has checkin link', () => {
      const { container } = createComponent({
        checkInIneligibilityReason: 'MBP_UNAVAILABLE_TOO_CLOSE_TO_DEPARTURE_INTL',
        checkIn: mockCheckIn
      });

      expect(container.querySelector('button.boarding-info--checkin-button')).toBeInTheDocument();
      expect(container.querySelector('[data-qa="passenger-label"]')).toBeInTheDocument();
    });

    it('should call onCheckInButtonClick when click check in button', () => {
      const { container } = createComponent({
        checkInIneligibilityReason: 'MBP_UNAVAILABLE_TOO_CLOSE_TO_DEPARTURE_INTL',
        checkIn: mockCheckIn
      });

      fireEvent.click(container.querySelector('button.boarding-info--checkin-button'));

      expect(onCheckInButtonClickStub).toHaveBeenCalled();
    });
  });

  describe('when boarding positions link is provided and some passengers are checked in but others are not', () => {
    let boardingPositionsLink, checkInLink, checkInStub, onPassengerNameClickStub, props, viewBoardingPositionsStub;

    beforeEach(() => {
      boardingPositionsLink = jest.fn();
      checkInLink = jest.fn();
      checkInStub = jest.fn();
      onPassengerNameClickStub = jest.fn();
      viewBoardingPositionsStub = jest.fn();
      props = {
        checkIn: checkInLink,
        viewBoardingPositions: boardingPositionsLink,
        onViewBoardingPositionsButtonClick: viewBoardingPositionsStub,
        onCheckInButtonClick: checkInStub,
        onPassengerNameClick: onPassengerNameClickStub,
        passengers: mockPassengers
      };
    });

    it('should show three passenger boarding groups', () => {
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
    });

    it('should show a view boarding passes button as the first button hen isInternational is false', () => {
      props.isInternational = false;
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
    });

    it('should show a check-in button as the second button', () => {
      const { container } = createComponent(props);

      expect(container.querySelector('button.boarding-info--checkin-button')).toBeInTheDocument();
    });

    it('should call the checkIn method with the boarding details link when the second button is clicked', () => {
      const { container } = createComponent(props);

      fireEvent.click(container.querySelector('button.boarding-info--checkin-button'));

      expect(checkInStub).toHaveBeenCalledWith(checkInLink);
    });

    it('should show a view boarding details button if isInternational true', () => {
      props.isInternational = true;
      props.isCheckedIn = true;
      props.hasCompletePassportInfo = true;
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
    });
  });

  describe('when some passengers are not checked in and no check-in link is provided', () => {
    it('should show the passenger names without a button', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });
  });

  describe('change button', () => {
    it('should render change button when change link is available in the response', () => {
      const { container } = createComponent();

      expect(container.querySelector('.manage-button-change')).toBeInTheDocument();
    });

    it('should not render change button when change link is unavailable in the response', () => {
      const { container } = createComponent({
        shouldSuppressUnmodifiablePnr: true
      });

      expect(container.querySelector('button.manage-button-change')).not.toBeInTheDocument();
    });

    it('should trigger the change callback when click change button', () => {
      const clickStub = jest.fn();

      const { container } = createComponent({
        onChangeFlightClick: clickStub
      });

      fireEvent.click(container.querySelector('button.manage-button-change'));

      expect(clickStub).toHaveBeenCalled();
    });
  });

  describe('Same-day change and standby', () => {
    const mockSameDayBlockedMessage = {
      key: 'SAME_DAY_BLOCKED_NOT_CHECKED_IN',
      header: null,
      body: 'You must be checked in to view same-day change and standby options',
      icon: 'NONE',
      textColor: 'DEFAULT',
      labelText: 'Same-day change and standby',
      shouldShowCheckInButton: true,
      shouldShowModifyBagsButton: false
    };
    const mockSameDayBlockedAlreadyStandbyMessage = {
      key: 'SAME_DAY_BLOCKED_ALREADY_ON_STANDBY',
      header: null,
      body: 'You can only list for one standby flight at a time. if you would like to fly standby on another flight, please cancel your current standby listing.',
      icon: 'NONE',
      textColor: 'DEFAULT',
      labelText: 'Same-day change and standby',
      shouldShowCheckInButton: false,
      shouldShowModifyBagsButton: false
    };
    const mockSameDayBlockedBagsStandbyMessage = {
      key: 'SAME_DAY_BLOCKED_INACTIVE_BAGS',
      header: null,
      body: 'You must remove your bags from your reservation before joining the standby list.',
      icon: 'NONE',
      textColor: 'DEFAULT',
      labelText: null,
      shouldShowCheckInButton: false,
      shouldShowModifyBagsButton: true
    };

    it('should render Same-day change and standby button when sameDayUpdates is available in the response', () => {
      const { container } = createComponent({
        sameDayUpdates: {
          href: '/v1/mobile-air-operations/page/same-day/4ENWXX',
          method: 'POST',
          body: {
            passengerSearchToken:
              'DiP1aMwftceY4qdxOYj_nnNGJX0YFN1S2MzSTzImhWXOgCjxzvyVC4IxTc4sclK_ImTFcwoS0AbjZpGPA1Z5Y09cPPeLGUWY2ZKpbZfoOPrb7T-vZ8JHlYHnb85UbRd3R5p2MP-YnJdGJSJS'
          },
          labelText: 'Same-day change and standby'
        }
      });

      expect(container.querySelector('.boarding-info--same-day-change-buttons')).toMatchSnapshot();
    });

    it('should render Same-day change and standby button when shouldShowSameDayBlockedCheckInButton is true in sameDayBlockedMessage`s response', () => {
      const { container } = createComponent({
        sameDayBlockedMessage: mockSameDayBlockedMessage
      });

      expect(container.querySelector('.boarding-info--same-day-change-buttons')).toMatchSnapshot();
    });

    it('should not render Same-day change and standby button when sameDayUpdates and sameDayBlockedMessage is unavailable  with SAME_DAY_BLOCKED_NOT_CHECKED_IN key in the response', () => {
      const { container } = createComponent();

      expect(container.querySelector('.boarding-info--same-day-change-buttons')).toMatchSnapshot();
    });

    it('should render Same-day change and standby button when shouldShowSameDayBlockedCheckInButton is false in sameDayBlockedMessage`s response', () => {
      const { container } = createComponent({
        sameDayBlockedMessage: mockSameDayBlockedAlreadyStandbyMessage
      });

      expect(container.querySelector('.boarding-info--same-day-change-buttons')).toMatchSnapshot();
    });

    it('should not render Same-day change and standby button when sameDayUpdates and sameDayBlockedMessage is unavailable in the response', () => {
      const { container } = createComponent();

      expect(container.querySelector('.boarding-info--same-day-change-buttons')).toMatchSnapshot();
    });

    describe('when same day button is clicked and the traveler is not checked in', () => {
      it('should fire Satellite analytics event when sameDayBlockedMessage popup is displayed', () => {
        const { container } = createComponent({
          checkIn: mockCheckIn,
          sameDayBlockedMessage: mockSameDayBlockedMessage
        });

        fireEvent.click(container.querySelector('.boarding-info--same-day-change-buttons'));

        expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalledWith('squid', { page_description: 'modal: sdc/sb not checked in' });
      });
  
      it('should able to render a popup when sameDayBlockedMessage is available and able to submit', async () => {
        const { container } = createComponent({
          checkIn: mockCheckIn,
          sameDayBlockedMessage: mockSameDayBlockedMessage
        });

        fireEvent.click(container.querySelector('.boarding-info--same-day-change-buttons'));

        await showDialogFnStub.mock.calls[0][0].buttons[0].onClick();

        expect(hideDialogFnStub).toHaveBeenCalled();
      });

      it('should able to render a popup when sameDayBlockedMessage and hide the dialog', async () => {
        const { container } = createComponent({
          checkIn: mockCheckIn,
          sameDayBlockedMessage: mockSameDayBlockedMessage
        });

        fireEvent.click(container.querySelector('.boarding-info--same-day-change-buttons'));

        await showDialogFnStub.mock.calls[0][0].buttons[1].onClick();

        expect(hideDialogFnStub).toHaveBeenCalled();
        expect(onCheckInButtonClickStub).toHaveBeenCalledWith(mockCheckIn);
      });

      it('should not render a popup when sameDayBlockedMessage is unavailable', () => {
        const { container } = createComponent({
          sameDayUpdates: {
            href: '/v1/mobile-air-operations/page/same-day/4ENWXX',
            method: 'POST',
            body: {
              passengerSearchToken:
                'DiP1aMwftceY4qdxOYj_nnNGJX0YFN1S2MzSTzImhWXOgCjxzvyVC4IxTc4sclK_ImTFcwoS0AbjZpGPA1Z5Y09cPPeLGUWY2ZKpbZfoOPrb7T-vZ8JHlYHnb85UbRd3R5p2MP-YnJdGJSJS'
            },
            labelText: 'Same-day change and standby'
          }
        });

        fireEvent.click(container.querySelector('button.boarding-info--same-day-change-buttons'));

        const checkIn = container.querySelector('.close-button');

        expect(checkIn).toBeNull();
      });

      it('should call onSameDayButtonClick when sameDayUpdates is available', () => {
        const onSameDayButtonClickStub = jest.fn();
        const { container } = createComponent({
          sameDayBlockedMessage: null,
          sameDayUpdates: {
            href: '/v1/mobile-air-operations/page/same-day/4ENWXX',
            method: 'POST',
            body: {
              passengerSearchToken:
                'DiP1aMwftceY4qdxOYj_nnNGJX0YFN1S2MzSTzImhWXOgCjxzvyVC4IxTc4sclK_ImTFcwoS0AbjZpGPA1Z5Y09cPPeLGUWY2ZKpbZfoOPrb7T-vZ8JHlYHnb85UbRd3R5p2MP-YnJdGJSJS'
            }
          },
          onSameDayButtonClick: onSameDayButtonClickStub
        });

        fireEvent.click(container.querySelector('button.boarding-info--same-day-change-buttons'));

        expect(onSameDayButtonClickStub).toHaveBeenCalledWith({
          href: '/v1/mobile-air-operations/page/same-day/4ENWXX',
          method: 'POST',
          body: {
            passengerSearchToken:
              'DiP1aMwftceY4qdxOYj_nnNGJX0YFN1S2MzSTzImhWXOgCjxzvyVC4IxTc4sclK_ImTFcwoS0AbjZpGPA1Z5Y09cPPeLGUWY2ZKpbZfoOPrb7T-vZ8JHlYHnb85UbRd3R5p2MP-YnJdGJSJS'
          }
        });
      });

      it('should call onSameDayButtonClick when sameDayUpdates is available and passengerSearchToken is undefined', () => {
        const onSameDayButtonClickStub = jest.fn();
        const { container } = createComponent({
          sameDayBlockedMessage: null,
          sameDayUpdates: {
            href: '/v1/mobile-air-operations/page/same-day/4ENWXX',
            method: 'POST',
            body: {
              passengerSearchToken: undefined
            }
          },
          onSameDayButtonClick: onSameDayButtonClickStub
        });

        fireEvent.click(container.querySelector('.boarding-info--same-day-change-buttons'));
        expect(onSameDayButtonClickStub).toHaveBeenCalledWith({
          href: '/v1/mobile-air-operations/page/same-day/4ENWXX',
          method: 'POST',
          body: {
            passengerSearchToken: undefined
          }
        });
      });
    });

    describe('when same day button is clicked and the traveler has inactive bags', () => {
      it('should not render modal when viewReservationSearchRequest is null', () => {
        const { container } = createComponent({ viewReservationSearchRequest: null });
  
        expect(container.querySelector('.boarding-info--same-day-change-buttons')).toMatchSnapshot();
      });
  
      it('should not render modal when viewModifyCheckedBags is null', () => {
        const { container } = createComponent({ viewModifyCheckedBags: null });
  
        expect(container.querySelector('.boarding-info--same-day-change-buttons')).toMatchSnapshot();
      });

      describe('when sameDayBlockedMessage', () => {
        describe('when UI_ENCRYPTION is true', () => {
          it('should render popup and redirect to bags on click with encrypted link', async () => {
            const { container } = createComponent({
              UI_ENCRYPTION: true,
              sameDayBlockedMessage: mockSameDayBlockedBagsStandbyMessage
            });

            fireEvent.click(container.querySelector('.boarding-info--same-day-change-buttons'));
          
            hideDialogFnStub.mockResolvedValue();
            await showDialogFnStub.mock.calls[0][0].buttons[1].onClick();
    
            expect(onCheckBagsButtonClickStub).toHaveBeenCalledWith(mockHref);
          });
        });

        describe('when UI_ENCRYPTION is false', () => {
          it('should render popup and redirect to bags on click with viewModifyCheckedBags url', async () => {
            const { container } = createComponent({
              sameDayBlockedMessage: mockSameDayBlockedBagsStandbyMessage,
              viewModifyCheckedBags: mockViewModifyCheckedBags
            });
    
            fireEvent.click(container.querySelector('.boarding-info--same-day-change-buttons'));
          
            hideDialogFnStub.mockResolvedValue();
            await showDialogFnStub.mock.calls[0][0].buttons[1].onClick();
    
            expect(onCheckBagsButtonClickStub).toHaveBeenCalledWith(mockUrl);
          });
        });
      });
    });

    describe('when same day button is clicked and the traveler is already on stand-by for one bound', () => {
      it('should able to render a popup and able to click ok button to close the it', async () => {
        const { container } = createComponent({
          sameDayBlockedMessage: mockSameDayBlockedAlreadyStandbyMessage
        });

        fireEvent.click(container.querySelector('.boarding-info--same-day-change-buttons'));

        await showDialogFnStub.mock.calls[0][0].buttons[0].onClick();

        expect(hideDialogFnStub).toHaveBeenCalled();
      });
    });
  });

  describe('Options with next steps', () => {
    it('should show options and next steps button', () => {
      const { container } = createComponent({
        optionsAndNextSteps: {
          href: 'doNotUse',
          labelText: 'Options and next steps',
          url: 'https://www.southwest.com/help/changes-and-cancellations/changing-cancelling-flights#southwest-cancels-flight?clk=TRPCRD_SWACNCL_NEXT'
        }
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('Grey Box Messages', () => {
    it('should show PNR level grey box message if available', () => {
      const { container } = createComponent({
        greyBoxMessage: {
          key: 'GREY_BOX_UNAVAILABLE_FLIGHT_CLOSED',
          header: 'Please visit a ticket counter or gate agent.',
          body: null
        },
        greyBoxPassengerMessage: {
          key: 'GREY_BOX_UNAVAILABLE_INTL',
          header: 'This flight is not eligible for Mobile Boarding Pass.',
          body: 'Please visit a kiosk or a ticket counter for your boarding passes.'
        }
      });

      expect(container).toMatchSnapshot();
    });

    it('should should passenger level grey box message if available', () => {
      const { container } = createComponent({
        greyBoxMessage: {
          key: 'GREY_BOX_UNAVAILABLE_FLIGHT_CLOSED',
          header: 'Please visit a ticket counter or gate agent.',
          body: null
        },
        greyBoxPassengerMessage: {
          key: 'GREY_BOX_UNAVAILABLE_INTL',
          header: 'This flight is not eligible for Mobile Boarding Pass.',
          body: 'Please visit a kiosk or a ticket counter for your boarding passes.'
        }
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('cancel button', () => {
    it('should render cancel button when cancel link is available in the response', () => {
      const { container } = createComponent();

      expect(container.querySelector('button.manage-button-cancel')).toBeInTheDocument();
    });

    it('should not render cancel button when cancel link is unavailable in the response', () => {
      const { container } = createComponent({
        shouldSuppressUnmodifiablePnr: true
      });

      expect(container.querySelector('button.manage-button-cancel')).not.toBeInTheDocument();
    });

    it('should trigger the cancel callback when click cancel button', () => {
      const clickStub = jest.fn();

      const { container } = createComponent({
        onCancelFlightClick: clickStub
      });

      fireEvent.click(container.querySelector('button.manage-button-cancel'));

      expect(clickStub).toHaveBeenCalled();
    });
  });

  describe('non rev pnr', () => {
    it('should render change button when is non rev pnr', () => {
      const { container } = createComponent();

      expect(container.querySelector('button.manage-button-change')).toBeInTheDocument();
    });

    it('should not render change button when change link is unavailable in the response', () => {
      const { container } = createComponent({
        shouldSuppressUnmodifiablePnr: true
      });

      expect(container.querySelector('button.manage-button-change')).not.toBeInTheDocument();
    });

    it('should trigger the change callback when click change button', () => {
      const clickStub = jest.fn();

      const { container } = createComponent({
        onChangeFlightClick: clickStub
      });

      fireEvent.click(container.querySelector('button.manage-button-change'));

      expect(clickStub).toHaveBeenCalled();
    });

    it('should render cancel button when is non rev pnr', () => {
      const { container } = createComponent();

      expect(container.querySelector('button.manage-button-cancel')).toBeInTheDocument();
    });

    it('should not render cancel button when cancel link is unavailable in the response', () => {
      const { container } = createComponent({
        shouldSuppressUnmodifiablePnr: true
      });

      expect(container.querySelector('button.manage-button-cancel')).not.toBeInTheDocument();
    });

    it('should trigger the cancel callback when click cancel button', () => {
      const clickStub = jest.fn();

      const { container } = createComponent({
        onCancelFlightClick: clickStub
      });

      fireEvent.click(container.querySelector('button.manage-button-cancel'));

      expect(clickStub).toHaveBeenCalled();
    });
  });

  describe('add companion button', () => {
    it('should render the Add Companion button', () => {
      const clickStub = jest.fn();
      const { container } = createComponent({
        shouldShowAddCompanionButton: true,
        onAddCompanionButtonClick: clickStub
      });

      expect(container.querySelector('[data-qa="add-companion"]')).toBeInTheDocument();
    });

    it('should not render the Add Companion button', () => {
      const clickStub = jest.fn();
      const { container } = createComponent({
        shouldShowAddCompanionButton: false,
        onAddCompanionButtonClick: clickStub
      });

      expect(container.querySelector('[data-qa="add-companion"]')).not.toBeInTheDocument();
    });

    describe('when clicked', () => {
      it('should invoke the callback passed to handle the click of the Add Companion button', () => {
        const clickStub = jest.fn();
        const { container } = createComponent({
          shouldShowAddCompanionButton: true,
          onAddCompanionButtonClick: clickStub
        });

        fireEvent.click(container.querySelector('[data-qa="add-companion"]'));

        expect(clickStub).toHaveBeenCalledTimes(1);
      });
    });
  });

  it('should not render the dayOfTravelContactSelect when the contactInformation is null', () => {
    const { container } = createComponent();

    expect(container.querySelector('div.day-of-travel-wrapper')).not.toBeInTheDocument();
  });

  it('should render the dayOfTravelContactSelect when the contactInformation exists', () => {
    const { container } = createComponent({ contactInformation: {} });

    expect(container.querySelector('div.day-of-travel-wrapper')).toBeInTheDocument();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      checkIn: null,
      checkInIneligibilityReason: null,
      companion: null,
      confirmationNumber: 'ABCDEF',
      contactInformation: null,
      contactTracing: null,
      date: 'Aug 19',
      dayOfTravelContactInfo: '',
      destinationAirport: 'AUS',
      destinationDescription: 'Dallas',
      EnableGreyBoxMessages: false,
      greyBoxMessage: null,
      greyBoxPassengerMessage: null,
      hasUnaccompaniedMinor: false,
      hideDialogFn: hideDialogFnStub,
      isCheckInEligible: true,
      isInternational: false,
      isNonRevPnr: false,
      onAddCompanionButtonClick: jest.fn(noop),
      onCancelFlightClick: jest.fn(noop),
      onChangeFlightClick: jest.fn(noop),
      onCheckBagsButtonClick: onCheckBagsButtonClickStub,
      onCheckInButtonClick: onCheckInButtonClickStub,
      onContactInfoClick: jest.fn(),
      onContactTracingButtonClick: jest.fn(noop),
      onSameDayButtonClick: jest.fn(),
      onViewBoardingPassButtonClickCb: jest.fn(noop),
      onViewBoardingPositionsButtonClick: jest.fn(noop),
      originAirport: 'DAL',
      passengers: [
        {
          name: 'Amber Awesome',
          hasExtraSeat: false,
          isCheckedIn: false,
          isCheckInEligible: true,
          hasCompletePassportInfo: false,
          passengerReference: '1',
          accountNumber: '6125489756',
          hasAnyEarlyBird: false
        },
        {
          name: 'Ron hackman',
          hasExtraSeat: false,
          isCheckedIn: false,
          isCheckInEligible: true,
          hasCompletePassportInfo: false,
          passengerReference: '2',
          accountNumber: '6125486987',
          hasAnyEarlyBird: false
        }
      ],
      sameDayBlockedMessage: null,
      sameDayUpdates: null,
      shouldShowAddCompanionButton: false,
      shouldShowAddEarlyBirdButton: false,
      shouldShowContactTracingButton: false,
      shouldSuppressUnmodifiablePnr: false,
      showDialogFn: showDialogFnStub,
      UI_ENCRYPTION: false,
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      viewReservationSearchRequest: {
        firstName: 'Amber',
        lastName: 'Awesome',
        recordLocator: 'J5LOZM'
      }
    };
    const newProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <Provider store={createMockedFormStore()}>
        <BoardingInfo {...newProps} />
      </Provider>
    );
  };
});
