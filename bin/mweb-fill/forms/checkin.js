const sampleData = require('../data/sampleData');
const getRandomInt = require('./util').getRandomInt;
const getRandomItem = require('./util').getRandomItem;

module.exports = {
  'check-in/\\d/passportPage': [
    {
      // eslint-disable-line no-useless-escape
      selector: 'input[placeholder="Passport Number"]',
      value: getRandomItem(sampleData.passportNumber)
    },
    {
      selector: 'select[placeholder=Year]',
      event: 'change',
      value: function () {
        return getRandomInt(2020, 2036);
      }
    },
    {
      selector: 'select[placeholder=Month]',
      event: 'change',
      value: function () {
        return getRandomInt(1, 12);
      }
    },
    {
      selector: 'select[placeholder=Day]',
      event: 'change',
      value: function () {
        return getRandomInt(1, 31);
      }
    },
    {
      selector: 'input[name="emergencyContactName"]',
      value: `${getRandomItem(sampleData.firstName)} ${getRandomItem(sampleData.lastName)}`
    },
    {
      selector: 'input[name="emergencyContactPhoneNumber"]',
      value: `${getRandomInt(0, 999)}-${getRandomInt(0, 999)}-${getRandomInt(0, 9999)}`
    }
  ],
  'check-in/\\d/additional-passport-info/visa': [
    {
      selector: 'input[name="visaNumber"]',
      value: getRandomItem(sampleData.passportNumber)
    },
    {
      selector: 'select[placeholder=Year]',
      event: 'change',
      value: function () {
        return getRandomInt(2020, 2036);
      }
    },
    {
      selector: 'select[placeholder=Month]',
      event: 'change',
      value: function () {
        return getRandomInt(1, 12);
      }
    },
    {
      selector: 'select[placeholder=Day]',
      event: 'change',
      value: function () {
        return getRandomInt(1, 31);
      }
    }
  ],
  'check-in/\\d/additional-passport-info/green-card': [
    {
      selector: 'select[class="form-select-placeholder-field--select"]',
      event: 'change',
      value: function () {
        return 'PERMANENT_RESIDENT_CARD';
      }
    },
    {
      selector: 'input[name="number"]',
      value: getRandomItem(sampleData.passportNumber)
    },
    {
      selector: 'select[placeholder=Year]',
      event: 'change',
      value: function () {
        return getRandomInt(2020, 2036);
      }
    },
    {
      selector: 'select[placeholder=Month]',
      event: 'change',
      value: function () {
        return getRandomInt(1, 12);
      }
    },
    {
      selector: 'select[placeholder=Day]',
      event: 'change',
      value: function () {
        return getRandomInt(1, 31);
      }
    }
  ],
  'check-in/\\d/additional-passport-info/destination': [
    {
      selector: 'input[name=addressLine]',
      value: function () {
        return `${getRandomInt(1, 1e3)}MainSt.`;
      }
    },
    {
      selector: 'input[name=city]',
      value: function () {
        return 'Dallas';
      }
    },
    {
      selector: 'input[name=stateProvinceRegion]',
      value: function () {
        return 'Texas';
      }
    },
    {
      selector: 'input[name=zipOrPostalCode]',
      value: function () {
        return 'postalcode';
      }
    }
  ]
};
