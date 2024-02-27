'use strict';

const _ = require('lodash');

class CheckInRetrieveBoardingPassBuilder {
  constructor() {
    this.checkInRetrieveBoardingPassPage = {
      mobileBoardingPassViewPage: {
        messages: [],
        mobileBoardingPassView: [
          {
            adaptiveLink: 'https://reach-api.urbanairship.com/v1/pass/adaptive/TLYImiVN8Q%3F...',
            airportLanesText: 'No',
            barcodeString: 'M1WHEE%2FLEE++++++++++++EO4XCTX+DALMCIWN...',
            boardingGroup: 'A',
            boardingPassSSRs: 'INFT',
            boardingPosition: '16',
            boardingTime: '07:00',
            boardingTimeString: '7:00 AM',
            confirmationNumber: 'ABC123',
            departureDate: '2018-07-13',
            departureGate: '14',
            departureTime: '07:30',
            departureTimeString: '7:30 AM (was 6:30 AM)',
            destinationAirportCode: 'BOS',
            destinationAirportDescription: 'Boston Logan',
            documentType: 'BOARDING_PASS',
            drinkCouponText: 'DrinkCouponText',
            earlyBirdText:
              'A-group boarding may not be applied if fare was purchased within 24 hours of departure time',
            eligibleForDrinkCoupon: true,
            fareType: 'Business Select',
            flightNumber: '341',
            hasAList: true,
            hasExtraSeat: true,
            hasTsaPreCheck: true,
            isInfant: false,
            isYoungTraveler: false,
            numberOfDrinkCouponsHeader: null,
            numberOfDrinkCouponsText: null,
            originAirportCode: 'DAL',
            originAirportDescription: 'Dallas (Love Field)',
            passenger: {
              name: {
                lastName: 'Last',
                firstName: 'First',
                middleName: 'Middle'
              },
              rrTier: 'ALIST',
              tier: 'A_LIST',
              accountNumber: '0004443333',
              travelerId: 'travelerId-01'
            },
            priorityBoardingText: 'Yes',
            style: this.getStyleObject('ADULT'),
            travelerSegmentIdentifier: 'pax-01-segmentId-01'
          }
        ]
      },
      mobileBoardingPassInfo: null
    };
  }

  withMultipleBoardingPasses(passengerName) {
    this.checkInRetrieveBoardingPassPage = _.merge({}, this.checkInRetrieveBoardingPassPage, {
      mobileBoardingPassViewPage: {
        mobileBoardingPassView: [
          {
            passenger: {
              name: _.merge(
                {
                  lastName: 'Last',
                  firstName: 'First',
                  middleName: 'Middle'
                },
                passengerName
              ),
              rrTier: 'ALIST',
              tier: 'A_LIST',
              accountNumber: '0004443333',
              travelerId: 'travelerId-01'
            },

            flightNumber: '341',
            travelerSegmentIdentifier: 'travelerSegmentIdentifier-01-01',
            documentType: 'BOARDING_PASS',
            originAirportCode: 'DAL',
            originAirportDescription: 'Dallas (Love Field)',
            destinationAirportCode: 'BOS',
            destinationAirportDescription: 'Boston (Boston Logan)',
            departureDate: '2018-07-13',
            departureTime: '07:30',

            confirmationNumber: 'ABC123',
            boardingGroup: 'A',
            boardingPosition: '16',
            fareType: 'Business Select',
            departureGate: '14',
            boardingTime: '07:00',

            hasTsaPreCheck: true,
            hasExtraSeat: true,
            eligibleForDrinkCoupon: true,
            drinkCouponText: 'DrinkCouponText',
            isInfant: false,
            isYoungTraveler: false,

            barcodeString: 'M1WHEE%2FLEE++++++++++++EO4XCTX+DALMCIWN...',
            adaptiveLink: 'https://reach-api.urbanairship.com/v1/pass/adaptive/TLYImiVN8Q%3F...',
            boardingPassSSRs: 'INFT',
            style: this.getStyleObject('ADULT')
          },
          {
            passenger: {
              name: _.merge(
                {
                  lastName: 'Last',
                  firstName: 'First',
                  middleName: 'Middle'
                },
                passengerName
              ),
              rrTier: 'ALIST',
              tier: 'A_LIST',
              accountNumber: '0004443333',
              travelerId: 'travelerId-02'
            },

            flightNumber: '341',
            travelerSegmentIdentifier: 'travelerSegmentIdentifier-02-01',
            documentType: 'BOARDING_PASS',
            originAirportCode: 'BOS',
            originAirportDescription: 'Boston, (Boston Logan)',
            destinationAirportCode: 'NY',
            destinationAirportDescription: 'New York, NY',
            departureDate: '2018-07-13',
            departureTime: '07:30',

            confirmationNumber: 'ABC123',
            boardingGroup: 'A',
            boardingPosition: '17',
            fareType: 'Business Select',
            departureGate: '14',
            boardingTime: '07:00',

            hasTsaPreCheck: true,
            hasExtraSeat: true,
            eligibleForDrinkCoupon: true,
            drinkCouponText: 'DrinkCouponText',
            isInfant: false,
            isYoungTraveler: false,

            barcodeString: 'bobby',
            adaptiveLink: 'https://reach-api.urbanairship.com/v1/pass/adaptive/TLYImiVN8Q%3F...',
            boardingPassSSRs: 'INFT',
            style: this.getStyleObject('ADULT')
          }
        ]
      }
    });

    return this;
  }

