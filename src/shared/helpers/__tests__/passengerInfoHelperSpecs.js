import { expect } from 'chai';
import frequentTravelerList from 'mocks/templates/airReservation/frequentTravelersList';
import sinonModule from 'sinon';
import {
  filterPassengerInformationByPassengerType,
  findSelectedFrequentTravelersByPax,
  getAllSelectedFrequentTravelers,
  getIsLapChildInBooking,
  getPassengerInfoFormId,
  getPassengerInfos,
  getSelectedFrequentTravelerByPax,
  getSelectedFrequentTravelerDetails,
  shouldRemoveFrequentTravelerAtIndex,
  updateEmailReceiptTo,
  updatePassengerForm
} from 'src/shared/helpers/passengerInfoHelper';
import { getLapChildPassengerInfos } from 'test/builders/model/passengerInfosBuilder.js';

const sinon = sinonModule.sandbox.create();
const paxNumber = 0;
const accountInfo = {
  addFrequentTravelerDisclaimerText: null,
  allowAddFrequentTraveler: false,
  contactEmail: null,
  contactMethod: 'TEXT_ME',
  contactPhone: { countryCode: '1', number: '4693344559' },
  dateOfBirth: '1930-01-01',
  emailReceiptTo: 'test@test.com',
  firstName: 'Peanut',
  frequentTravelerId: 'ACCOUNT',
  frequentTravelerList: frequentTravelerList.frequentTravelerResponse,
  frequentTravelerToken: 'ACCOUNT',
  gender: 'M',
  knownTravelerNumber: '74847565',
  lastName: 'Dust',
  middleName: null,
  rapidRewardsNumber: '600650050',
  redressNumber: '22334',
  suffix: null
};
const passengerInfos = [
  {
    type: 'adult',
    passengerReference: 2,
    departureDate: '2021-12-18',
    passengerInfo: {
      firstName: 'Minnie',
      middleName: 'Jane',
      lastName: 'Haynes',
      suffix: null,
      dateOfBirth: '1947-04-10',
      gender: 'F',
      rapidRewardsNumber: '601116272',
      emailReceiptTo: 'minniehaynes4@test.com',
      redressNumber: null,
      knownTravelerNumber: null,
      frequentTravelerId: 'ACCOUNT',
      frequentTravelerList,
      allowAddFrequentTraveler: true,
      addFrequentTravelerDisclaimerText:
        'Passenger information is encrypted and only accessible by the Southwest app on this device.'
    }
  }
];
const passengerInfosWithTransformedDate = [
  {
    type: 'adult',
    passengerReference: 2,
    departureDate: '2021-12-18',
    passengerInfo: {
      firstName: 'Minnie',
      middleName: 'Jane',
      lastName: 'Haynes',
      suffix: null,
      dateOfBirth: '04/10/1947',
      gender: 'F',
      rapidRewardsNumber: '601116272',
      emailReceiptTo: 'minniehaynes4@test.com',
      redressNumber: null,
      knownTravelerNumber: null,
      frequentTravelerId: 'ACCOUNT',
      frequentTravelerList,
      allowAddFrequentTraveler: true,
      addFrequentTravelerDisclaimerText:
        'Passenger information is encrypted and only accessible by the Southwest app on this device.'
    }
  }
];
const selectedFrequentTravelers = [
  {
    addFrequentTravelerToggle: false,
    frequentTravelerId: 'ACCOUNT',
    frequentTravelerToken: 'ACCOUNT',
    paxNumber: 0
  },
  {
    addFrequentTravelerToggle: false,
    frequentTravelerId: 'ACCOUNT-1',
    frequentTravelerToken: 'ACCOUNT-1',
    paxNumber: 1
  }
];

describe('getPassengerInfoFormId', () => {
  it('should give passenger form id', () => {
    const result = getPassengerInfoFormId('ID', 'TYPE', 0);

    expect(result).to.equal('ID_TYPE_0');
  });
});

describe('getPassengerInfos', () => {
  it('should give passenger form info', () => {
    const result = getPassengerInfos(false, passengerInfos);

    expect(result).to.deep.equal(passengerInfos);
  });

  describe('when webview', () => {
    it('should transform date of birth', () => {
      const result = getPassengerInfos(true, passengerInfos);

      expect(result).to.deep.equal(passengerInfosWithTransformedDate);
    });
  });
});

describe('updatePassengerForm', () => {
  const updateFrequentTravelerSelectionFn = sinon.stub();

  it('should not update frequent traveler', () => {
    updatePassengerForm({
      paxNumber,
      selectedFrequentTraveler: selectedFrequentTravelers[0],
      accountInfo,
      updateFrequentTravelerSelectionFn
    });

    expect(updateFrequentTravelerSelectionFn).not.to.be.called;
  });

  it('should not update frequent traveler when user is on second passenger form', () => {
    updatePassengerForm({
      paxNumber: '1',
      selectedFrequentTraveler: null,
      accountInfo,
      updateFrequentTravelerSelectionFn
    });

    expect(updateFrequentTravelerSelectionFn).not.to.be.called;
  });

  it('should update frequent traveler', () => {
    updatePassengerForm({
      paxNumber,
      selectedFrequentTraveler: null,
      accountInfo,
      updateFrequentTravelerSelectionFn
    });

    expect(updateFrequentTravelerSelectionFn).to.be.called;
  });

  it('should return selected frequent traveler', () => {
    const result = getSelectedFrequentTravelerByPax(selectedFrequentTravelers, 0);

    expect(result).to.deep.equal(selectedFrequentTravelers[0]);
  });

  it('should not return selected frequent traveler', () => {
    const result = getSelectedFrequentTravelerByPax(selectedFrequentTravelers, 2);

    expect(result).to.be.undefined;
  });
});

