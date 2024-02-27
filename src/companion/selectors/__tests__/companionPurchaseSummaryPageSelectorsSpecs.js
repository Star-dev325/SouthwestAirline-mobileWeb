import sinonModule from 'sinon';
import _ from 'lodash';
import * as purchaseSummaryPageHelper from 'src/airBooking/helpers/purchaseSummaryPageHelper';
import CompanionInformationPageBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/companion/companionInformationPageBuilder';
import {
  getCompanionPurchaseSummaryPage,
  getCompanionPassengerInfos
} from 'src/companion/selectors/companionPurchaseSummaryPageSelectors';
import CompanionPassengerPageBuilder from 'test/builders/model/companionPassengerPageBuilder';
import CompanionFlightPricingPageBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/companion/companionFlightPricingPageBuilder';

const sinon = sinonModule.sandbox.create();

describe('CompanionPurchaseSummaryPageSelector', () => {
  context('getCompanionPurchaseSummaryPage', () => {
    it('should return data of companion purchase summary', () => {
      const state = {};

      _.set(state, 'app.companion.flightPricingPage', 'pricing');
      _.set(state, 'app.companion.companionPassengerPage.response', new CompanionInformationPageBuilder().build());
      const generateTripSummaryStub = sinon
        .stub(purchaseSummaryPageHelper, 'generateTripSummary')
        .returns('fakeTripSummary');

      const actualResult = getCompanionPurchaseSummaryPage(state);

      expect(generateTripSummaryStub).to.be.calledWith({ flightPricingPage: 'pricing' });
      expect(actualResult).to.deep.equal({
        tripSummary: 'fakeTripSummary',
        passengers: [{ name: 'Companion Fang' }]
      });
    });
  });

  context('get companion passenger infos', () => {
    it('should convert companion passenger page to passenger infos for adult', () => {
      const CompanionFlightPricingPage = new CompanionFlightPricingPageBuilder().build().flightPricingPage;
      const companionPassengerInformation = new CompanionPassengerPageBuilder().build();

      const state = {};

      _.set(state, 'app.companion.companionPassengerPage', companionPassengerInformation);
      _.set(state, 'app.companion.flightPricingPage', CompanionFlightPricingPage);

      expect(getCompanionPassengerInfos(state)).to.deep.equal([
        {
          type: 'adult',
          passengerReference: 1,
          passengerInfo: {
            middleName: '',
            gender: 'F',
            dateOfBirth: '1995-02-05',
            redressNumber: null,
            emailReceiptTo: 'aterris@example.com',
            knownTravelerNumber: null,
            firstName: 'Companion',
            lastName: 'Fang'
          }
        }
      ]);
    });

    it('should convert companion passenger page to passenger infos for adult with multiple first names', () => {
      const CompanionFlightPricingPage = new CompanionFlightPricingPageBuilder().build().flightPricingPage;
      const companionPassengerInformation = new CompanionPassengerPageBuilder().withMultipleFirstName().build();

      const state = {};

      _.set(state, 'app.companion.companionPassengerPage', companionPassengerInformation);
      _.set(state, 'app.companion.flightPricingPage', CompanionFlightPricingPage);

      expect(getCompanionPassengerInfos(state)).to.deep.equal([
        {
          type: 'adult',
          passengerReference: 1,
          passengerInfo: {
            middleName: 'middle',
            gender: 'F',
            dateOfBirth: '1995-02-05',
            redressNumber: null,
            emailReceiptTo: 'aterris@example.com',
            knownTravelerNumber: null,
            firstName: 'Randi Lynn',
            lastName: 'Fang'
          }
        }
      ]);
    });

    it('should convert companion passenger page to passenger infos for adult with special assistance needs', () => {
      const CompanionFlightPricingPage = new CompanionFlightPricingPageBuilder().build().flightPricingPage;
      const companionPassengerInformation = new CompanionPassengerPageBuilder().build();
      const specialAssistance = {
        BLIND: true
      };

      const state = {};

      _.set(state, 'app.companion.companionPassengerPage', companionPassengerInformation);
      _.set(state, 'app.companion.flightPricingPage', CompanionFlightPricingPage);
      _.set(state, 'app.companion.specialAssistance', specialAssistance);

      expect(getCompanionPassengerInfos(state)).to.deep.equal([
        {
          type: 'adult',
          passengerReference: 1,
          passengerInfo: {
            middleName: '',
            gender: 'F',
            dateOfBirth: '1995-02-05',
            redressNumber: null,
            emailReceiptTo: 'aterris@example.com',
            knownTravelerNumber: null,
            firstName: 'Companion',
            lastName: 'Fang'
          },
          specialAssistance: {
            BLIND: true
          }
        }
      ]);
    });
  });
});
