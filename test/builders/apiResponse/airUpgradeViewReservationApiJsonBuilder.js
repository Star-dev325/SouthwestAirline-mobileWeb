import _ from 'lodash';

const defaultApiResponse = {
  viewUpgradeReservationPage: {
    promoCodeMessage: null,
    recordLocator: '4L9D73',
    upgradeToFareFamily: null,
    dates: {
      first: '2021-12-29',
      second: '2022-01-05'
    },
    originationDestinationDescription: 'Dallas (Love Field), TX to Houston (Hobby), TX',
    destinationDescription: 'Houston',
    boundSelectionMessage:
      'Please choose from the flights below to upgrade all passengers on that flight to Wanna Get Away Plus',
    fareRulesMessageWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    upgradeBounds: [
      {
        boundType: 'DEPARTING',
        flight: '539/1467',
        departureDate: '2021-12-29',
        departureDayOfWeek: 'Wednesday',
        departureTime: '09:10',
        departureAirportCode: 'DAL',
        arrivalTime: '15:40',
        arrivalAirportCode: 'HOU',
        numberOfPassengers: 2,
        upgradeFare: {
          upgradePrice: {
            amount: '30.11',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          upgradeTotalPrice: {
            amount: '60.22',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          upgradeMessage: {
            key: 'UPGRADE_TO_PREMIUM_PRODUCT_ALL_PAX',
            header: 'Upgrade all passengers to Business Select®',
            body: 'and earn 6,937 more points',
            icon: null,
            textColor: 'DEFAULT'
          },
          _meta: {
            productId: 'mockId1',
            canUpgrade: true
          }
        },
        isNextDayArrival: false,
        isOvernight: false
      },
      {
        boundType: 'RETURNING',
        flight: '694/696',
        departureDate: '2022-01-05',
        departureDayOfWeek: 'Wednesday',
        departureTime: '09:05',
        departureAirportCode: 'HOU',
        arrivalTime: '13:30',
        arrivalAirportCode: 'DAL',
        numberOfPassengers: 2,
        upgradeFare: {
          upgradePrice: {
            amount: '30.09',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          upgradeTotalPrice: {
            amount: '60.22',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          upgradeMessage: {
            key: 'UPGRADE_TO_PREMIUM_PRODUCT_ALL_PAX',
            header: 'Upgrade all passengers to Business Select®',
            body: 'and earn 6,937 more points',
            icon: null,
            textColor: 'DEFAULT'
          },
          _meta: {
            productId: 'mockId2',
            canUpgrade: true
          }
        },
        isNextDayArrival: false,
        isOvernight: false
      }
    ],
    _links: {
      changePricingPage: {
        href: '/v1/mobile-air-booking/page/flights/change/pricing-breakdown',
        method: 'POST',
        body: {
          changeRequests: [
            {
              productId: null,
              boundReference: 'mock bound reference 1'
            },
            {
              productId: null,
              boundReference: 'mock bound reference 2'
            }
          ]
        }
      }
    },
    mktg_data: {
      page_name: 'air-upgrade-select',
      page_channel: 'UPGRADE',
      page_subchannel: 'AIR',
      formstart: '1',
      formname: 'upgrade'
    },
    checkedInNotice: {
      title: ''
    }
  }
};

const defaultState = {
  viewUpgradeReservationPage: {
    promoCodeMessage: null,
    recordLocator: '4L9D73',
    upgradeToFareFamily: null,
    dates: {
      first: '2021-12-29',
      second: '2022-01-05'
    },
    _links: {
      changePricingPage: {
        href: '/v1/mobile-air-booking/page/flights/change/pricing-breakdown',
        method: 'POST',
        body: {
          changeRequests: [
            {
              productId: null,
              boundReference: 'mock bound reference 1'
            },
            {
              productId: null,
              boundReference: 'mock bound reference 2'
            }
          ]
        }
      }
    },
    originationDestinationDescription: 'Dallas (Love Field), TX to Houston (Hobby), TX',
    destinationDescription: 'Houston',
    boundSelectionMessage:
      'Please choose from the flights below to upgrade all passengers on that flight to Wanna Get Away Plus',
    fareRulesMessageWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    boundSelectionDataList: [
      {
        arrivalAirportCode: 'HOU',
        arrivalTime: '15:40',
        boundType: 'DEPARTING',
        departureAirportCode: 'DAL',
        departureDate: '2021-12-29',
        departureDayOfWeek: 'Wednesday',
        departureTime: '09:10',
        productId: 'mockId1',
        upgradeMessageBody: 'and earn 6,937 more points',
        upgradeMessageHeader: 'Upgrade all passengers to Business Select®',
        canUpgrade: true,
        isNextDayArrival: false,
        isOvernight: false
      },
      {
        boundType: 'RETURNING',
        departureDate: '2022-01-05',
        departureDayOfWeek: 'Wednesday',
        departureTime: '09:05',
        departureAirportCode: 'HOU',
        arrivalTime: '13:30',
        arrivalAirportCode: 'DAL',
        productId: 'mockId2',
        upgradeMessageBody: 'and earn 6,937 more points',
        upgradeMessageHeader: 'Upgrade all passengers to Business Select®',
        canUpgrade: true,
        isNextDayArrival: false,
        isOvernight: false
      }
    ],
    pricingDataList: [
      {
        arrivalAirportCode: 'HOU',
        canUpgrade: true,
        boundType: 'DEPARTING',
        departureAirportCode: 'DAL',
        flight: '539/1467',
        isSelected: false,
        numberOfPassengers: 2,
        productId: 'mockId1',
        upgradePrice: {
          amount: '30.11',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        upgradeTotalPrice: {
          amount: '60.22',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      {
        arrivalAirportCode: 'DAL',
        canUpgrade: true,
        boundType: 'RETURNING',
        isSelected: false,
        departureAirportCode: 'HOU',
        flight: '694/696',
        numberOfPassengers: 2,
        productId: 'mockId2',
        upgradePrice: {
          amount: '30.09',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        upgradeTotalPrice: {
          amount: '60.22',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      }
    ],
    checkedInNotice: {
      title: ''
    }
  }
};

const setBoundPriceToPoints = (upgradeBound) => {
  const { upgradePrice, upgradeTotalPrice } = upgradeBound;

  upgradeBound.upgradeMessageBody = null;
  upgradeBound.upgradePrice = {
    amount: `${parseInt(upgradePrice.amount)}`,
    currencyCode: 'PTS',
    currencySymbol: ''
  };

  upgradeBound.upgradeTotalPrice = {
    amount: `${parseInt(upgradeTotalPrice.amount)}`,
    currencyCode: 'PTS',
    currencySymbol: ''
  };

  return upgradeBound;
};

const setBoundToIneligible = (upgradeBound) => {
  upgradeBound.canUpgrade = false;
  upgradeBound.upgradeMessageHeader = "This flight doesn't have any upgrade options";

  return upgradeBound;
};

class AirUpgradeViewReservationApiJsonBuilder {
  constructor() {
    this.response = _.cloneDeep(defaultState);
    this.apiResponse = _.cloneDeep(defaultApiResponse);
  }

  withPromoCodeMessage() {
    this.response.viewUpgradeReservationPage.promoCodeMessage = {
      key: 'string',
      icon: 'success',
      body: null,
      textColor: 'string',
      header: 'Prices reflect previously applied promo code'
    };

    return this;
  }
  withTripType(triptype) {
    this.response.viewUpgradeReservationPage.mktg_data = {
      triptype
    };

    return this;
  }

  withPointsBooking() {
    const { pricingDataList } = this.response.viewUpgradeReservationPage;
    const pointsUpgradeBounds = pricingDataList.map(setBoundPriceToPoints);

    this.response.viewUpgradeReservationPage.pricingDataList = pointsUpgradeBounds;

    return this;
  }

  withAllBoundsIneligibleForUpgrade() {
    const { boundSelectionDataList } = this.response.viewUpgradeReservationPage;
    const ineligibleUpgradeBounds = boundSelectionDataList.map(setBoundToIneligible);

    this.response.viewUpgradeReservationPage.boundSelectionDataList = ineligibleUpgradeBounds;
    this.response.viewUpgradeReservationPage.pricingDataList = [];

    return this;
  }

  withOneBoundIneligibleForUpgrade() {
    const [upgradeBound, ...otherBounds] = this.response.viewUpgradeReservationPage.boundSelectionDataList;
    const pricingDataList = this.response.viewUpgradeReservationPage.pricingDataList.filter(
      (pricingData) => pricingData.productId !== upgradeBound.productId
    );

    this.response.viewUpgradeReservationPage.boundSelectionDataList = [
      setBoundToIneligible(upgradeBound),
      ...otherBounds
    ];
    this.response.viewUpgradeReservationPage.pricingDataList = pricingDataList;

    return this;
  }

  withFirstBoundSelected() {
    const pricingDataList = this.response.viewUpgradeReservationPage.pricingDataList.map((pricingData, index) =>
      (index === 0 ? { ...pricingData, isSelected: true } : pricingData)
    );

    this.response.viewUpgradeReservationPage.pricingDataList = pricingDataList;

    return this;
  }

  withReturningBoundSelected() {
    const pricingDataList = this.response.viewUpgradeReservationPage.pricingDataList.map((pricingData, index) =>
      (index === 1 ? { ...pricingData, isSelected: true } : pricingData)
    );

    this.response.viewUpgradeReservationPage.pricingDataList = pricingDataList;

    return this;
  }

  withPointsBothBoundsNotSelected() {
    const pricingDataList = this.response.viewUpgradeReservationPage.pricingDataList.map((pricingData) => ({
      ...pricingData,
      isSelected: false
    }));

    this.response.viewUpgradeReservationPage.pricingDataList = pricingDataList;

    return this;
  }

  withMktg_data() {
    this.response.viewUpgradeReservationPage.mktg_data = {
      page_name: 'air-upgrade-select',
      page_channel: 'UPGRADE',
      page_subchannel: 'AIR',
      formstart: '1',
      formname: 'upgrade'
    };

    return this;
  }

  withBothBoundsSelected() {
    const pricingDataList = this.response.viewUpgradeReservationPage.pricingDataList.map((pricingData) => ({
      ...pricingData,
      isSelected: true
    }));

    this.response.viewUpgradeReservationPage.pricingDataList = pricingDataList;

    return this;
  }

  withFirstBoundSelectedAndNoLinks() {
    const pricingDataList = this.response.viewUpgradeReservationPage.pricingDataList.map((pricingData, index) =>
      (index === 0 ? { ...pricingData, isSelected: true } : pricingData)
    );

    this.response.viewUpgradeReservationPage.pricingDataList = pricingDataList;
    this.response.viewUpgradeReservationPage._links = undefined;

    return this;
  }

  withOvernight() {
    this.apiResponse.viewUpgradeReservationPage.upgradeBounds[0].isOvernight = true;
    this.response.viewUpgradeReservationPage.boundSelectionDataList[0] = {
      arrivalAirportCode: 'OMA',
      arrivalTime: '08:30',
      boundType: 'DEPARTING',
      canUpgrade: true,
      departureAirportCode: 'SEA',
      departureDate: '2023-05-16',
      departureDayOfWeek: 'Tuesday',
      departureTime: '21:15',
      isOvernight: true,
      isNextDayArrival: true,
      productId:
        'eyJwcm9kdWN0SWQiOiJCVVN8QkxBMFc4UixCLFNFQSxERU4sMjAyMy0wNS0xNlQyMToxNS0wNzowMCwyMDIzLTA1LTE3VDAwOjQ1LTA2OjAwLFdOLFdOLDEzODQsN004fEJMQTBXOFIsQixERU4sT01BLDIwMjMtMDUtMTdUMDY6MDUtMDY6MDAsMjAyMy0wNS0xN1QwODozMC0wNTowMCxXTixXTiwyMjMzLDczVyIsInF1b3RlZFByaWNlIjoiMTMwLjAwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwiaXNVcHNlbGxQcm9kdWN0Ijp0cnVlLCJ1cHNlbGwiOnsicHJvZHVjdElkIjoiQlVTfEJMQTBXOFIsQixTRUEsREVOLDIwMjMtMDUtMTZUMjE6MTUtMDc6MDAsMjAyMy0wNS0xN1QwMDo0NS0wNjowMCxXTixXTiwxMzg0LDdNOHxCTEEwVzhSLEIsREVOLE9NQSwyMDIzLTA1LTE3VDA2OjA1LTA2OjAwLDIwMjMtMDUtMTdUMDg6MzAtMDU6MDAsV04sV04sMjIzMyw3M1ciLCJxdW90ZWRQcmljZSI6IjEzMC4wMCIsImZhcmVUeXBlIjoiQlVTIn19',
      upgradeMessageBody: 'and earn 4,887 more points',
      upgradeMessageHeader: 'Upgrade all passengers to Business Select'
    };

    return this;
  }

  withNextDay() {
    this.apiResponse.viewUpgradeReservationPage.upgradeBounds[0].isNextDayArrival = true;
    this.response.viewUpgradeReservationPage.boundSelectionDataList[0] = {
      arrivalAirportCode: 'AUS',
      arrivalTime: '00:35',
      boundType: 'DEPARTING',
      canUpgrade: true,
      departureAirportCode: 'ATL',
      departureDate: '2023-05-17',
      departureDayOfWeek: 'Wednesday',
      departureTime: '20:05',
      isOvernight: false,
      isNextDayArrival: true,
      productId:
        'eyJwcm9kdWN0SWQiOiJCVVN8QkxBMFA4UixCLEFUTCxNRFcsMjAyMy0wNS0xN1QyMDowNS0wNDowMCwyMDIzLTA1LTE3VDIwOjU1LTA1OjAwLFdOLFdOLDI4OTEsNzNXfEJMQTBQOFIsQixNRFcsQVVTLDIwMjMtMDUtMTdUMjE6NTUtMDU6MDAsMjAyMy0wNS0xOFQwMDozNS0wNTowMCxXTixXTiwyNTUxLDczVyIsInF1b3RlZFByaWNlIjoiMTMwLjAwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwiaXNVcHNlbGxQcm9kdWN0Ijp0cnVlLCJ1cHNlbGwiOnsicHJvZHVjdElkIjoiQlVTfEJMQTBQOFIsQixBVEwsTURXLDIwMjMtMDUtMTdUMjA6MDUtMDQ6MDAsMjAyMy0wNS0xN1QyMDo1NS0wNTowMCxXTixXTiwyODkxLDczV3xCTEEwUDhSLEIsTURXLEFVUywyMDIzLTA1LTE3VDIxOjU1LTA1OjAwLDIwMjMtMDUtMThUMDA6MzUtMDU6MDAsV04sV04sMjU1MSw3M1ciLCJxdW90ZWRQcmljZSI6IjEzMC4wMCIsImZhcmVUeXBlIjoiQlVTIn19',
      upgradeMessageBody: 'and earn 4,419 more points',
      upgradeMessageHeader: 'Upgrade all passengers to Business Select'
    };

    return this;
  }

  build() {
    return this.response;
  }
}

export default AirUpgradeViewReservationApiJsonBuilder;