describe('findSelectedFrequentTravelersByPax', () => {
  it('should filter the selected the frequent traveler', () => {
    const result = findSelectedFrequentTravelersByPax(selectedFrequentTravelers, passengerInfos);

    expect(result).to.be.deep.equal([
      {
        addFrequentTravelerToggle: false,
        frequentTravelerId: 'ACCOUNT',
        frequentTravelerToken: 'ACCOUNT',
        paxNumber: 0
      }
    ]);
  });
});

describe('shouldRemoveFrequentTravelerAtIndex', () => {
  it('should return true if selected frequent traveler found', () => {
    const result = shouldRemoveFrequentTravelerAtIndex(selectedFrequentTravelers, 0);

    expect(result).to.be.deep.equal(true);
  });

  it('should return false if selected frequent traveler is not found', () => {
    const result = shouldRemoveFrequentTravelerAtIndex(selectedFrequentTravelers, 5);

    expect(result).to.be.deep.equal(false);
  });
});

describe('getSelectedFrequentTravelerDetails', () => {
  it('should transform the dob for webview true', () => {
    const { frequentTravelerResponse } = frequentTravelerList;
    const result = getSelectedFrequentTravelerDetails(selectedFrequentTravelers[0], frequentTravelerResponse, true);

    expect(result).to.be.deep.equal({
      firstName: 'Minnie',
      middleName: 'Jane',
      lastName: 'Haynes',
      suffix: null,
      dateOfBirth: '04/10/2004',
      gender: 'F',
      rapidRewardsNumber: 'On File',
      redressNumber: null,
      knownTravelerNumber: null,
      frequentTravelerId: 'ACCOUNT'
    });
  });

  it('should not transform the dob for webview false', () => {
    const { frequentTravelerResponse } = frequentTravelerList;
    const result = getSelectedFrequentTravelerDetails(selectedFrequentTravelers[0], frequentTravelerResponse, false);

    expect(result).to.be.deep.equal({
      firstName: 'Minnie',
      middleName: 'Jane',
      lastName: 'Haynes',
      suffix: null,
      dateOfBirth: '2004-04-10',
      gender: 'F',
      rapidRewardsNumber: 'On File',
      redressNumber: null,
      knownTravelerNumber: null,
      frequentTravelerId: 'ACCOUNT'
    });
  });
});

describe('updateEmailReceiptTo', () => {
  it(`shouldn't update emailReceiptTo when frequentTraveler selected and logged in user is same`, () => {
    const mockAccountInfo = { emailReceiptTo: 'test@test.com', frequentTravelerId: '12345' };
    const selectedFrequentTraveler = { emailReceiptTo: 'test1@test.com', frequentTravelerId: '12345' };
    const result = updateEmailReceiptTo(true, mockAccountInfo, selectedFrequentTraveler);

    expect(result).to.deep.equal(mockAccountInfo);
  });

  it(`should clear emailReceiptTo when frequentTraveler selected and logged in user is not same`, () => {
    const mockAccountInfo = { emailReceiptTo: 'test@test.com', frequentTravelerId: '12345' };
    const selectedFrequentTraveler = { frequentTravelerId: '123456' };
    const result = updateEmailReceiptTo(true, mockAccountInfo, selectedFrequentTraveler);

    expect(result).to.deep.equal({ ...selectedFrequentTraveler, emailReceiptTo: '' });
  });
});

describe('getAllSelectedFrequentTravelers', () => {
  it('should return frequentTravelers having frequentTravelerId', () => {
    const { frequentTravelerResponse } = frequentTravelerList;

    const mockFrequentTraveler = [
      ...frequentTravelerResponse,
      { frequentTravelerId: '', frequentTravelerToken: '', addFrequentTravelerToggle: false }
    ];
    const result = getAllSelectedFrequentTravelers(mockFrequentTraveler);

    expect(result).to.be.deep.equal(frequentTravelerResponse);
  });
});

describe('getIsLapChildInBooking', () => {
  it('should return false when lap child is not in booking', () => {
    const result = getIsLapChildInBooking(passengerInfos, 'lapChild');

    expect(result).to.be.deep.equal(false);
  });

  it('should return true when lap child is in booking', () => {
    const passengerInfos = getLapChildPassengerInfos();
    const result = getIsLapChildInBooking(passengerInfos, 'lapChild');

    expect(result).to.be.deep.equal(true);
  });
});

describe('filterPassengerInformationByPassengerType', () => {
  it('should return array of passengers with type lapchild', () => {
    const passengerInfos = getLapChildPassengerInfos();
    const result = filterPassengerInformationByPassengerType(passengerInfos, 'lapChild');

    expect(result).to.deep.equal([
      {
        type: 'lapChild',
        departureDate: '2022-02-01',
        passengerInfo: {
          firstName: 'don',
          lastName: 'jon',
          gender: 'M',
          dateOfBirth: '2021-02-01',
          associatedAdult: '2'
        },
        passengerReference: 4
      }
    ]);
  });

  it('should return array of passengers with type adult', () => {
    const passengerInfos = getLapChildPassengerInfos();
    const result = filterPassengerInformationByPassengerType(passengerInfos, 'adult');

    expect(result).to.deep.equal([
      {
        type: 'adult',
        departureDate: '2015-02-01',
        passengerInfo: {
          firstName: 'test',
          lastName: 'wang',
          gender: 'M',
          dateOfBirth: '2015-02-01'
        },
        passengerReference: 2
      },
      {
        type: 'adult',
        departureDate: '2015-02-01',
        passengerInfo: {
          firstName: 'james',
          lastName: 'bond',
          gender: 'M',
          dateOfBirth: '2015-02-01'
        },
        passengerReference: 3
      }
    ]);
  });
});