  setDrinkCoupon(eligibleForDrinkCoupon = true, drinkCouponText = 'Yes', index = 0) {
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[
      index
    ].eligibleForDrinkCoupon = eligibleForDrinkCoupon;
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].drinkCouponText =
      drinkCouponText;

    return this;
  }

  setDrinkCouponHeaderInfo(numberOfDrinkCouponsHeader = '', numberOfDrinkCouponText = '', index = 0) {
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[
      index
    ].numberOfDrinkCouponsHeader = numberOfDrinkCouponsHeader;
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[
      index
    ].numberOfDrinkCouponsText = numberOfDrinkCouponText;

    return this;
  }

  setBoardingReservationAssets() {
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0].hasAListPreferred = true;
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0].showAirportLanes = true;
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0].hasTsaPreCheck = false;
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0].hasAList = false;

    return this;
  }

  withSecurityDocument(index = 0) {
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].style =
      this.getStyleObject('SECURITY DOCUMENT');
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].documentType =
      'SECURITY_DOCUMENT';

    return this;
  }

  withLapInfantSecurityDocument(index = 0) {
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].associatedPaxLabel =
      'ASSOCIATED ADULT';
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].associatedPaxName =
      'Jim Bond';
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].familyBoardingText =
      'Eligible';
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].documentType =
      'SECURITY_DOCUMENT';
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].isInfant = true;
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].priorityBoardingText =
      null;
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].style =
      this.getStyleObject('LAP INFANT SECURITY DOCUMENT');

    return this;
  }

  withLapInfant(index = 0) {
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].associatedPaxLabel =
      'ASSOCIATED ADULT';
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].associatedPaxName =
      'Jim Bond';
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].familyBoardingText =
      'Eligible';
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].isInfant = true;
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].priorityBoardingText =
      null;
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].style =
      this.getStyleObject('LAP INFANT');

    return this;
  }

  adultWithLapInfant(index = 0) {
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].associatedPaxLabel =
      'LAP CHILD';
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].associatedPaxName =
      'Baby Bond';
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].familyBoardingText =
      'Eligible';
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].isInfant = false;
    this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[index].priorityBoardingText =
      null;

    return this;
  }

  withMessages() {
    this.checkInRetrieveBoardingPassPage = _.merge({}, this.checkInRetrieveBoardingPassPage, {
      mobileBoardingPassViewPage: {
        ...this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage,
        messages: [
          {
            key: 'string',
            icon: 'string',
            textColor: 'string',
            header: 'string',
            body: 'string',
            note: 'string'
          }
        ]
      }
    });

    return this;
  }

  withBothBoundsCheckedIn() {
    this.checkInRetrieveBoardingPassPage = _.merge({}, this.checkInRetrieveBoardingPassPage, {
      mobileBoardingPassViewPage: {
        ...this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage,
        messages: [
          {
            key: 'string',
            icon: 'string',
            textColor: 'string',
            header: 'string',
            body: 'string',
            note: 'string',
            code: '207308211'
          }
        ]
      }
    });

    return this;
  }

  withMobileBoardingPass(boardingPass = {}) {
    this.checkInRetrieveBoardingPassPage = _.merge({}, this.checkInRetrieveBoardingPassPage, {
      mobileBoardingPassViewPage: {
        ...this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage,
        mobileBoardingPassView: [this.getMobileBoardingPassIssuance(boardingPass)]
      }
    });

    return this;
  }

  withAdditionalMobileBoardingPass(boardingPass = {}) {
    this.checkInRetrieveBoardingPassPage = _.merge({}, this.checkInRetrieveBoardingPassPage, {
      mobileBoardingPassViewPage: {
        ...this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage,
        mobileBoardingPassView: [
          ...this.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView,
          this.getMobileBoardingPassIssuance(boardingPass)
        ]
      }
    });

    return this;
  }

  getMobileBoardingPassIssuance(boardingPass = {}) {
    return _.merge(
      {
        passenger: {
          name: {
            lastName: 'Last',
            firstName: 'First',
            middleName: 'Middle'
          },
          rrTier: 'ALIST',
          tier: 'A_LIST',
          accountNumber: '0004443333'
        },

        flightNumber: '341',
        originAirportCode: 'DAL',
        originAirportDescription: 'Dallas (Love Field)',
        destinationAirportCode: 'BOS',
        destinationAirportDescription: 'Boston (Boston Logan)',
        departureDate: '2018-07-13',
        departureTime: '07:30',

        confirmationNumber: 'ABC123',
        boardingGroup: 'A',
        boardingPosition: '16',
        fareType: 'Business Select',
        departureGate: '14',
        boardingTime: '07:00',

        hasTsaPreCheck: true,
        hasExtraSeat: true,
        eligibleForDrinkCoupon: true,
        isInfant: false,
        style: this.getStyleObject('ADULT'),
        isYoungTraveler: false,

        barcodeString: 'M1WHEE%2FLEE++++++++++++EO4XCTX+DALMCIWN...',
        adaptiveLink: 'https://reach-api.urbanairship.com/v1/pass/adaptive/TLYImiVN8Q%3F...',
        boardingPassSSRs: 'INFT'
      },
      boardingPass
    );
  }

  getStyleObject(boardingPassType) {
    switch (boardingPassType) {
      case 'ADULT':
      default:
        return {
          bottomLabels: 'secondary-light-blue',
          bottomValues: 'neutral-white',
          gradientEnd: 'primary-dark-blue',
          gradientStart: 'primary-blue',
          topLabels: 'neutral-white',
          topValues: 'primary-yellow'
        };

      case 'LAP INFANT':
        return {
          bottomLabels: 'secondary-gray',
          bottomValues: 'neutral-black',
          gradientEnd: 'neutral-gray1',
          gradientStart: 'neutral-gray1',
          topLabels: 'secondary-gray',
          topValues: 'primary-dark-blue'
        };

      case 'LAP INFANT SECURITY DOCUMENT':
        return {
          bottomLabels: 'secondary-gray',
          bottomValues: 'neutral-black',
          headerLabel: 'primary-dark-blue',
          headerText: 'primary-dark-blue',
          gradientEnd: 'neutral-gray1',
          gradientStart: 'neutral-gray1',
          topLabels: 'secondary-gray',
          topValues: 'primary-dark-blue'
        };

      case 'SECURITY DOCUMENT':
        return {
          bottomLabels: 'secondary-light-blue',
          bottomValues: 'neutral-white',
          headerLabel: 'primary-yellow',
          headerText: 'neutral-white',
          gradientEnd: 'primary-dark-blue',
          gradientStart: 'primary-dark-blue',
          topLabels: 'neutral-white',
          topValues: 'primary-yellow'
        };
    }
  }

  build() {
    return {
      checkInRetrieveBoardingPassPage: this.checkInRetrieveBoardingPassPage
    };
  }
}

module.exports = CheckInRetrieveBoardingPassBuilder;
