import sinonModule from 'sinon';
import { AirReaccomTripSummaryPage } from 'src/airChange/pages/airReaccomTripSummaryPage';
import ChangeShoppingPageReaccomResponseBuilder from 'test/builders/apiResponse/changeShoppingPageReaccomResponseBuilder';
import { submitForm, enterText } from 'test/unit/helpers/enzymeFormTestUtils';
import { createComponent } from 'test/unit/helpers/testUtils';

const sinon = sinonModule.sandbox.create();

describe('Air Reaccom Trip Summary page', () => {
  let changeReaccomFlightFnStub;

  beforeEach(() => {
    changeReaccomFlightFnStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = createComponentWrapper();
    });

    it('should render', () => {
      expect(wrapper.find('AirReaccomTripSummaryPage')).to.be.present();
    });

    it('should render a departing trip card with correct information', () => {
      expect(wrapper.find('ReservationFlightSummary')).to.be.present();
    });
    
    it('should render email receipt to before the Reaccom confirmation', () => {
      const tripSummaryPage = createComponentWrapper({
        reaccomShoppingPage: new ChangeShoppingPageReaccomResponseBuilder().withMandatoryEmail().build()
      });

      expect(tripSummaryPage.find('.form-fields--receipt-email')).to.be.present();
    });
  });

  context('click confirm change button', () => {
    it('should call the changeReaccomFlightFunction when button is clicked and one way trip', () => {
      const tripSummaryPage = createComponentWrapper();

      submitForm(tripSummaryPage);

      expect(changeReaccomFlightFnStub).to.have.been.calledWith({
        body: {
          shareDataToken: 'shareDataToken',
          reaccomProductIds: {
            outbound: 'outboundProductId'
          }
        },
        href: '/v1/mobile-air-booking/page/flights/reaccom/purchase',
        method: 'PUT'
      });
    });

    it('should call the changeReaccomFlightFunction when button is clicked with both bounds selected and roundtrip pnr', () => {
      const tripSummaryPage = createComponentWrapper({
        allSelectedProducts: {
          inbound: {
            fareProductId: 'inboundProductId',
            flightCardIndex: 2,
            flightProductType: 'NORMAL'
          },
          outbound: {
            fareProductId: 'outboundProductId',
            flightCardIndex: 1,
            flightProductType: 'NORMAL'
          }
        },
        reaccomShoppingPage: new ChangeShoppingPageReaccomResponseBuilder().withRoundTrip().build(),
        selectedBounds: {
          firstbound: true,
          secondbound: true
        }
      });

      submitForm(tripSummaryPage);

      expect(changeReaccomFlightFnStub).to.have.been.calledWith({
        body: {
          shareDataToken: 'shareDataToken',
          reaccomProductIds: {
            inbound: 'inboundProductId',
            outbound: 'outboundProductId'
          }
        },
        href: '/v1/mobile-air-booking/page/flights/reaccom/purchase',
        method: 'PUT'
      });
    });

    it('should call the changeReaccomFlightFunction when button is clicked with outbound selected and roundtrip pnr', () => {
      const tripSummaryPage = createComponentWrapper({
        allSelectedProducts: {
          outbound: {
            fareProductId: 'outboundProductId',
            flightCardIndex: 1,
            flightProductType: 'NORMAL'
          }
        },
        reaccomShoppingPage: new ChangeShoppingPageReaccomResponseBuilder().withRoundTrip().build(),
        selectedBounds: {
          firstbound: true,
          secondbound: false
        }
      });

      submitForm(tripSummaryPage);

      expect(changeReaccomFlightFnStub).to.have.been.calledWith({
        body: {
          shareDataToken: 'shareDataToken',
          reaccomProductIds: {
            outbound: 'outboundProductId'
          }
        },
        href: '/v1/mobile-air-booking/page/flights/reaccom/purchase',
        method: 'PUT'
      });
    });

    it('should call the changeReaccomFlightFunction when button is clicked with inbound selected and roundtrip pnr', () => {
      const tripSummaryPage = createComponentWrapper({
        allSelectedProducts: {
          inbound: {
            fareProductId: 'inboundProductId',
            flightCardIndex: 1,
            flightProductType: 'NORMAL'
          }
        },
        reaccomShoppingPage: new ChangeShoppingPageReaccomResponseBuilder().withRoundTrip().build(),
        selectedBounds: {
          firstbound: false,
          secondbound: true
        }
      });

      submitForm(tripSummaryPage);

      expect(changeReaccomFlightFnStub).to.have.been.calledWith({
        body: {
          shareDataToken: 'shareDataToken',
          reaccomProductIds: {
            inbound: 'inboundProductId'
          }
        },
        href: '/v1/mobile-air-booking/page/flights/reaccom/purchase',
        method: 'PUT'
      });
    });
  });

  it('should call the changeReaccomFlightFunction when button is clicked with email receipt', () => {
    const tripSummaryPage = createComponentWrapper({
      allSelectedProducts: {
        inbound: {
          fareProductId: 'inboundProductId',
          flightCardIndex: 1,
          flightProductType: 'NORMAL'
        }
      },
      reaccomShoppingPage: new ChangeShoppingPageReaccomResponseBuilder().withRoundTrip().withMandatoryEmail().build(),
      selectedBounds: {
        firstbound: false,
        secondbound: true
      }
    });
    const emailInput = tripSummaryPage.find('input');

    enterText(emailInput, 'test@test.com');

    submitForm(tripSummaryPage);

    expect(changeReaccomFlightFnStub).to.have.been.calledWith({
      body: {
        shareDataToken: 'shareDataToken',
        fulfillmentEmail: 'test@test.com',
        reaccomProductIds: {
          inbound: 'inboundProductId'
        }
      },
      href: '/v1/mobile-air-booking/page/flights/reaccom/purchase',
      method: 'PUT'
    });
  });

  const createComponentWrapper = (props = {}) => {
    const defaultProps = {
      reaccomShoppingPage: new ChangeShoppingPageReaccomResponseBuilder().build(),
      isLoggedIn: false,
      allSelectedProducts: {
        inbound: null,
        newProducts: {
          outbound: {
            arrivalAirport: {
              code: 'DAL',
              country: null,
              name: 'Dallas (Love Field)',
              state: 'TX'
            },
            arrivalTime: '07:00',
            boundType: 'DEPARTING',
            departureAirport: {
              code: 'AUS',
              country: null,
              name: 'Austin',
              state: 'TX'
            },
            departureDate: '2019-10-31',
            departureTime: '06:00',
            flights: [
              {
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                },
                number: '2140'
              }
            ],
            isNextDayArrival: false,
            passengerCount: '1 Passenger',
            stopDescription: 'Nonstop',
            stops: [],
            travelTime: '1h 0m'
          }
        },
        outbound: {
          flightCardIndex: 0,
          flightProductType: 'NORMAL',
          fareProductId: 'outboundProductId'
        }
      },
      changeReaccomFlightFn: changeReaccomFlightFnStub
    };

    return createComponent(AirReaccomTripSummaryPage, {
      props: { ...defaultProps, ...props }
    });
  };
});
