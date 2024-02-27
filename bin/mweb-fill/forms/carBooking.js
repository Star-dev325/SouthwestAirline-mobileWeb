const getRandomInt = require('./util').getRandomInt;
const getRandomItem = require('./util').getRandomItem;
const sampleData = require('../data/sampleData');

module.exports = {
  'car/booking/purchase': [
    {
      selector: 'input[name=firstName]',
      value: getRandomItem(sampleData.firstName)
    },
    {
      selector: 'input[name=lastName]',
      value: getRandomItem(sampleData.lastName)
    },
    {
      selector: 'input[placeholder="Card number"]',
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
      selector: 'input[placeholder="Phone number"]',
      value: '682-260-1111'
    },
    {
      selector: 'input[name=confirmationEmail]',
      value: 'aterris@example.com'
    }
  ]
};
