import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import ConfirmationYoungTravelerSection from 'src/shared/components/confirmationYoungTravelerSection';
import FlightsPurchasePageBuilder from 'test/builders/apiResponse/flightsPurchasePageBuilder';

describe('confirmationYoungTravelerSection', () => {
  const response = new FlightsPurchasePageBuilder().withYoungTravelerParentGuardianPnr().build().flightConfirmationPage;
  const mockHideDialogFn = jest.fn();
  const mockShowDialogFn = jest.fn();

  it('should show young traveler section', () => {
    const { container } = createComponent({
      parentGuardianDetails: response.pnrs[0].parentGuardianDetails,
      youngTravelersDetails: response.pnrs[0].youngTravelersDetails
    });

    expect(container).toMatchSnapshot();
  });

  it('should close parent or guardian modal on button click', async () => {
    const { container } = createComponent({
      hideDialogFn: mockHideDialogFn,
      parentGuardianDetails: response.pnrs[0].parentGuardianDetails,
      showDialogFn: mockShowDialogFn,
      youngTravelersDetails: response.pnrs[0].youngTravelersDetails
    });

    fireEvent.click(container.querySelector('.icon-and-brief-info--button'));
    mockShowDialogFn.mock.calls[0][0].buttons[0].onClick();

    expect(mockHideDialogFn).toBeCalled();
  });

  it('should open parent or guardian modal on button click', () => {
    const { container } = createComponent({
      parentGuardianDetails: response.pnrs[0].parentGuardianDetails,
      showDialogFn: mockShowDialogFn,
      youngTravelersDetails: response.pnrs[0].youngTravelersDetails
    });

    fireEvent.click(container.querySelector('.icon-and-brief-info--button'));

    expect(mockShowDialogFn).toHaveBeenCalledWith({
      buttons: expect.arrayContaining([expect.objectContaining({ label: 'Got it' })]),
      contentView: expect.any(Object),
      name: 'confirmation-parent-guardian-dialog',
      title: 'Parent/guardian',
      titleClassName: 'confirmation-parent-guardian-dialog--title'
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      parentGuardianDetails: {},
      youngTravelersDetails: {}
    };
    const finalProps = { ...defaultProps, ...props };

    return render(<ConfirmationYoungTravelerSection {...finalProps} />);
  };
});
