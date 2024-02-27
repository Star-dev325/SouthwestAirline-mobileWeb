import _ from 'lodash';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';
import proxyquire from 'proxyquire';
import BoundDetailBuilder from 'test/builders/model/boundDetailBuilder';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('ConfirmationTripHeader', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createComponent();
  });

  it('should have date with correct format', () => {
    expect(wrapper.find('.trip-date-dest-city--trip-date')).to.contain.text('Dec 14 - 28');
  });

  it('should have destination airport name', () => {
    expect(wrapper.find('.trip-date-dest-city--destination-airport')).to.contain.text('Austin');
  });

  it('should render airport city name with state when domestic', () => {
    expect(wrapper.find('.airport-info--detail')).to.contain.text('Dallas (Love Field), TX');
  });

  it('should render airport city name with country when international', () => {
    wrapper = createComponent({ bounds: [new BoundDetailBuilder().withInternationalFlight().build()] });
    expect(wrapper.find('.airport-info--detail')).to.contain.text('Cancun, Mexico');
  });

  describe('null bounds', () => {
    it('should not render destination info when no destination description', () => {
      wrapper = createComponent({
        destinationDescription: null,
        bounds: null
      });

      expect(wrapper.find('.trip-airport-info')).to.not.exist;
    });

    it('should render ConfirmationPassengerPnrGroup when no bounds', () => {
      wrapper = createComponent({
        destinationDescription: null,
        bounds: null
      });

      expect(wrapper.find('ConfirmationPassengerPnrGroup')).to.exist;
      expect(wrapper.find('ConfirmationPassengerGroup')).to.not.exist;
    });

    it('should render ConfirmationPassengerPnrGroup with lapChildConfirmation when no bounds', () => {
      const pnrs = [
        {
          passengers: [
            {
              displayName: 'Hank the Cow Dog',
              name: 'Hank',
              firstName: 'Hank',
              lastName: 'CowDog',
              hasExtraSeat: true,
              hasAnyEarlyBird: true,
              lapInfant: {
                name: 'Adult One'
              }
            }
          ],
          recordLocator: 'LDJS4B',
          greyBoxMessage: {
            body: 'A birth certificate or other government-issued identification bearing the birth date of each Lap Child is required upon request. <a href="https://www.southwest.com/faq/age-verified" target="_blank">Learn More</a>',
            header: '',
            key: 'GREY_BOX_INFANT_ON_LAP_PURCHASE_CONFIRMATION'
          }
        }
      ];
      const wrapper = createComponent({ pnrs });

      expect(wrapper.find('.confirmation-trip-header')).toMatchSnapshot();
    });
  });

  it('should render one passenger and one record locator when there is one pnr with one passenger', () => {
    wrapper = createComponent({
      pnrs: [
        {
          passengers: [
            {
              displayName: 'Andrew Terris',
              accountNumber: '123123123'
            }
          ],
          recordLocator: 'ABC123'
        }
      ]
    });

    expect(wrapper.find('ConfirmationPassengerGroup').at(0)).to.contain.text('Andrew Terris');
    expect(wrapper.find('ConfirmationPassengerGroup').at(0)).to.contain.text('123123123');
    expect(wrapper.find('ConfirmationNumber').at(0)).to.contain.text('ABC123');
  });

  it('should render one passenger when there is one pnr with extra seat passenger', () => {
    wrapper = createComponent({
      pnrs: [
        {
          passengers: [
            {
              displayName: 'Andrew Terris',
              accountNumber: '123123123'
            },
            {
              displayName: 'Extra Seat',
              accountNumber: null
            }
          ],
          recordLocator: 'ABC123'
        }
      ]
    });

    expect(wrapper.find('ConfirmationPassengerGroup').at(0)).to.contain.text('Andrew Terris');
    expect(wrapper.find('ConfirmationPassengerGroup').at(0)).to.contain.text('123123123');
    expect(wrapper.find('ConfirmationPassengerGroup').at(0)).to.contain.text('Extra Seat');
    expect(wrapper.find('ConfirmationNumber').at(0)).to.contain.text('ABC123');
  });

  it('should render special assistance message if a passenger selected needs', () => {
    wrapper = createComponent({
      pnrs: [
        {
          passengers: [
            {
              displayName: 'Bob Barker',
              accountNumber: '987654321',
              specialAssistanceMessage: {
                body: 'Special Assistance Fake Message',
                icon: '',
                key: ''
              }
            }
          ],
          recordLocator: 'ABC123'
        }
      ]
    });

    expect(wrapper.find('ConfirmationPassengerGroup').at(0)).to.contain.text('Bob Barker');
    expect(wrapper.find('ConfirmationPassengerGroup').at(0)).to.contain.text('987654321');
    expect(wrapper.find('ConfirmationPassengerGroup').at(0)).to.contain.text('Special Assistance Fake Message');
  });

  it('should only render Special Assistance message for the passenger that selected any needs', () => {
    wrapper = createComponent({
      pnrs: [
        {
          passengers: [
            {
              displayName: 'Andrew Terris',
              accountNumber: '123123123'
            },
            {
              displayName: 'Fisher King',
              accountNumber: '123123124',
              specialAssistanceMessage: {
                body: 'Special Assistance Fake Message',
                icon: '',
                key: ''
              }
            },
            {
              displayName: 'Elder King'
            }
          ],
          recordLocator: 'LDJS4B'
        }
      ]
    });

    expect(wrapper.find('.passenger-pnr-group').at(0)).to.contain.text('Andrew Terris');
    expect(wrapper.find('.passenger-pnr-group').at(1)).to.contain.text('Fisher King');
    expect(wrapper.find('.passenger-pnr-group').at(2)).to.contain.text('Elder King');
    expect(wrapper.find('.passenger-pnr-group').at(0)).to.contain.text('123123123');
    expect(wrapper.find('.passenger-pnr-group').at(1)).to.contain.text('123123124');
    expect(wrapper.find('.passenger-pnr-group').at(2)).to.not.contain.text('123123124');
    expect(wrapper.find('.passenger-pnr-group').at(0)).to.not.contain.text('Special Assistance Fake Message');
    expect(wrapper.find('.passenger-pnr-group').at(1)).to.contain.text('Special Assistance Fake Message');
    expect(wrapper.find('.passenger-pnr-group').at(2)).to.not.contain.text('Special Assistance Fake Message');
  });

  it('should display add early bird button when shouldShowAddEarlyBirdButton is true', () => {
    wrapper = createComponent({
      _links: {
        earlyBird: {
          href: '/v1/mobile-air-booking/page/view-early-bird/ABC123',
          method: 'POST',
          body: {
            passengerSearchToken: 'abc123456'
          }
        }
      },
      shouldShowAddEarlyBirdButton: true,
      confirmationNumber: 'ABC123'
    });

    expect(wrapper.find('.confirmation--early-bird-button')).to.exist;
  });

  const createComponent = (props = {}) => {
    const newProps = _.merge(
      {
        dates: {
          first: '2017-12-14',
          second: '2017-12-28'
        },
        destinationDescription: 'Austin',
        pnrs: [
          {
            passengers: [
              {
                displayName: 'Andrew Terris',
                accountNumber: '123123123'
              }
            ],
            recordLocator: 'LDJS4B'
          }
        ],
        bounds: [new BoundDetailBuilder().build()]
      },
      props
    );

    const withFeatureTogglesStub = (Component) => Component;
    const withReservationDetailTransition = proxyquire('src/shared/enhancers/withReservationDetailTransition', {
      'src/shared/enhancers/withFeatureToggles': { default: withFeatureTogglesStub }
    }).default;

    const ConfirmationTripHeaderComponent = proxyquire('src/shared/components/confirmationTripHeader', {
      'src/shared/enhancers/withReservationDetailTransition': { default: withReservationDetailTransition }
    }).default;

    const store = configureMockStore()({
      app: {
        errorHeader: {
          hasError: false,
          errorMessage: null
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    });

    return mount(
      <MemoryRouter>
        <Provider store={store}>
          <ConfirmationTripHeaderComponent {...newProps} />
        </Provider>
      </MemoryRouter>
    );
  };
});
