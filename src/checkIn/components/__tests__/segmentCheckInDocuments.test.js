import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import SegmentCheckInDocuments from 'src/checkIn/components/segmentCheckInDocuments';

describe('SegmentCheckInDocuments', () => {
  const onViewBoardingPassButtonClickCb = jest.fn();
  let segmentCheckInDocuments;

  beforeEach(() => {
    const passengers = [
      {
        _links: {
          viewPassengerBoardingPass: { key: 'value' }
        },
        boardingGroup: 'A',
        confirmationNumber: 'T4N5GH',
        hasPrecheck: false,
        mobileBoardingPassEligible: false,
        mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
        name: 'Tang Zhen',
        passengerLabelText: 'PASSENGER',
        position: '19'
      },
      {
        _links: {
          viewPassengerBoardingPass: { key: 'value' }
        },
        boardingGroup: 'A',
        confirmationNumber: 'T4N5GH',
        hasPrecheck: false,
        mobileBoardingPassEligible: false,
        mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
        name: 'Siyang Li',
        passengerLabelText: 'PASSENGER',
        position: '20'
      }
    ];

    segmentCheckInDocuments = render(
      <SegmentCheckInDocuments
        onUpgradedBoardingButtonClick={() => {}}
        onViewBoardingPassButtonClickCb={onViewBoardingPassButtonClickCb}
        passengers={passengers}
        UPGRADED_BOARDING={false}
      />
    );
  });

  it('should render two passengerCard correctly', () => {
    const { container } = segmentCheckInDocuments;
    const passengerCards = container.querySelectorAll('.passenger-card');
    const passengerNames = container.querySelectorAll('.passenger-card--name');

    expect(passengerCards).toHaveLength(2);
    expect(passengerNames[0].textContent).toEqual('Tang Zhen');
    expect(passengerNames[1].textContent).toEqual('Siyang Li');
    expect(container).toMatchSnapshot();
  });

  it('should call onViewBoardingPassButtonClickCb when View Boarding Pass button is clicked', () => {
    const { container } = segmentCheckInDocuments;
    const viewBoardingPassButtons = container.querySelectorAll('[title="SHARED__BUTTON_TEXT__VIEW_BOARDING_PASS"]');

    fireEvent.click(viewBoardingPassButtons[0]);

    expect(onViewBoardingPassButtonClickCb).toHaveBeenCalled();
  });
});
