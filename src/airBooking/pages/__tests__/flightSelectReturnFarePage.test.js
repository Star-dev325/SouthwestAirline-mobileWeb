jest.mock('src/shared/components/fareProductList', () =>
  jest.fn((props) => (
    <button className="fare-product-list-select-button"
      onClick={() => props.onFareSelected(props.fares[0])}>
      Mock Product List
    </button>
  ))
);

import React from 'react';
import { mapStateToProps } from 'src/airBooking/pages/flightSelectReturnFarePage';
import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';
import { generateFlightShoppingPages } from 'src/airBooking/helpers/flightShoppingPageHelper';

const response = new ProductsBuilder().withSelectedData('2018-01-01').withProductDefinitions().build();
const productDefinitions = response.flightShoppingPage.productDefinitions;
const pages = generateFlightShoppingPages(response);
const card = pages[0].cards[0];

describe('Redux Store Properties inside component props', () => {
  let fareDetails, inbound, initialState, outbound;
  const selectedCompanyName = 'test company';

  beforeEach(() => {
    inbound = {
      sortByValue: 'departureTime',
      isLoggedIn: false,
      isReaccom: false,
      selectedBounds: {
        firstbound: true,
        secondbound: false
      },
      params: {
        paxType: 'adult',
        direction: 'inbound'
      },
      card
    };
    outbound = {
      ...inbound,
      params: {
        paxType: 'adult',
        direction: 'outbound'
      }
    };

    fareDetails = {
      href: '/mock-fare-details-href',
      labelText: 'Mock Fare Details Text'
    };

    initialState = {
      app: {
        airBooking: {
          flightShoppingPage: {
            response: {
              flightShoppingPage: {
                productDefinitions,
                _links: {
                  fareDetailsJson: fareDetails
                }
              }
            }
          },
          selectedFlight: {
            inbound,
            outbound,
            currentDirection: 'inbound'
          }
        },
        account: {
          corporateInfo: {
            selectedCompany: {
              companyName: selectedCompanyName
            }
          }
        }
      }
    };
  });

  it('should receive selected flight from mapStatetoProps as inbound state flight', () => {
    const expectedProps = {
      fareDetailsLink: fareDetails,
      productDefinitions,
      selectedCompanyName,
      tier: undefined,
      ...inbound
    };

    expect(mapStateToProps(initialState)).toEqual(expectedProps);
  });

  it('should have a value for tier if it exists in state', () => {
    const mockTierValue = 'mock tier value';
    const expectedProps = {
      fareDetailsLink: fareDetails,
      productDefinitions,
      selectedCompanyName,
      tier: mockTierValue,
      accountInfo: {
        customerInfo: {
          name: {
            userName: "Alex"
          }
        }
      },
      ...inbound
    };
    const stateWithTier = { ...initialState };

    stateWithTier.app.account.userInfo = {
      customers: {
        UserInformation: {
          tier: mockTierValue
        }
      }
    };

    stateWithTier.app.account.accountInfo = {
      customerInfo: {
        name: {
          userName: "Alex"
        }
      }
    };

    expect(mapStateToProps(stateWithTier)).toEqual(expectedProps);
  });
});
