jest.mock('@swa-ui/encryption', () => ({
  TextEncoder: jest.fn(),
  useHref: () => ({ href: 'mock_href' })
}));
jest.mock('src/shared/helpers/browserObject', () => ({ location: { pathname: '/check-in', reload: jest.fn() } }));

import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BoardingPositionsPage } from 'src/checkIn/pages/boardingPositionsPage';
import {
  clearHasSeenNonsequentialMessage,
  saveHasSeenNonsequentialMessage
} from 'src/shared/helpers/nonsequentialBoardingHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import CheckInConfirmationBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInConfirmationBuilder';
import FooterWithLinksBuilder from 'test/builders/model/footerWithLinksBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';
import { mockErrorHeaderContainerWithJest } from 'test/unit/helpers/testUtils';

const mockStore = createMockStore();

describe('boardingPositionsPage', () => {
  let goDirectlyToBoardingPassesFnMock,
    hideDialogFnMock,
    pushMock,
    showDialogFnMock,
    showShareLinkFnMock,
    store;

  beforeEach(() => {
    store = mockStore({});
    mockErrorHeaderContainerWithJest(jest);

    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('check-in');
    showShareLinkFnMock = jest.fn();
    pushMock = jest.fn();
    goDirectlyToBoardingPassesFnMock = jest.fn();
    showDialogFnMock = jest.fn();
    hideDialogFnMock = jest.fn(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with flight information', () => {
    const flights = [
      {
        boundIndex: 0,
        departureTime: '07:35',
        flightNumber: '1',
        passengers: [
          {
            confirmationNumber: '123ABC',
            name: 'Fred Flintstone'
          }
        ]
      }
    ];

    const { container } = createComponent({ flights });

    expect(container).toMatchSnapshot();
  });

  it('should render the component when the messages are available', () => {
    const messages = [
      {
        body: 'Message Body',
        header: 'Message Header',
        key: 'INTER_ISLAND__MESSAGE',
        learnMoreUrl: 'Message URL'
      }
    ];

    const { container } = createComponent({ messages });

    expect(container).toMatchSnapshot();
  });

  it('should render the component when the messages are not available', () => {
    const messages = [];

    const { container } = createComponent({ messages });

    expect(container).toMatchSnapshot();
  });

  it('should display an EditContactMethodMessage if contactInformationMessage has contents and toggle is true', () => {
    const contactInformationMessage = {
      key: 'VERIFY_CONTACT_METHOD',
      header: null,
      body: 'Please verify that your day of travel contact method is correct so we can keep you updated on changes or cancellations.',
      linkText: 'Edit contact method',
      icon: 'NONE',
      textColor: 'DEFAULT'
    };

    const { container } = createComponent({ contactInformationMessage });

    expect(container).toMatchSnapshot();
  });

  it('should not display an EditContactMethodMessage if contactInformationMessage has contents and toggle is FALSE', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should show footer HTML when footerWithLinks is present from CHAPI', () => {
    const { footerWithLinks } = new FooterWithLinksBuilder().build();
    const { container } = createComponent({ footerWithLinks });

    expect(container).toMatchSnapshot();
  });

  it('should not show footer HTML when footerWithLinks is not coming from CHAPI', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  describe('viewAllBoardingPassesLink is null', () => {
    it('should not display the View all boarding passes button', () => {
      const { container } = createComponent({ viewAllBoardingPassesLink: null });

      expect(container).toMatchSnapshot();
    });
  });

  describe('boarding pass', () => {
    describe('boarding pass available', () => {
      let flights;
      let checkInConfirmationPage;

      it('should navigate to boarding pass page when you click `Security document` button', () => {
        ({
          checkInConfirmationPage: { flights }
        } = new CheckInConfirmationBuilder()
          .withRecordLocator('XYZABC')
          .withPassengerName({
            firstName: 'Bruce',
            lastName: 'Wayne'
          })
          .withViewPassengerBoardingPass('Security document')
          .withBoardingPassIssuanceLink()
          .build());

        const { container } = createComponent({ flights, checkInConfirmationPage });

        fireEvent.click(container.querySelectorAll('.view-boarding-pass-btn')[0].querySelector('button'));

        expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
          firstName: 'Bruce',
          lastName: 'Wayne',
          recordLocator: 'XYZABC',
          viewBoardingPassesLink: {
            body: { firstName: undefined, lastName: undefined, travelerID: ['0000000000000001'] },
            href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/XYZABC',
            method: 'POST',
            labelText: 'Security document'
          },
          queryParams: { clk: 'secdoc_boardingdetails' }
        });
      });
    });
  });

  describe('labelText has value', () => {
    let flights;
    let viewAllBoardingPassesLink;

    it('should have overridden text on button', () => {
      const { checkInConfirmationPage } = new CheckInConfirmationBuilder()
        .withPassengersByCount(3)
        .withViewPassengerBoardingPass()
        .withViewAllBoardingPassesLink('override')
        .build();

      ({
        flights,
        _links: { viewAllBoardingPasses: viewAllBoardingPassesLink }
      } = checkInConfirmationPage);
      
      const { container } = createComponent({ flights, viewAllBoardingPassesLink });

      expect(container).toMatchSnapshot();
    });

    it('should set viewBoardingPassIssuance to null if the _links object does not exist', () => {
      const { checkInConfirmationPage } = new CheckInConfirmationBuilder()
        .withRecordLocator('XYZABC')
        .withViewPassengerBoardingPass('Boarding Pass')
        .withPassengerName({
          firstName: 'Bruce',
          lastName: 'Wayne'
        })
        .build();

      ({ 
        flights
      } = checkInConfirmationPage);

      checkInConfirmationPage._links.viewBoardingPassIssuance = undefined;

      const { container } = createComponent({ flights, checkInConfirmationPage });

      fireEvent.click(container.querySelectorAll('.view-boarding-pass-btn')[0].querySelector('button'));

      expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
        firstName: 'Bruce',
        lastName: 'Wayne',
        queryParams: null,
        recordLocator: 'XYZABC',
        viewBoardingPassesLink: {
          body: {
            firstName: undefined,
            lastName: undefined,
            travelerID: [
              '0000000000000001'
            ]
          },
          href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/XYZABC',
          labelText: 'Boarding Pass',
          method: 'POST'
        }
      });
    });
  });

  describe('viewAllBoardingPassesLink is not null', () => {
    let viewAllBoardingPassesButton;
    let flights;

    beforeEach(() => {
      ({ flights } = new CheckInConfirmationBuilder()
        .withPassengersByCount(3)
        .withViewPassengerBoardingPass()
        .build().checkInConfirmationPage);
      const { container } = createComponent({ flights });

      viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');
    });

    describe('with exactly 2 pax with nonstop flight', () => {
      let viewAllBoardingPassesLink;
      let flights;

      it('should use viewPassengerBoardingPass for viewBoardingPassesLink even when viewBoardingPassIssuance is null', () => {

      });

      it('should go directly to boarding passes and view all and show default button text', () => {
        ({ flights } = new CheckInConfirmationBuilder()
          .withPassengersByCount(2)
          .withViewPassengerBoardingPass()
          .build().checkInConfirmationPage);

        viewAllBoardingPassesLink = {
          body: {
            firstName: 'Michael',
            lastName: 'Joseph',
            travelerID: ['0000000000000001', '0000000000000002']
          },
          href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
          method: 'POST',
          nonSequentialPositionsMessage: null
        };
        const { container } = createComponent({ flights, viewAllBoardingPassesLink });

        viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

        fireEvent.click(viewAllBoardingPassesButton);

        expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
          viewBoardingPassesLink: {
            href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
            method: 'POST',
            body: {
              firstName: 'Michael',
              lastName: 'Joseph',
              travelerID: ['0000000000000001', '0000000000000002']
            },
            nonSequentialPositionsMessage: null
          },
          recordLocator: '123ABC',
          queryParams: null
        });
      });

      it('should go directly to boarding passes and view all and show custom "View All Boarding Passes" labelText', () => {
        ({ flights } = new CheckInConfirmationBuilder()
          .withPassengersByCount(2)
          .withViewPassengerBoardingPass()
          .build().checkInConfirmationPage);

        viewAllBoardingPassesLink = {
          body: {
            firstName: 'Michael',
            lastName: 'Joseph',
            travelerID: ['0000000000000001', '0000000000000002']
          },
          href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
          method: 'POST',
          nonSequentialPositionsMessage: null,
          labelText: 'View All Boarding Passes'
        };
        const { container } = createComponent({ flights, viewAllBoardingPassesLink });

        viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

        fireEvent.click(viewAllBoardingPassesButton);

        expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
          viewBoardingPassesLink: {
            href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
            method: 'POST',
            body: {
              firstName: 'Michael',
              lastName: 'Joseph',
              travelerID: ['0000000000000001', '0000000000000002']
            },
            nonSequentialPositionsMessage: null,
            labelText: 'View All Boarding Passes'
          },
          recordLocator: '123ABC',
          queryParams: null
        });
      });

      it('should go directly to boarding passes and view all and show custom "View all security documents" labelText', () => {
        ({ flights } = new CheckInConfirmationBuilder()
          .withPassengersByCount(2)
          .withViewPassengerBoardingPass()
          .build().checkInConfirmationPage);

        viewAllBoardingPassesLink = {
          body: {
            firstName: 'Michael',
            lastName: 'Joseph',
            travelerID: ['0000000000000001', '0000000000000002']
          },
          href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
          method: 'POST',
          nonSequentialPositionsMessage: null,
          labelText: 'View all security documents'
        };
        const { container } = createComponent({ flights, viewAllBoardingPassesLink });

        viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

        fireEvent.click(viewAllBoardingPassesButton);

        expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
          viewBoardingPassesLink: {
            href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
            method: 'POST',
            body: {
              firstName: 'Michael',
              lastName: 'Joseph',
              travelerID: ['0000000000000001', '0000000000000002']
            },
            nonSequentialPositionsMessage: null,
            labelText: 'View all security documents'
          },
          recordLocator: '123ABC',
          queryParams: { clk: 'secdoc_boardingdetails' }
        });
      });
    });

    describe('nonSequentialPositionsMessage popup', () => {
      afterEach(() => {
        clearHasSeenNonsequentialMessage();
      });

      it('should not display nonSequential popup if the message is not present', () => {
        const { container } = createComponent();

        viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

        fireEvent.click(viewAllBoardingPassesButton);

        expect(showDialogFnMock).not.toHaveBeenCalled();
      });

      it('should display nonSequential popup if the message is present and it is the first time this PNR has seen it', async () => {
        const { container } = createComponent({
          flights: new CheckInConfirmationBuilder().build().checkInConfirmationPage.flights,
          checkInConfirmationPage: new CheckInConfirmationBuilder().build().checkInConfirmationPage,
          nonSequentialMessage: "You're not in line together"
        });

        viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

        fireEvent.click(viewAllBoardingPassesButton);

        expect(showDialogFnMock).toHaveBeenCalled();

        await clickDialogButton(0);

        expect(hideDialogFnMock).toHaveBeenCalled();
        expect(pushMock).toHaveBeenCalledWith('/check-in/choose-boarding-passes');
      });

      it('should display nonSequential popup if the message is present and it is the first time this PNR has seen it and exactly 2 pax with nonstop', async () => {
        const { container } = createComponent({
          flights: new CheckInConfirmationBuilder().withPassengersByCount(2).build().checkInConfirmationPage.flights,
          checkInConfirmationPage: new CheckInConfirmationBuilder().build().checkInConfirmationPage,
          nonSequentialMessage: "You're not in line together"
        });

        viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

        fireEvent.click(viewAllBoardingPassesButton);

        expect(showDialogFnMock).toHaveBeenCalled();

        await clickDialogButton(0);

        expect(hideDialogFnMock).toHaveBeenCalled();
        expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalled();
      });

      it('should not display nonSequential popup if the message is present and it is not the first time this PNR has seen it', () => {
        const checkInPage = new CheckInConfirmationBuilder().build().checkInConfirmationPage;
        const recordLocator = 'ABC123';

        const { container } = createComponent({
          flights: checkInPage.flights,
          recordLocator,
          checkInConfirmationPage: checkInPage,
          nonSequentialMessage: "You're not in line together",
          hasSeenNonSequentialMessage: true
        });

        saveHasSeenNonsequentialMessage(recordLocator);
        viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

        fireEvent.click(viewAllBoardingPassesButton);

        expect(showDialogFnMock).not.toHaveBeenCalled();
      });
    });

    describe('when user clicks on View all boarding passes button', () => {
      it('should navigate to /check-in/choose-boarding-passes', () => {
        fireEvent.click(viewAllBoardingPassesButton);

        waitFor(() => {
          expect(pushMock).toHaveBeenCalledWith('/check-in/choose-boarding-passes');
        });
      });
    });

    describe('3 passengers are eligble to view boarding pass', () => {
      it('should display three individual View Boarding Pass buttons', () => {
        ({ flights } = new CheckInConfirmationBuilder()
          .withPassengersByCount(3)
          .withViewPassengerBoardingPass()
          .build().checkInConfirmationPage);
        const { container } = createComponent({ flights });

        waitFor(() => {
          expect(container).toMatchSnapshot();
        });
      });

      describe('when user clicks on 1st View Boarding Pass button', () => {
        it("should call goDirectlyToBoardingPasses with 1st passenger's travlerID", async () => {
          ({ flights } = new CheckInConfirmationBuilder()
            .withPassengersByCount(3)
            .withViewPassengerBoardingPass()
            .build().checkInConfirmationPage);
          const { container } = createComponent({ flights });

          viewAllBoardingPassesButton = container.querySelectorAll('.view-boarding-pass-btn button')[0];

          fireEvent.click(viewAllBoardingPassesButton);

          await waitFor(() => {
            expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
              viewBoardingPassesLink: {
                href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
                method: 'POST',
                body: {
                  firstName: 'Michael',
                  lastName: 'Joseph',
                  travelerID: ['0000000000000001']
                },
                labelText: 'Boarding pass'
              },
              firstName: 'Michael',
              lastName: 'Joseph',
              recordLocator: 'SLNTCC',
              queryParams: null
            });
          });
        });
      });

      describe('when user clicks on 2nd View Boarding Pass button', () => {
        it("should call goDirectlyToBoardingPasses with 2nd passenger's travlerID", async () => {
          ({ flights } = new CheckInConfirmationBuilder()
            .withPassengersByCount(3)
            .withViewPassengerBoardingPass()
            .build().checkInConfirmationPage);
          const { container } = createComponent({ flights });

          viewAllBoardingPassesButton = container.querySelectorAll('.view-boarding-pass-btn button')[1];

          fireEvent.click(viewAllBoardingPassesButton);

          await waitFor(() => {
            expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
              viewBoardingPassesLink: {
                href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
                method: 'POST',
                body: {
                  firstName: 'Jackie',
                  lastName: 'Robinson',
                  travelerID: ['0000000000000002']
                },
                labelText: 'Boarding pass'
              },
              firstName: 'Michael',
              lastName: 'Joseph',
              recordLocator: 'SLNTCC',
              queryParams: null
            });
          });
        });

        it('should navigate to /check-in/boarding-pass with state SLNTCC/Michael/Joseph', async () => {
          ({ flights } = new CheckInConfirmationBuilder()
            .withPassengersByCount(3)
            .withViewPassengerBoardingPass()
            .build().checkInConfirmationPage);
          const { container } = createComponent({ flights });

          viewAllBoardingPassesButton = container.querySelectorAll('.view-boarding-pass-btn button')[1];

          fireEvent.click(viewAllBoardingPassesButton);

          await waitFor(() => {
            expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
              viewBoardingPassesLink: {
                href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
                method: 'POST',
                body: {
                  firstName: 'Jackie',
                  lastName: 'Robinson',
                  travelerID: ['0000000000000002']
                },
                labelText: 'Boarding pass'
              },
              firstName: 'Michael',
              lastName: 'Joseph',
              recordLocator: 'SLNTCC',
              queryParams: null
            });
          });
        });
      });

      describe('when user clicks on 3rd individual View Boarding Pass button', () => {
        it("should call goDirectlyToBoardingPasses with 3rd passenger's travlerID", async () => {
          ({ flights } = new CheckInConfirmationBuilder()
            .withPassengersByCount(3)
            .withViewPassengerBoardingPass()
            .build().checkInConfirmationPage);
          const { container } = createComponent({ flights });

          viewAllBoardingPassesButton = container.querySelectorAll('.view-boarding-pass-btn button')[2];

          fireEvent.click(viewAllBoardingPassesButton);

          await waitFor(() => {
            expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
              viewBoardingPassesLink: {
                href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
                method: 'POST',
                body: {
                  firstName: 'Bob',
                  lastName: 'Bobster',
                  travelerID: ['0000000000000003']
                },
                labelText: 'Boarding pass'
              },
              firstName: 'Michael',
              lastName: 'Joseph',
              recordLocator: 'SLNTCC',
              queryParams: null
            });
          });
        });
      });
    });
  });

  describe('day of travel contact method', () => {
    it('should navigate to contact method page when you click `Edit contact method` link', () => {
      const contactInformationMessage = {
        key: 'VERIFY_CONTACT_METHOD',
        header: null,
        body: 'Please verify that your day of travel contact method is correct so we can keep you updated on changes or cancellations.',
        linkText: 'Edit contact method',
        icon: 'NONE',
        textColor: 'DEFAULT'
      };
      const checkInConfirmationPage = {
        _links: {
          contactInformation: {
            href: '/v1/mobile-air-booking/page/view-reservation/contact-info/123ABC',
            method: 'GET',
            query: {
              'passenger-search-token':
                'ShL5ZTcquYJUP1k9tD_utMdlATJVun6HKSVa7UUxdPT1CfUytc4KQXjgW3M4a0OID9lLp_nGqB2ljpAsO4QjYmrjId8m36Ie5mNJi1q5gLD7OmjXH8GqaKJBXocvM7jq8onB986M34zVH6ZurQ=='
            }
          }
        }
      };

      const { container } = createComponent({ contactInformationMessage, checkInConfirmationPage, GDS_AOM: true });
      const editContactInfoLink = container.querySelector('.contact-info-messages--link a');

      fireEvent.click(editContactInfoLink);

      expect(pushMock).toHaveBeenCalledWith('/check-in/confirmation/123ABC/contact-method', null, null, {
        firstName: '',
        lastName: '',
        href: '/v1/mobile-air-booking/page/view-reservation/contact-info/123ABC',
        method: 'GET',
        query: {
          'passenger-search-token':
            'ShL5ZTcquYJUP1k9tD_utMdlATJVun6HKSVa7UUxdPT1CfUytc4KQXjgW3M4a0OID9lLp_nGqB2ljpAsO4QjYmrjId8m36Ie5mNJi1q5gLD7OmjXH8GqaKJBXocvM7jq8onB986M34zVH6ZurQ=='
        }
      });
    });
  });

  describe('check standard bags now button', () => {
    describe('when viewModifyCheckedBags has value', () => {
      const trackCheckedBags = {
        labelText: 'Track checked bags',
        url: 'mockUrl',
        query: {
          first_name: 'FIRSTNAME',
          last_name: 'LASTNAME',
          record_locator: 'ABC123'
        }
      };
      
      const viewModifyCheckedBags = {
        labelText: 'Check standard bags now',
        url: 'mockUrl'
      };

      describe('when viewReservationSearchRequest has undefined values', () => {
        it('should use default values for firstName, lastName, and recordLocator', () => {
          const viewReservationSearchRequest = {
            firstName: undefined,
            lastName: undefined,
            recordLocator: undefined
          };
          const { container } = createComponent(
            { viewModifyCheckedBags, viewReservationSearchRequest }
          );

          expect(container).toMatchSnapshot();
        });
      });

      describe('when viewReservationSearchRequest object is empty', () => {
        it('should pass createCheckInRequestObject function upgradedBoardingFormData object', () => {
          const viewReservationSearchRequest = {};
          const upgradedBoardingFormData = {
            firstName: 'UBFirst',
            lastName: 'UBLast',
            recordLocator: 'UBRecordLocator'
          };
          const { container } = createComponent(
            { upgradedBoardingFormData, viewModifyCheckedBags, viewReservationSearchRequest }
          );

          expect(container).toMatchSnapshot();
        });

        it('should default the viewReservationSearchRequest value to an empty object if the viewReservationSearchRequest value is not set', () => {
          const viewReservationSearchRequest = undefined;
          const upgradedBoardingFormData = {
            firstName: 'UBFirst',
            lastName: 'UBLast',
            recordLocator: 'UBRecordLocator'
          };
          const { container } = createComponent(
            { upgradedBoardingFormData, viewModifyCheckedBags, viewReservationSearchRequest }
          );

          expect(container).toMatchSnapshot();
        });
      });

      describe('when viewReservationSearchRequest object is not empty', () => {
        const upgradedBoardingFormData = {};
        const viewReservationSearchRequest = {
          firstName: 'VRFirst',
          lastName: 'VRLast',
          recordLocator: 'VRRecordLocator'
        };

        it('should pass createCheckInRequestObject function viewReservationSearchRequest object', () => {
          const { container } = createComponent(
            { upgradedBoardingFormData, viewModifyCheckedBags, viewReservationSearchRequest }
          );

          expect(container).toMatchSnapshot();
        });
        
        it('should use trackCheckedBags object when both trackCheckedBags and viewModifyCheckedBags are present', () => {
          const { container } = createComponent(
            { trackCheckedBags, upgradedBoardingFormData, viewModifyCheckedBags, viewReservationSearchRequest }
          );

          expect(container).toMatchSnapshot();
        });

        it('should use trackCheckedBags object when it is present', () => {
          const { container } = createComponent(
            { trackCheckedBags, upgradedBoardingFormData, viewReservationSearchRequest }
          );

          expect(container).toMatchSnapshot();
        });
      });

      describe('when viewReservationSearchRequest and upgradedBoardingFormData object is empty', () => {
        it('should pass createCheckInRequestObject function flights array', () => {
          const viewReservationSearchRequest = {};
          const upgradedBoardingFormData = {};
          const flights = [
            {
              passengers: [
                {
                  name: 'James Middle Bond',
                  confirmationNumber: 'abc1234S'
                }
              ]
            }
          ];
          const { container } = createComponent(
            {
              viewModifyCheckedBags,
              viewReservationSearchRequest,
              upgradedBoardingFormData,
              flights
            }
          );

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('when viewModifyCheckedBags is null', () => {
      it('should not render check standard bags now button', () => {
        const { container } = createComponent({ viewModifyCheckedBags: null });

        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('DynamicPlacement', () => {
    const flights = [
      {
        boundIndex: 0,
        departureTime: '07:35',
        flightNumber: '1',
        passengers: [
          {
            confirmationNumber: '123ABC',
            name: 'Fred Flintstone'
          }
        ]
      }
    ];

    it('should not render when viewUpgradedBoarding is null', () => {
      const { container } = createComponent(
        {
          flights,
          checkInConfirmationPagePlacements: null,
          viewUpgradedBoarding: null
        }
      );

      expect(container).toMatchSnapshot();
    });

    it('should not render when viewUpgradedBoarding is true and checkInConfirmationPagePlacements null', () => {
      const { container } = createComponent(
        {
          flights,
          checkInConfirmationPagePlacements: null,
          viewUpgradedBoarding: true
        }
      );

      expect(container).toMatchSnapshot();
    });

    it('should not render when viewUpgradedBoarding is false and checkInConfirmationPromoTop01 is null', () => {
      const { container } = createComponent(
        {
          flights,
          checkInConfirmationPagePlacements: { checkInConfirmationPromoTop01: null },
          viewUpgradedBoarding: null
        }
      );

      expect(container).toMatchSnapshot();
    });

    it('should not render when checkInConfirmationPromoTop01 is null in checkInConfirmationPagePlacements', () => {
      const { container } = createComponent(
        {
          flights,
          checkInConfirmationPagePlacements: { checkInConfirmationPromoTop01: null },
          viewUpgradedBoarding: true
        }
      );

      expect(container).toMatchSnapshot();
    });

    it('should render when checkInConfirmationPromoTop01 is available in checkInConfirmationPagePlacements', () => {
      const { container } = createComponent(
        { flights, checkInConfirmationPagePlacements: { checkInConfirmationPromoTop01: {} } }
      );

      expect(container).toMatchSnapshot();
    });

    it('should render when checkInConfirmationPromoTop01 is available in checkInConfirmationPagePlacements and with viewUpgradedBoarding as false', () => {
      const { container } = createComponent(
        {
          flights,
          checkInConfirmationPagePlacements: { checkInConfirmationPromoTop01: {} },
          viewUpgradedBoarding: false,
          viewPremiumProductUpgrade: false
        }
      );

      expect(container).toMatchSnapshot();
    });

    it('should render when checkInConfirmationPromoTop01 is available in checkInConfirmationPagePlacements and with viewUpgradedBoarding as true', () => {
      const { container } = createComponent(
        {
          flights,
          checkInConfirmationPagePlacements: { checkInConfirmationPromoTop01: {} },
          viewUpgradedBoarding: false,
          viewPremiumProductUpgrade: true
        }
      );

      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      checkInConfirmationPage: null,
      checkInConfirmationPagePlacements: { checkInConfirmationPromoTop01: null },
      contactInformationMessage: null,
      flights: [
        {
          boundIndex: 0,
          departureTime: '07:35',
          flightNumber: '1',
          passengers: [
            {
              confirmationNumber: '123ABC',
              name: 'Fred Flintstone'
            }
          ]
        }
      ],
      goDirectlyToBoardingPassesFn: goDirectlyToBoardingPassesFnMock,
      hasSeenNonSequentialMessage: false,
      hideDialogFn: hideDialogFnMock,
      messages: [],
      nonSequentialMessage: '',
      pageSubMessage: 'page submessage',
      push: pushMock,
      recordLocator: '123ABC',
      showDialogFn: showDialogFnMock,
      showShareLinkFn: showShareLinkFnMock,
      viewAllBoardingPassesLink: {
        body: {
          firstName: 'Michael',
          lastName: 'Joseph',
          travelerID: ['0000000000000001', '0000000000000002']
        },
        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
        labelText: null,
        method: 'POST',
        nonSequentialPositionsMessage: null
      },
      viewPremiumProductUpgrade: true,
      viewReservationSearchRequest: {
        body: {
          firstName: 'Bob',
          lastName: 'Jordan',
          recordLocator: '12345s'
        }
      },
      viewUpgradedBoarding: true
    };

    const updatedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={store}>
        <BoardingPositionsPage {...updatedProps} />
      </Provider>
    );
  };

  const clickDialogButton = async (buttonIndex) => {
    await showDialogFnMock.mock.calls[0][0].buttons[buttonIndex].onClick();
  };
});
