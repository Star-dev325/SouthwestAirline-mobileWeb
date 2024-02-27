import { fireEvent } from '@testing-library/react';
import dayjs from 'dayjs';
import * as MockCarVendorsCommon from 'mocks/wcm/wcm/content/generated/data/car_vendors_common.json';
import configureMockStore from "redux-mock-store";
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import { CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT } from 'src/carBooking/constants/carBookingConstants';
import * as CarCancelActions from 'src/carCancel/actions/carCancelActions';
import * as ReservationApi from 'src/shared/api/reservationApi';
import * as ReservationApiTransformer from 'src/shared/api/transformers/reservationApiTransformer';
import { isEmpty } from 'src/shared/helpers/jsUtils';
import * as ReservationDetailsTransformer from 'src/viewReservation/transformers/reservationDetailsTransformer';
import * as ViewReservationActions from 'src/viewReservation/actions/viewReservationActions';
import { ViewCarReservationDetailsPage } from 'src/viewReservation/pages/viewCarReservationDetailsPage';
import { transformRetrieveCarReservationApiResponse } from 'src/viewReservation/transformers/reservationDetailsTransformer';
import CarReservationBuilder from 'test/builders/apiResponse/carReservationBuilder';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('ViewCarReservationDetailsPage', () => {
  const canceledCarReservationResponse = new CarReservationBuilder().withCancelled(true).build();
  const defaultCarReservationFromApi = new CarReservationBuilder().build();

  let cancelCarReservationAndTransitionToConfirmationPageMock;
  let cancelCarReservationAndTransitionToConfirmationPageWithSearchTokenMock;
  let hideDialogFnMock;
  let prepareCarCrossSellAndTransitionToCarBookingMock;
  let pushMock;
  let retrieveCarReservationWithSearchTokenMock;
  let setFlowStatusMock;
  let showDialogFnMock;
  let viewCarReservationDetailsPage;

  beforeEach(() => {
    jest.spyOn(ReservationApi, 'retrieveCarReservation');
    prepareCarCrossSellAndTransitionToCarBookingMock = jest.spyOn(
      CarBookingActions,
      'prepareCarCrossSellAndTransitionToCarBooking'
    );
    pushMock = jest.fn();
    cancelCarReservationAndTransitionToConfirmationPageMock = jest.spyOn(
      CarCancelActions,
      'cancelCarReservationAndTransitionToConfirmationPage'
    );
    cancelCarReservationAndTransitionToConfirmationPageWithSearchTokenMock = jest.spyOn(
      CarCancelActions,
      'retrieveAndCancelCarReservationWithSearchToken'
    );
    retrieveCarReservationWithSearchTokenMock = jest.spyOn(
      ViewReservationActions,
      'retrieveCarReservationWithSearchToken'
    );
    setFlowStatusMock = jest.fn();
    showDialogFnMock = jest.fn();
    hideDialogFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('CarReservationCard', () => {
    it('should mount with defaultProps with searchToken', () => {
      jest.spyOn(ReservationDetailsTransformer, 'transformRetrieveCarReservationApiResponse').mockReturnValueOnce({});
      jest.spyOn(ReservationApiTransformer, 'transformToRetrieveCarReservationResponse').mockReturnValueOnce({});

      createComponent({ query: { searchToken: 'ae!dwerfsgfj12jdsljf' } }, {});

      expect(retrieveCarReservationWithSearchTokenMock).toHaveBeenCalledWith('ae!dwerfsgfj12jdsljf');
    });

    describe('for an already cancelled reservation', () => {
      it('should render correctly', () => {
        const { container } = createComponent({}, canceledCarReservationResponse);

        expect(container).toMatchSnapshot();
      });
    });

    describe('for any single reservation', () => {
      describe('manage component', () => {
        describe('bottom links popup', () => {
          it('should contains two links', () => {
            const { container } = createComponent({}, defaultCarReservationFromApi);

            expect(container).toMatchSnapshot();
          });

          it('should show cancel car reservation when click manage button', () => {
            const { container } = createComponent({}, defaultCarReservationFromApi);

            const manageButton = container.querySelector('button[data-qa="manageCarReservationButton"]');

            fireEvent.click(manageButton);

            expect(container).toMatchSnapshot();
          });

          describe('Add another car button', () => {
            it('should call saveSelectedRecentSearchRequest action when user presses Add another car button', () => {
              const { container } = createComponent({}, defaultCarReservationFromApi);

              const manageButton = container.querySelector('button[data-qa="manageCarReservationButton"]');

              fireEvent.click(manageButton);

              const addCarBottomLink = container.querySelector('[data-qa="add-another-car"]');

              fireEvent.click(addCarBottomLink);

              expect(prepareCarCrossSellAndTransitionToCarBookingMock).toHaveBeenCalledWith({
                dropOff: 'DAL',
                dropOffDate: dayjs().add(4, 'day').format('YYYY-MM-DD'),
                dropOffTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
                pickUp: 'DAL',
                pickUpDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
                pickUpTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
                isRoundTrip: true
              });
            });
          });

          describe('Cancel car reservation', () => {
            const carReservationExpected = {
              carReservationDetail: {
                baseRate: {
                  amount: '219.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                carType: 'Mid-size',
                dailyRate: {
                  perQuantity: '3 Days',
                  price: {
                    amount: '73.00',
                    currencyCode: 'USD',
                    currencySymbol: '$'
                  }
                },
                dailyRateWithCurrencyCode: {
                  amount: '73.00',
                  currencyCode: 'USD'
                },
                mileage: {
                  cents: 0,
                  freeMileage: 'Unlimited',
                  per: ''
                },
                promoCodeApplied: false,
                rentalDeskLocation: 'Rental Counter is at the terminal. Shuttle is provided to pick up your car.',
                selectedCarExtras: [],
                showTotalPrice: true,
                taxesWithCurrencyCode: [
                  {
                    taxWithCurrencyCode: {
                      amount: '0.10',
                      currencyCode: 'USD'
                    },
                    type: 'Tax'
                  },
                  {
                    taxWithCurrencyCode: {
                      amount: '0.10',
                      currencyCode: 'USD'
                    },
                    type: 'AIRPORT CONCESSION RECOVERY:'
                  }
                ],
                totalPrice: {
                  amount: '277.09',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                totalWithCurrencyCode: {
                  amount: '219.00',
                  currencyCode: 'USD'
                },
                totalWithTaxesAndCurrencyCode: {
                  amount: '277.09',
                  currencyCode: 'USD'
                },
                vendorImage: '/content/mkt/images/car_vendors/Avis_Logo_results.png'
              },
              carReservationItinerary: {
                dropOffAirport: {
                  airportCode: 'DAL',
                  airportName: 'Dallas (Love Field)',
                  cityName: 'Dallas (Love Field)',
                  cityState: 'TX'
                },
                dropOffDate: 'Tuesday, Sep 19, 2017',
                dropOffTime: '2017-09-19T11:30',
                pickUpAirport: {
                  airportCode: 'DAL',
                  airportName: 'Dallas (Love Field)',
                  cityName: 'Dallas (Love Field)',
                  cityState: 'TX'
                },
                pickUpDate: 'Saturday, Sep 16, 2017',
                pickUpTime: '2017-09-16T11:30',
                vendorImage: '/content/mkt/images/car_vendors/Avis_Logo_results.png'
              },
              manageCarReservationDetails: {
                confirmationNumber: '08172185US0',
                driver: {
                  firstName: 'Cannon',
                  lastName: 'Biggs'
                },
                isCancelled: false
              }
            };

            it('should call cancelCarReservationAndTransitionToConfirmationPageMock when searchToken is present', async () => {
              const { container } = createComponent({ query: { searchToken: 'ae!dwerfsgfj12jdsljf' } }, defaultCarReservationFromApi);

              const manageButton = container.querySelector('button[data-qa="manageCarReservationButton"]');

              fireEvent.click(manageButton);

              fireEvent.click(container.querySelector('[data-qa="cancel-car-reservation"]'));

              await clickDialogButton(1);
              
              expect(cancelCarReservationAndTransitionToConfirmationPageMock).toHaveBeenCalledWith(carReservationExpected, 'ae!dwerfsgfj12jdsljf');
            });

            it('should call cancelCarReservationAndTransitionToConfirmationPageMock when searchToken is not present', async () => {
              const { container } = createComponent({}, defaultCarReservationFromApi);
              
              const manageButton = container.querySelector('button[data-qa="manageCarReservationButton"]');

              fireEvent.click(manageButton);

              fireEvent.click(container.querySelector('[data-qa="cancel-car-reservation"]'));

              await clickDialogButton(1);

              expect(cancelCarReservationAndTransitionToConfirmationPageMock).toHaveBeenCalledWith(carReservationExpected, undefined);
            });
          });
        });
      });

      describe('when there are extras', () => {
        it('should render correctly', () => {
          const carReservationResponseWithExtras = new CarReservationBuilder()
            .withExtras(['Toddler Seat (20 to 40 lbs.)'])
            .build();

          viewCarReservationDetailsPage = createComponent({}, carReservationResponseWithExtras);

          expect(viewCarReservationDetailsPage).toMatchSnapshot();
        });
      });
    });
  });

  const createComponent = (props = {}, carReservationFromApi = defaultCarReservationFromApi) => {
    const vendorImages = MockCarVendorsCommon.car_vendors;
    const carLocations = [
      {
        airport: {
          airportName: 'Dallas (Love Field), TX - DAL',
          code: 'DAL'
        },
        city: 'Dallas (Love Field)',
        state: 'TX'
      }
    ];

    const transformedCarReservation = transformRetrieveCarReservationApiResponse(
      ReservationApiTransformer.transformToRetrieveCarReservationResponse(carReservationFromApi),
      vendorImages,
      carLocations
    );

    transformedCarReservation.carReservationDetail = {
      ...transformedCarReservation.carReservationDetail,
      dailyRateWithCurrencyCode: {
        amount: '73.00',
        currencyCode: 'USD'
      },
      totalWithCurrencyCode: {
        amount: '219.00',
        currencyCode: 'USD'
      },
      totalWithTaxesAndCurrencyCode: {
        amount: '277.09',
        currencyCode: 'USD'
      },
      taxesWithCurrencyCode: [
        {
          taxWithCurrencyCode: {
            amount: '0.10',
            currencyCode: 'USD'
          },
          type: 'Tax'
        },
        {
          taxWithCurrencyCode: {
            amount: '0.10',
            currencyCode: 'USD'
          },
          type: 'AIRPORT CONCESSION RECOVERY:'
        }
      ]
    };

    const state = configureMockStore()({
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

    const defaultProps = {
      cancelCarReservationAndTransitionToConfirmationPageFn: cancelCarReservationAndTransitionToConfirmationPageMock,
      cancelCarReservationAndTransitionToConfirmationPageWithSearchTokenFn: cancelCarReservationAndTransitionToConfirmationPageWithSearchTokenMock,
      carReservation: isEmpty(carReservationFromApi) ? carReservationFromApi : transformedCarReservation,
      hideDialogFn: hideDialogFnMock,
      prepareCarCrossSellAndTransitionToCarBookingFn: prepareCarCrossSellAndTransitionToCarBookingMock,
      push: pushMock,
      retrieveCarReservationWithSearchTokenFn: retrieveCarReservationWithSearchTokenMock,
      setFlowStatusFn: setFlowStatusMock,
      showDialogFn: showDialogFnMock
    };

    const mergedProps = { ...defaultProps, ...props };

    return integrationRender()(state, ViewCarReservationDetailsPage, mergedProps);
  };

  const clickDialogButton = async (buttonIndex) => {
    await showDialogFnMock.mock.calls[0][0].verticalLinks.links[buttonIndex].onClick();
  };
});
