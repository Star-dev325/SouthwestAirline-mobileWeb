import userEvent from '@testing-library/user-event';
import * as CheckInActions from 'src/checkIn/actions/checkInActions';
import { ChooseMobileBoardingPassesPage } from 'src/checkIn/pages/chooseMobileBoardingPassesPage';
import CheckInConfirmationBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInConfirmationBuilder';
import { createComponentRender } from 'test/unit/helpers/testUtils';

describe('ChooseMobileBoardingPassesPage', () => {
  let flights;
  let goDirectlyToBoardingPassesFnStub;
  let viewAllBoardingPasses;

  beforeEach(() => {
    goDirectlyToBoardingPassesFnStub = jest.spyOn(CheckInActions, 'goDirectlyToBoardingPasses');

    ({ flights } = new CheckInConfirmationBuilder()
      .withPassengersByCount(2)
      .withViewPassengerBoardingPass()
      .withFlightWithConnection()
      .build().checkInConfirmationPage);

    viewAllBoardingPasses = {
      body: {
        firstName: 'AGE',
        lastName: 'OLDER',
        travelerID: ['2401DC580000A73F', '2401DC580000A740']
      },
      href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/N5CYRP',
      labelText: 'view all security documents',
      method: 'POST',
      nonSequentialPositionsMessage: null
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('render', () => {
    it('should render page sub header', () => {
      const { getByText } = createPageComponent();

      expect(getByText('CHECK_IN__MOBILE_BOARDING_PASS__PAGE_SUB_HEADER_LABEL')).not.toBeNull();
    });

    it('should render form', () => {
      const { container } = createPageComponent();

      expect(container.querySelector('.choose-mobile-boarding-passes-form')).not.toBeNull();
    });
  });

  describe('submit', () => {
    it('should call goDirectlyToBoardingPasses action when form is submitted and set clk url param if labelText has value', async () => {
      const { container } = createPageComponent();

      await userEvent.click(container.querySelector('.choose-mobile-boarding-passes-form button'));

      const expectedResult = {
        ...viewAllBoardingPasses,
        body: {
          ...viewAllBoardingPasses.body,
          travelerSegmentIdentifier: ['2301DC520002823E', '2301DC5200028240', '2301DC520002823E', '2301DC5200028240'],
          travelerID: ['0000000000000001', '0000000000000002']
        }
      };

      expect(goDirectlyToBoardingPassesFnStub).toHaveBeenCalledWith({
        queryParams: { clk: 'secdoc_boardingdetails' },
        recordLocator: 'N5CYRP',
        viewBoardingPassesLink: expectedResult
      });
    });

    it('should call goDirectlyToBoardingPasses action when form is submitted and not set clk url param if labelText has wrong value', async () => {
      viewAllBoardingPasses = {
        body: {
          firstName: 'AGE',
          lastName: 'OLDER',
          travelerID: ['2401DC580000A73F', '2401DC580000A740']
        },
        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/N5CYRP',
        labelText: 'some other button',
        method: 'POST',
        nonSequentialPositionsMessage: null
      };

      const { container } = createPageComponent();

      await userEvent.click(container.querySelector('.choose-mobile-boarding-passes-form button'));

      const expectedResult = {
        ...viewAllBoardingPasses,
        body: {
          ...viewAllBoardingPasses.body,
          travelerSegmentIdentifier: ['2301DC520002823E', '2301DC5200028240', '2301DC520002823E', '2301DC5200028240'],
          travelerID: ['0000000000000001', '0000000000000002']
        }
      };

      expect(goDirectlyToBoardingPassesFnStub).toHaveBeenCalledWith({
        queryParams: null,
        recordLocator: 'N5CYRP',
        viewBoardingPassesLink: expectedResult
      });
    });

    it('should call goDirectlyToBoardingPasses action when form is submitted and not set clk url param if labelText has no value', async () => {
      viewAllBoardingPasses = {
        body: {
          firstName: 'AGE',
          lastName: 'OLDER',
          travelerID: ['2401DC580000A73F', '2401DC580000A740']
        },
        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/N5CYRP',
        method: 'POST',
        nonSequentialPositionsMessage: null
      };

      const { container } = createPageComponent();

      await userEvent.click(container.querySelector('.choose-mobile-boarding-passes-form button'));

      const expectedResult = {
        ...viewAllBoardingPasses,
        body: {
          ...viewAllBoardingPasses.body,
          travelerSegmentIdentifier: ['2301DC520002823E', '2301DC5200028240', '2301DC520002823E', '2301DC5200028240'],
          travelerID: ['0000000000000001', '0000000000000002']
        }
      };

      expect(goDirectlyToBoardingPassesFnStub).toHaveBeenCalledWith({
        queryParams: null,
        recordLocator: 'N5CYRP',
        viewBoardingPassesLink: expectedResult
      });
    });

    it('should not call onSubmit and should display red error icon when form is submitted with no passes selected', async () => {
      const emptyFlightList = [];
      const { container, getByText } = createPageComponent(emptyFlightList);

      const allPassesCheckbox = getByText('CHECK_IN__MOBILE_BOARDING_PASS__ALL_PASSES_CHECKBOX_LABEL');

      await userEvent.click(allPassesCheckbox);

      await userEvent.click(container.querySelector('.choose-mobile-boarding-passes-form button'));

      expect(getByText('SHARED__ERROR_MESSAGES__CHECKIN_MP_PASSES_NONE_SELECTED')).not.toBeNull();
      expect(goDirectlyToBoardingPassesFnStub).not.toHaveBeenCalled();
    });

    describe('ineligible pax', () => {
      it('should call updateViewBoardingPass action with the correct travelerIds and segmentIds in the link object when not all segments are selected', async () => {
        const flightsWithIneligiblePassenger = new CheckInConfirmationBuilder()
          .withFlightsAndIneligiblePassenger()
          .build().checkInConfirmationPage.flights;

        const { container } = createPageComponent(flightsWithIneligiblePassenger);

        await userEvent.click(container.querySelector('.choose-mobile-boarding-passes-form button'));

        expect(CheckInActions.goDirectlyToBoardingPasses).toHaveBeenCalled();
        expect(CheckInActions.goDirectlyToBoardingPasses).toHaveBeenCalledWith({
          queryParams: {
            clk: 'secdoc_boardingdetails'
          },
          recordLocator: 'N5CYRP',
          viewBoardingPassesLink: {
            body: {
              firstName: 'AGE',
              lastName: 'OLDER',
              travelerID: ['2301CC6D0000E194', '2301CC6D0000E196'],
              travelerSegmentIdentifier: [
                '2301DC6D0001F8E2',
                '2301DC6D0001F8E4',
                '2301DC6D0001F8E6',
                '2301DC6D0001F8E8'
              ]
            },
            href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/N5CYRP',
            labelText: 'view all security documents',
            method: 'POST',
            nonSequentialPositionsMessage: null
          }
        });
      });
    });
  });

  const createPageComponent = (defaultFlights = flights) => {
    const props = {
      flights: defaultFlights,
      goDirectlyToBoardingPassesFn: goDirectlyToBoardingPassesFnStub,
      viewAllBoardingPasses
    };

    const wrapper = createComponentRender(ChooseMobileBoardingPassesPage, { props });

    return wrapper;
  };
});
