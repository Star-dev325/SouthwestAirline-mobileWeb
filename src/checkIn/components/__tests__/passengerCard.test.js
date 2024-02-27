jest.mock('src/checkIn/components/mobileBoardingPassMessage', () => () => <div>greyBoxMessage</div>);

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import PassengerCard from 'src/checkIn/components/passengerCard';

describe('PassengerCard', () => {
  const onUpgradedBoardingButtonClickStub = jest.fn();
  const onViewBoardingPassButtonClickCb = jest.fn();

  const passenger = {
    _links: {
      viewPassengerBoardingPass: {
        body: {
          firstName: 'Firstname',
          lastName: 'Lastname',
          travelerID: ['2301DC640000E12B']
        },
        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/P9LEU6',
        method: 'POST'
      }
    },
    boardingGroup: null,
    confirmationNumber: 'SQ8U52',
    hasPrecheck: false,
    mobileBoardingPassEligible: false,
    mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
    name: 'Firstname Lastname',
    passengerLabelText: 'PASSENGER',
    position: null,
    specialAssistanceMessage: null
  };

  it('should render correctly', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should show boarding info when boarding group and position is available', () => {
    const passengerWithBoardingPosition = { ...passenger, ...{ boardingPosition: '18', boardingGroup: 'A' } };

    expect(createComponent({ passenger: passengerWithBoardingPosition }).container).toMatchSnapshot();
  });

  it('should show the TSA Icon when the passenger has TSA Precheck', () => {
    const passengerWithTSAPrecheck = { ...passenger, ...{ hasPrecheck: true } };

    expect(createComponent({ passenger: passengerWithTSAPrecheck }).container).toMatchSnapshot();
  });

  it('should show the special assistance message when the passenger has SA items chosen', () => {
    const passengerWithSpecialAssistance = {
      ...passenger,
      ...{
        specialAssistanceMessage: {
          body: 'Fake special assistance message',
          icon: '',
          key: ''
        }
      }
    };

    expect(createComponent({ passenger: passengerWithSpecialAssistance }).container).toMatchSnapshot();
  });

  it('should not show kiosk message when MBP is available and should show view boarding pass button', () => {
    const passengerWithMBP = {
      ...passenger,
      ...{
        mobileBoardingPassEligible: true,
        mobileBoardingPassIneligibilityErrorCode: null
      }
    };

    expect(createComponent({ passenger: passengerWithMBP }).container).toMatchSnapshot();
  });

  it('should show companion label when passenger is companion', () => {
    const passengerCompanion = { ...passenger, ...{ isCompanion: true } };

    expect(createComponent({ passenger: passengerCompanion }).container).toMatchSnapshot();
  });

  it('should use labelText on YellowButton if has value', () => {
    const passengerWithButtonLabel = {
      ...passenger,
      ...{
        _links: {
          viewPassengerBoardingPass: {
            labelText: 'button label'
          }
        }
      }
    };

    expect(createComponent({ passenger: passengerWithButtonLabel }).container).toMatchSnapshot();
  });

  describe('viewPassengerBoardingPass is null', () => {
    it('should render correctly', () => {
      const passengerWithNoViewPassengerBoardingPass = {
        ...passenger,
        ...{
          _links: {
            viewPassengerBoardingPass: null
          },
          greyBoxMessage: {
            body: 'grey box message'
          }
        }
      };

      expect(createComponent({ passenger: passengerWithNoViewPassengerBoardingPass }).container).toMatchSnapshot();
    });
  });

  describe('healthDocument present', () => {
    it('should display health document button', () => {
      const passengerWithHealthDocument = {
        ...passenger,
        ...{
          _links: {
            healthDocument: {
              href: 'https://southwest.salesforce.com/healthDocs',
              url: 'https://southwest.salesforce.com/healthDocs',
              labelText: 'View Health Documents'
            }
          }
        }
      };

      expect(createComponent({ passenger: passengerWithHealthDocument }).container).toMatchSnapshot();
    });
  });

  describe('viewUpgradedBoarding present', () => {
    const passengerWithViewUpgradedBoarding = {
      ...passenger,
      ...{
        _links: {
          viewUpgradedBoarding: {
            body: {
              passengerSearchToken: 'testToken'
            },
            href: 'v1/mobile-air-operations/page/upgraded-boarding/4TY8HO',
            method: 'POST',
            labelText: 'Upgrade boarding position to A1 - A15'
          }
        }
      }
    };

    it('should show Upgraded Boarding button when UPGRADED_BOARDING is true', () => {
      expect(
        createComponent({ passenger: passengerWithViewUpgradedBoarding, UPGRADED_BOARDING: true })
      ).toMatchSnapshot();
    });

    it('should not show Upgraded Boarding button when UPGRADED_BOARDING is false', () => {
      expect(createComponent({ passenger: passengerWithViewUpgradedBoarding }).container).toMatchSnapshot();
    });

    it('should call onUpgradedBoardingButtonClick with correct link object when user clicks Upgraded Boarding button', () => {
      const { container } = createComponent({ passenger: passengerWithViewUpgradedBoarding, UPGRADED_BOARDING: true });
      const linkObj = {
        body: { passengerSearchToken: 'testToken' },
        href: 'v1/mobile-air-operations/page/upgraded-boarding/4TY8HO',
        labelText: 'Upgrade boarding position to A1 - A15',
        method: 'POST'
      };

      fireEvent.click(container.querySelector('Button'));

      expect(onUpgradedBoardingButtonClickStub).toHaveBeenCalledWith(linkObj);
    });

    describe('healthDocument present and UPGRADED_BOARDING is true', () => {
      it('should display health document button', () => {
        const passengerWithHealthDocument = {
          ...passengerWithViewUpgradedBoarding,
          ...{
            _links: {
              healthDocument: {
                href: 'https://southwest.salesforce.com/healthDocs',
                url: 'https://southwest.salesforce.com/healthDocs',
                labelText: 'View Health Documents'
              },
              viewPassengerBoardingPass: null
            },
            greyBoxMessage: {
              body: 'grey box message'
            }
          }
        };

        expect(
          createComponent({ passenger: passengerWithHealthDocument, UPGRADED_BOARDING: true }).container
        ).toMatchSnapshot();
      });
    });

    describe('lap infant is present on booking and isInfant is true', () => {
      it('should display health document button', () => {
        const passengerWithLapInfant = {
          ...passenger,
          isInfant: true
        };

        expect(
          createComponent({ passenger: passengerWithLapInfant }).container
        ).toMatchSnapshot();
      });
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      onUpgradedBoardingButtonClick: onUpgradedBoardingButtonClickStub,
      onViewBoardingPassButtonClickCb: onViewBoardingPassButtonClickCb,
      passenger: passenger,
      UPGRADED_BOARDING: false
    };

    const combinedProps = { ...defaultProps, ...props };

    return render(<PassengerCard {...combinedProps} />);
  };
});
