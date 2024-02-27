import { getIsoCountryCodeForPhone } from 'src/shared/helpers/countryCodeHelper';

describe('countryCodeHelper', () => {
  it('should default to US if no numeric code is given', () => {
    expect(getIsoCountryCodeForPhone()).toEqual('US');
  });

  it('should return US for a numeric country code of 1', () => {
    expect(getIsoCountryCodeForPhone('1')).toEqual('US');
  });

  it('should return GR for Greece\'s country code', () => {
    expect(getIsoCountryCodeForPhone('30')).toEqual('GR');
  });

  it('should return US for an unrecognized country code', () => {
    expect(getIsoCountryCodeForPhone('999')).toEqual('US');
  });
});
