const getRandomInt = require('./util').getRandomInt;

module.exports = {
  'air/change/pricing/payment': [
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
      selector: 'input[name=phoneNumber]',
      value: '248-123-4567'
    }
  ]
};
