const _ = require('lodash');

class ReservationGroupsBuild {
  constructor() {
    this.reservationGroups = [
      {
        recordLocator: 'PNRFSN',
        passengerType: 'ADULT',
        passengers: [
          {
            secureFlightName: {
              firstName: 'Amber',
              lastName: 'Awesome',
              middleName: 'is',
              suffix: 'CEO'
            },
            accountNumber: '00000033333',
            knownTravelerId: '1234ABCD',
            birthDate: '1985-06-25',
            gender: 'F',
            passengerReference: '1'
          }
        ]
      }];
  }

  withRecordLocator(recordLocator) {
    _.set(this.reservationGroups, '0.recordLocator', recordLocator);

    return this;
  }

  mixPaxs() {
    this.reservationGroups = [
      {
        recordLocator: 'PNRFSN',
        passengerType: 'ADULT',
        passengers: [
          {
            secureFlightName: {
              firstName: 'Amber',
              lastName: 'Awesome',
              middleName: 'is',
              suffix: 'CEO'
            },
            accountNumber: '00000033333',
            knownTravelerId: '1234ABCD',
            birthDate: '1985-06-25',
            gender: 'F',
            passengerReference: '1'
          }
        ]
      }, {
        recordLocator: 'FRMTN2',
        passengerType: 'SENIOR',
        passengers: [
          {
            secureFlightName: {
              firstName: 'John',
              lastName: 'Smith',
              middleName: 'is',
              suffix: 'CEO'
            },
            birthDate: '1930-06-25',
            gender: 'F',
            passengerReference: '2'
          }
        ]
      }];

    return this;
  }

  multiPaxs() {
    this.reservationGroups[0].passengers.push({
      secureFlightName: {
        firstName: 'Bear',
        lastName: 'Claw'
      },
      knownTravelerId: '1234ABCD',
      birthDate: '1990-09-25',
      gender: 'F',
      passengerReference: '5'
    });

    return this;
  }

  withEarlyPurchasedFailed() {
    this.reservationGroups = _.map(this.reservationGroups, (reservationGroup) => _.merge({}, reservationGroup, {
      passengers: _.map(reservationGroup.passengers, passenger => {
        passenger.earlyBirdEligibilities = { status: 'ELIGIBLE', priceCents: null };

        return passenger;
      })
    }));

    return this;
  }

  withCheckedInPassenger(paxIndex, isCheckedIn = true) {
    this.reservationGroups[0].passengers[paxIndex].isCheckedIn = isCheckedIn;

    return this;
  }

  withCompletedPassengerInfo(paxIndex, hasCompletePassportInfo = true) {
    this.reservationGroups[0].passengers[paxIndex].hasCompletePassportInfo = hasCompletePassportInfo;

    return this;
  }

  withExtraSeat() {
    this.reservationGroups[0].passengers = [ {
      secureFlightName: {
        firstName: 'Amber',
        lastName: 'Awesome',
        middleName: '',
        suffix: ''
      },
      accountNumber: '00000033333',
      knownTravelerId: '1234ABCD',
      birthDate: '1985-06-25',
      gender: 'F',
      passengerReference: '1'
    }, {
      secureFlightName: {
        firstName: 'EXTRA SEAT',
        lastName: '',
        middleName: '',
        suffix: ''
      },
      isExtraSeat: true,
      passengerReference: '2'
    }];

    return this;
  }

  build() {
    return {
      reservationGroups: this.reservationGroups
    };
  }
}

module.exports = ReservationGroupsBuild;
