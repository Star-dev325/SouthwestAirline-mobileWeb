const getRandomInt = require('./util').getRandomInt;
const getRandomItem = require('./util').getRandomItem;
const sampleData = require('../data/sampleData');

module.exports = {
  'enroll$': [
    // eslint-disable-line no-useless-escape, quote-props
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
        return getRandomInt(1900, 2000);
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
    }
  ],

  'enroll/contact-info': [
    {
      selector: 'input[name=addressLine1]',
      value: function () {
        return `${getRandomInt(1, 1000)} Main St.`;
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
    },
    {
      selector: 'input[name=email]',
      value: 'aterris@example.com'
    },
    {
      selector: 'input[name=confirmedEmail]',
      value: 'aterris@example.com'
    }
  ],

  'enroll/security-info': [
    {
      selector: 'input[name=userName]',
      value: function () {
        return `test${getRandomInt(1, 99999)}`;
      }
    },
    {
      selector: 'input[name=password]',
      value: 'Test1234'
    },
    {
      selector: 'input[name=confirmedPassword]',
      value: 'Test1234'
    },
    {
      selector: 'input[name=question1]',
      value: 'What is the name of your first pet?'
    },
    {
      selector: 'input[name=answer1]',
      value: 'Puppy'
    },
    {
      selector: 'input[name=question2]',
      value: 'What was the color of your first car?'
    },
    {
      selector: 'input[name=answer2]',
      value: 'Red'
    },
    {
      selector: 'div[name=acceptRulesAndRegulations] .icon_check',
      event: 'click'
    }
  ]
};
