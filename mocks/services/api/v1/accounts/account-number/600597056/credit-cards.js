'use strict';

const _ = require('lodash');

const chance = new require('chance')();
const savedCreditCardsBuilder = require('test/builders/model/savedCreditCardsBuilderForWAPI');

let creditCardsApiResponse = savedCreditCardsBuilder.getTwoSavedCreditCards();

function randomCreditCardId() {
  return `${chance.integer({ min: 1, max: 9 })}-${chance.hash({ length: 6, casing: 'upper' })}`;
}

function convertNewCreditCard(requestBody) {
  const cardNumber = _.get(requestBody, 'creditCardPayment.cardNumber', '4111111111111111');
  const lastFourDigitsOfCreditCard = cardNumber.substr(cardNumber.length - 4, cardNumber.length);
  const creditCardType = _.get(requestBody, 'creditCardPayment.creditCardType', 'VISA');

  return {
    cardDescription: `${creditCardType} ${lastFourDigitsOfCreditCard}`,
    creditCardType,
    lastFourDigitsOfCreditCard,
    isPrimary: requestBody.isPrimary || false,
    savedCreditCardId: randomCreditCardId(),
    expirationMonth: 11,
    expirationYear: 2019,
    cardHolder: {
      firstName: _.get(requestBody, 'billingContactInfo.firstName', 'Zhen'),
      lastName: _.get(requestBody, 'billingContactInfo.firstName', 'Tang')
    },
    billingAddress: {
      addressLine1: _.get(requestBody, 'billingContactInfo.address.addressLine1', '633 Main St.'),
      addressLine2: _.get(requestBody, 'billingContactInfo.address.addressLine2', ''),
      city: _.get(requestBody, 'billingContactInfo.address.city', 'Brooklyn'),
      stateProvinceRegion: _.get(requestBody, 'billingContactInfo.address.stateProvinceRegion', 'NY'),
      zipOrPostalCode: _.get(requestBody, 'billingContactInfo.address.zipOrPostalCode', '19294'),
      addressType: _.get(requestBody, 'billingContactInfo.address.addressType', 'HOME'),
      isoCountryCode: _.get(requestBody, 'billingContactInfo.address.isoCountryCode', 'US'),
      companyName: null
    }
  };
}

function fixPrimary(savedCreditCards) {
  const primaryCards = _.chain(savedCreditCards).filter({ isPrimary: true }).size().value();

  if (primaryCards !== 1) {
    _.forEach(savedCreditCards, (creditCard) => {
      creditCard.isPrimary = false;
    });
    _.set(_.head(savedCreditCards), 'isPrimary', true);
  }
}

module.exports = [
  {
    path: /\/api\/v1\/accounts\/(x-)?account-number\/600597056\/credit-cards$/,
    method: 'GET',
    cache: false,
    status(req, res) {
      res.status(200).send(creditCardsApiResponse);
    }
  },
  {
    path: /(\/api\/v1\/accounts\/account-number\/600597056\/credit-cards|\/chapi\/v1\/mobile-misc\/feature\/my-account\/credit-cards)$/,
    method: 'POST',
    cache: false,
    status(req, res) {
      const newCreditCard = convertNewCreditCard(JSON.parse(req.rawBody));

      creditCardsApiResponse.savedCreditCards.push(newCreditCard);
      res.status(204).send();
    }
  },
  {
    path: /(\/api\/v1\/accounts\/account-number\/600597056\/credit-cards|\/chapi\/v1\/mobile-misc\/feature\/my-account\/credit-cards)$/,
    method: 'PUT',
    cache: false,
    status(req, res) {
      const newCreditCard = convertNewCreditCard(JSON.parse(req.rawBody));

      creditCardsApiResponse.savedCreditCards.push(newCreditCard);
      res.status(204).send();
    }
  },
  {
    path: /(\/api\/v1\/accounts\/account-number\/600597056|\/chapi\/v1\/mobile-misc\/feature\/my-account)\/credit-cards\/primary$/,
    method: 'POST',
    cache: false,
    status(req, res) {
      _.forEach(creditCardsApiResponse.savedCreditCards, (creditCard) => {
        creditCard.isPrimary = creditCard.savedCreditCardId === req.body.savedCreditCardId;
      });

      res.status(204).send();
    }
  },
  {
    path: /(\/api\/v1\/accounts\/account-number\/600597056\/credit-cards|\/chapi\/v1\/mobile-misc\/feature\/my-account\/credit-cards)$/,
    method: 'DELETE',
    cache: false,
    status(req, res) {
      creditCardsApiResponse.savedCreditCards = _.filter(
        creditCardsApiResponse.savedCreditCards,
        (creditCard) => req.query.savedCreditCardId.indexOf(creditCard.savedCreditCardId) < 0
      );

      fixPrimary(creditCardsApiResponse.savedCreditCards);
      res.status(204).send();
    }
  },
  {
    path: '/credit-cards-service-for-e2e/credit-cards/reset',
    method: 'POST',
    cache: false,
    status(req, res) {
      // For this endpoint, is only for e2e test.
      creditCardsApiResponse = savedCreditCardsBuilder.getTwoSavedCreditCards();
      res.status(200).send();
    }
  }
];
