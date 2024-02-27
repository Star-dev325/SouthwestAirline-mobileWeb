import { getEarlyBirdAdditionalTemplateData } from 'src/airBooking/helpers/earlyBirdPlacementHelper';
import EarlyBirdEligibilityBuilder from 'test/builders/model/earlyBirdEligibilityBuilder';

context('getEarlyBirdAdditionalTemplateData', () => {
  const expectedAdditionalTemplateData = {
    earlyBirdPrefixText: '(',
    earlyBirdTotalPrice: '60.00',
    earlyBirdUnitPrice: '25.00'
  };

  it('should return correct additional template data', () => {
    const unitPriceInBound = {
      amount: '25.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };
    const unitPriceOutBound = {
      amount: '25.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };
    const earlyBirdEligibility = new EarlyBirdEligibilityBuilder().build();
    const result = getEarlyBirdAdditionalTemplateData(unitPriceInBound, unitPriceOutBound, earlyBirdEligibility);

    expect(result).to.deep.equal(expectedAdditionalTemplateData);
  });

  it('should return correct additional template data if inbound is undefined', () => {
    const unitPriceOutBound = {
      amount: '25.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };
    const earlyBirdEligibility = new EarlyBirdEligibilityBuilder().build();
    const result = getEarlyBirdAdditionalTemplateData(undefined, unitPriceOutBound, earlyBirdEligibility);

    expect(result).to.deep.equal(expectedAdditionalTemplateData);
  });

  it('should return correct additional template data if outbound is undefined', () => {
    const unitPriceInBound = {
      amount: '25.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };
    const earlyBirdEligibility = new EarlyBirdEligibilityBuilder().build();
    const result = getEarlyBirdAdditionalTemplateData(unitPriceInBound, undefined, earlyBirdEligibility);

    expect(result).to.deep.equal(expectedAdditionalTemplateData);
  });

  it('should return correct additional template data if inbound and outbound data are different', () => {
    const unitPriceInBound = {
      amount: '25.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };
    const unitPriceOutBound = {
      amount: '75.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };
    const earlyBirdEligibility = new EarlyBirdEligibilityBuilder().build();
    const result = getEarlyBirdAdditionalTemplateData(unitPriceInBound, unitPriceOutBound, earlyBirdEligibility);

    expect(result).to.deep.equal({
      earlyBirdPrefixText: '(Starting from ',
      earlyBirdTotalPrice: '60.00',
      earlyBirdUnitPrice: '25.00'
    });
  });
});
