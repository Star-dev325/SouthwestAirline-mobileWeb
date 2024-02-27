import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { DayOfTravelContactMethodPage } from 'src/shared/pages/dayOfTravelContactMethodPage';
import configureMockStore from 'test/unit/helpers/configureMockStore';

describe('day of travel contact method page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the day of travel contact method form', () => {
    const component = createComponent();

    expect(component).toMatchSnapshot();
  });

  it('should call retrieveDayOfTravelContactInformationFnStub with correct params when component initialized', () => {
    const retrieveDayOfTravelContactInformationFn = jest.fn();

    createComponent({ retrieveDayOfTravelContactInformationFn });

    expect(retrieveDayOfTravelContactInformationFn).toHaveBeenCalledWith({
      href: '/v1/mobile-air-booking/page/view-reservation/contact-info/M74H4J',
      method: 'GET',
      query: {
        'passenger-search-token':
          'ShL5ZTcquYJUP1k9tD_utMdlATJVun6HKSVa7UUxdPT1CfUytc4KQXjgW3M4a0OID9lLp_nGqB2ljpAsO4QjYmrjId8m36Ie5mNJi1q5gLD7OmjXH8GqaKJBXocvM7jq8onB986M34zVH6ZurQ=='
      }
    });
  });

  it('should call updateDayOfTravelContactInformationFnStub with correct params when form submitted', () => {
    const updateDayOfTravelContactInformationFn = jest.fn();
    const component = createComponent({ updateDayOfTravelContactInformationFn });

    const button = component.getByText('SHARED__BUTTON_TEXT__DONE');

    fireEvent.click(button);

    expect(updateDayOfTravelContactInformationFn).toHaveBeenCalledWith({
      body: {
        contactInformation: {
          contactEmail: { email: 'DIANA.MARTINEZ@WNCO.COM' },
          contactInfoToken: 'eyJwbnIiOnsiY29uZmlybWF0a',
          contactPhone: null,
          contactTextMessagePhone: null,
          internationalDeclineNotifications: undefined,
          passengerSearchToken:
            '3HKiWDSeCp0wYUgJQoCR7DMftbspgp9Y5Mw3Qen7OJZJ7F2_R_MTOHcVNHoKJiIZbNbI52u60eq5qey7tdC88G0WK4QmdlM1HePoKbN72mpTD7b-EJpvaiV6o_P6H-vwA7U0gwxp5PrW8dtQ'
        }
      },
      href: '/v1/mobile-air-booking/page/view-reservation/contact-info',
      method: 'POST'
    });
  });

  it('should call updateDayOfTravelContactInfoAndNavigateFn with correct params and searchToken when form submitted', () => {
    const updateDayOfTravelContactInfoAndNavigateFn = jest.fn();
    const customBackNavigationFn = jest.fn();
    const component = createComponent({ customBackNavigationFn, updateDayOfTravelContactInfoAndNavigateFn, query: { searchToken: 'atae!31sdfadf' } });

    const button = component.getByText('SHARED__BUTTON_TEXT__DONE');

    fireEvent.click(button);

    expect(updateDayOfTravelContactInfoAndNavigateFn).toHaveBeenCalledWith({
      body: {
        contactInformation: {
          contactEmail: { email: 'DIANA.MARTINEZ@WNCO.COM' },
          contactInfoToken: 'eyJwbnIiOnsiY29uZmlybWF0a',
          contactPhone: null,
          contactTextMessagePhone: null,
          internationalDeclineNotifications: undefined,
          passengerSearchToken:
            '3HKiWDSeCp0wYUgJQoCR7DMftbspgp9Y5Mw3Qen7OJZJ7F2_R_MTOHcVNHoKJiIZbNbI52u60eq5qey7tdC88G0WK4QmdlM1HePoKbN72mpTD7b-EJpvaiV6o_P6H-vwA7U0gwxp5PrW8dtQ'
        }
      },
      href: '/v1/mobile-air-booking/page/view-reservation/contact-info',
      method: 'POST'
    }, 'atae!31sdfadf');
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      dayOfTravelContactInfo: {
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
      },
      goBack: jest.fn(),
      location: {
        state: {
          href: '/v1/mobile-air-booking/page/view-reservation/contact-info/M74H4J',
          method: 'GET',
          query: {
            'passenger-search-token':
              'ShL5ZTcquYJUP1k9tD_utMdlATJVun6HKSVa7UUxdPT1CfUytc4KQXjgW3M4a0OID9lLp_nGqB2ljpAsO4QjYmrjId8m36Ie5mNJi1q5gLD7OmjXH8GqaKJBXocvM7jq8onB986M34zVH6ZurQ=='
          }
        }
      },
      retrieveDayOfTravelContactInformationFn: jest.fn(),
      updateDayOfTravelContactInformationFn: jest.fn(),
      updateDayOfTravelContactInfoAndNavigateFn: jest.fn()
    };

    const newProps = {
      ...defaultProps,
      ...props
    };

    const store = configureMockStore()({
      app: {
        errorHeader: {
          errorMessage: null,
          hasError: false
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    });

    return render(
      <Provider store={store}>
        <DayOfTravelContactMethodPage {...newProps} />
      </Provider>
    );
  };
});
