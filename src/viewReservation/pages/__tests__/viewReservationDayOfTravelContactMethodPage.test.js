jest.mock('src/shared/helpers/browserObject', () => ({
  ...jest.requireActual,
  location: { pathname: '/air/manage-reservation/contact-information.html' }
}));

jest.mock('src/viewReservation/actions/viewReservationActions', () => ({
  retrieveDayOfTravelContactInformationFn: jest.fn().mockReturnValue({ type: 'FAKE_TYPE' }),
  updateDayOfTravelContactInformationFn: jest.fn().mockReturnValue({ type: 'FAKE_TYPE' }),
  updateDayOfTravelContactInfoAndNavigateFn: jest.fn().mockReturnValue({ type: 'FAKE_TYPE' })
}));
jest.mock('src/shared/enhancers/withConnectedReactRouter', () => jest.fn((comp) => comp));

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ViewReservationDayOfTravelContactMethodPage from 'src/viewReservation/pages/viewReservationDayOfTravelContactMethodPage';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';

describe('viewReservationDayOfTravelContactMethodPage', () => {
  let goBackStub;
  let pushStub;
  let retrieveDayOfTravelContactInformationWithSearchTokenFnStub;

  beforeEach(() => {
    goBackStub = jest.fn();
    pushStub = jest.fn();
    retrieveDayOfTravelContactInformationWithSearchTokenFnStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should render DayOfTravelContactMethodPage component', async() => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should call retrieveDayOfTravelContactInformationWithSearchTokenFn on mount with a searchToken', () => {
      const searchToken = 'ShL5ZTcquYJUP1k9tD_utMdlATJVun6HKSVa7UUxd';

      createComponent({ query: { searchToken } }, {
        app: {
          viewReservation: {
            flightReservation: null
          }
        }
      });

      expect(retrieveDayOfTravelContactInformationWithSearchTokenFnStub).toHaveBeenCalledWith(searchToken);
    });

    it('should navigate back using replace when searchToken is present with isInternalNav = false', () => {
      const searchToken = 'ShL5ZTcquYJUP1k9tD_utMdlATJVun6HKSVa7UUxd';
      const component = createComponent({ query: { searchToken }, location: { state: { isInternalNav: false } } });

      fireEvent.click(component.getByText('SHARED__BUTTON_TEXT__CANCEL'));
      expect(pushStub).toHaveBeenCalledWith('/air/manage-reservation/view.html?searchToken=ShL5ZTcquYJUP1k9tD_utMdlATJVun6HKSVa7UUxd');
    });

    it('should navigate back using goBack when searchToken is not present', () => {
      const component = createComponent();

      fireEvent.click(component.getByText('SHARED__BUTTON_TEXT__CANCEL'));
      expect(goBackStub).toHaveBeenCalled();
    });

    it('should trigger updateContactInfoAndNavigateFn when form submitted', () => {
      const searchToken = 'sampleSearchToken';
      const updateDayOfTravelContactInfoAndNavigateFn = jest.fn();
      const component = createComponent({ query: { searchToken }, updateDayOfTravelContactInfoAndNavigateFn });
      const button = component.getByText('SHARED__BUTTON_TEXT__DONE');

      fireEvent.click(button);
      expect(updateDayOfTravelContactInfoAndNavigateFn).toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      goBack: goBackStub,
      location: {
        state: {
          href: '/v1/mobile-air-booking/page/view-reservation/contact-info/M74H4J',
          method: 'GET',
          query: {
            'passenger-search-token':
              'ShL5ZTcquYJUP1k9tD_utMdlATJVun6HKSVa7UUxdPT1CfUytc4KQXjgW3M4a0OID9lLp_nGqB2ljpAsO4QjYmrjId8m36Ie5mNJi1q5gLD7OmjXH8GqaKJBXocvM7jq8onB986M34zVH6ZurQ=='
          },
          isInternalNav: true
        }
      },
      push: pushStub,
      retrieveDayOfTravelContactInformationFn: jest.fn(),
      retrieveDayOfTravelContactInformationWithSearchTokenFn: retrieveDayOfTravelContactInformationWithSearchTokenFnStub,
      updateContactInfoAndNavigateFn: jest.fn(),
      viewReservationViewPage: new ViewReservationBuilder().build()
    };

    const defaultState = {
      app: {
        errorHeader: {
          errorMessage: null,
          hasError: false
        },
        viewReservation: {
          flightReservation: new ViewReservationBuilder().build(),
          dayOfTravelContactInfo: {
            reservationContactInformation: {
              contactEmail: {
                email: 'DIANA.MARTINEZ@WNCO.COM',
                preferredLanguage: 'EN'
              },
              contactInformationAnalytics: {
                gdsTicketType: null,
                isInternational: false,
                isSwabiz: false,
                recordLocator: 'P9XQVN'
              },
              contactPhone: null,
              contactTextMessagePhone: null,
              internationalDeclineNotifications: false,
              isInternational: false,
              messages: [
                {
                  body: 'A Reservation may only contain one contact method. By providing your contact information you are granting Southwest Airlines permission to send operational information on your flights.',
                  header: null,
                  icon: 'NONE',
                  key: 'UPDATE_CONTACT_METHOD_MESSAGE',
                  textColor: 'DEFAULT'
                }
              ],
              primaryContactMethod: 'EMAIL',
              _links: {
                contactInformation: {
                  body: {
                    passengerSearchToken:
                      '3HKiWDSeCp0wYUgJQoCR7DMftbspgp9Y5Mw3Qen7OJZJ7F2_R_MTOHcVNHoKJiIZbNbI52u60eq5qey7tdC88G0WK4QmdlM1HePoKbN72mpTD7b-EJpvaiV6o_P6H-vwA7U0gwxp5PrW8dtQ',
                    contactInfoToken: 'eyJwbnIiOnsiY29uZmlybWF0a'
                  },
                  href: '/v1/mobile-air-booking/page/view-reservation/contact-info',
                  method: 'POST'
                }
              }
            }
          }
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    };

    const pageProps = { ...defaultProps, ...props };
    const stateObj = { ...defaultState, ...state };

    return render(
      <Provider store={configureMockStore()(stateObj)}>
        <ViewReservationDayOfTravelContactMethodPage {...pageProps} />
      </Provider>
    );
  };
});
