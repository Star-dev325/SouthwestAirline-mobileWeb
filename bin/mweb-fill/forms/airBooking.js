const sampleData = require('../data/sampleData');
const getRandomInt = require('./util').getRandomInt;
const getRandomItem = require('./util').getRandomItem;

module.exports = {
  'air/booking/passengers/\\d': [
    // eslint-disable-line no-useless-escape
    {
      selector: 'input[name=firstName]',
      value: getRandomItem(sampleData.firstName)
    },
    {
      selector: 'input[name=lastName]',
      value: getRandomItem(sampleData.lastName)
    },
    {
      selector: 'select[placeholder=Year]',
      event: 'change',
      value: function () {
        return /type=senior/g.test(window.location.search) ? getRandomInt(1900, 1950) : getRandomInt(1900, 2000);
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
        return getRandomInt(1, 28);
      }
    },
    {
      selector: function () {
        return `button.button--white:eq(${getRandomInt(0, 1)})`;
      },
      event: 'click'
    },
    {
      selector: 'select[name=contactMethod]',
      event: 'change',
      value: function () {
        return 'TEXT';
      }
    },
    {
      selector: 'input[placeholder="Phone number"]',
      value: '248-123-4567'
    },
    {
      selector: 'input[placeholder="Email address"]',
      value: 'aterris@example.com'
    }
  ],
  'air/booking/payment': [
    {
      selector: 'input[placeholder="Card Num."]',
      event: 'click',
      value: '4111111111111111'
    },
    {
      selector: 'input[name=nameOnCard]',
      value: 'Li Rui'
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
      selector: 'input[name=addressLine1]',
      value: function () {
        return `${getRandomInt(1, 1000)} Main St`;
      }
    },
    {
      selector: 'input[name=zipOrPostalCode]',
      value: function () {
        return getRandomInt(11111, 99999);
      }
    },
    {
      selector: 'input[name=city]',
      value: 'Brooklyn'
    },
    {
      selector: 'select[name=stateProvinceRegion]',
      event: 'change',
      value: 'NY'
    },
    {
      selector: 'input[name=phoneNumber]',
      value: '248-123-4567'
    }
  ]
};
