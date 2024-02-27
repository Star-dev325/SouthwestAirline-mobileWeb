import sinonModule from 'sinon';
import { getBaseTemplateData, getAugmentedTemplateData } from 'src/wcm/selectors/templateDataSelector';
import * as CurrencyValueHelper from 'src/shared/helpers/currencyValueHelper';

const sinon = sinonModule.sandbox.create();

describe('template data selectors', () => {
  context('getBaseTemplateData', () => {
    const defaultState = {
      app: {
        account: {
          userInfo: {
            customers: {
              UserInformation: {
                redeemablePoints: 125000,
                companionPassInfo: {
                  companionRemainingPoints: 200
                },
                firstName: 'TestFName',
                recentFlightDestinationAirport: 'Austin'
              }
            }
          }
        }
      }
    };
    let currencyValueHelperStub;

    beforeEach(() => {
      currencyValueHelperStub = sinon.stub(CurrencyValueHelper);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should create properly formatted templateData to correct format', () => {
      currencyValueHelperStub.toFormattedStringFromNumber.onFirstCall().returns('200');
      currencyValueHelperStub.toFormattedStringFromNumber.onSecondCall().returns('125,000');

      expect(getBaseTemplateData(defaultState)).to.deep.equal({
        companionRemainingPoints: '200',
        destinationAirport: 'Austin',
        firstName: 'TestFName',
        redeemablePoints: '125,000'
      });
    });

    it('should create properly templateData to correct format when missing data', () => {
      currencyValueHelperStub.toFormattedStringFromNumber.onFirstCall().returns('');
      currencyValueHelperStub.toFormattedStringFromNumber.onSecondCall().returns('');

      expect(getBaseTemplateData({})).to.deep.equal({
        companionRemainingPoints: '',
        destinationAirport: '',
        firstName: '',
        redeemablePoints: ''
      });
    });
  });

  context('getAugmentedTemplateData', () => {
    const redeemablePoints = '2,500';
    const companionRemainingPoints = '12,500';
    const destinationAirport = 'Austin';
    const offerTotal = '65,000';
    const additionalData = 'data';

    const templateData = { redeemablePoints, companionRemainingPoints, destinationAirport };
    const additionalTemplateData = { additionalData };
    const placementData = { offerTotal };
    let toFormattedStringFromNumberStub;

    beforeEach(() => {
      toFormattedStringFromNumberStub = sinon.stub(CurrencyValueHelper, 'toFormattedStringFromNumber').returns('');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should handle templateData, additionalTemplateData, and placementData', () => {
      toFormattedStringFromNumberStub.returns('67,500');

      expect(getAugmentedTemplateData(templateData, additionalTemplateData, placementData)).to.deep.equal({
        redeemablePoints,
        companionRemainingPoints,
        destinationAirport,
        additionalData,
        offerTotal,
        totalPoints: '67,500'
      });
    });

    it('should calculate totalPoints from redeemablePoints in additionalTemplateData', () => {
      toFormattedStringFromNumberStub.returns('75,000');
      const result = getAugmentedTemplateData(
        templateData,
        { ...additionalTemplateData, redeemablePoints: '10,000' },
        placementData
      );

      expect(result).to.deep.equal({
        redeemablePoints: '10,000',
        companionRemainingPoints,
        destinationAirport,
        additionalData,
        offerTotal,
        totalPoints: '75,000'
      });
    });

    it('should handle undefined templateData', () => {
      expect(getAugmentedTemplateData(undefined, additionalTemplateData, placementData)).to.deep.equal({
        additionalData,
        offerTotal,
        totalPoints: ''
      });
    });

    it('should handle undefined redeemablePoints', () => {
      expect(getAugmentedTemplateData({}, additionalTemplateData, placementData)).to.deep.equal({
        offerTotal,
        additionalData,
        totalPoints: ''
      });
    });

    it('should handle empty string for redeemablePoints', () => {
      expect(getAugmentedTemplateData({ redeemablePoints: '' }, additionalTemplateData, placementData)).to.deep.equal({
        redeemablePoints: '',
        additionalData,
        offerTotal,
        totalPoints: ''
      });
    });

    it('should handle zero value for redeemablePoints', () => {
      toFormattedStringFromNumberStub.returns('65,000');

      expect(getAugmentedTemplateData({ redeemablePoints: 0 }, additionalTemplateData, placementData)).to.deep.equal({
        redeemablePoints: 0,
        additionalData,
        offerTotal,
        totalPoints: offerTotal
      });
    });

    it('should handle undefined placementData', () => {
      expect(getAugmentedTemplateData(templateData, additionalTemplateData, undefined)).to.deep.equal({
        redeemablePoints,
        companionRemainingPoints,
        destinationAirport,
        additionalData,
        offerTotal: '',
        totalPoints: ''
      });
    });

    it('should handle undefined offerTotal', () => {
      expect(getAugmentedTemplateData(templateData, additionalTemplateData, {})).to.deep.equal({
        redeemablePoints,
        companionRemainingPoints,
        destinationAirport,
        additionalData,
        offerTotal: '',
        totalPoints: ''
      });
    });

    it('should handle empty string for offerTotal', () => {
      expect(getAugmentedTemplateData(templateData, additionalTemplateData, { offerTotal: '' })).to.deep.equal({
        redeemablePoints,
        companionRemainingPoints,
        destinationAirport,
        additionalData,
        offerTotal: '',
        totalPoints: ''
      });
    });

    it('should handle undefined additionalTemplateData', () => {
      toFormattedStringFromNumberStub.returns('67,500');

      expect(getAugmentedTemplateData(templateData, undefined, placementData)).to.deep.equal({
        redeemablePoints,
        companionRemainingPoints,
        destinationAirport,
        offerTotal,
        totalPoints: '67,500'
      });
    });

    it('should return default object when empty data', () => {
      expect(getAugmentedTemplateData({}, {}, {})).to.deep.equal({
        offerTotal: '',
        totalPoints: ''
      });
    });

    it('should return default object when undefined data', () => {
      expect(getAugmentedTemplateData(undefined, undefined, undefined)).to.deep.equal({
        offerTotal: '',
        totalPoints: ''
      });
    });
  });
});
