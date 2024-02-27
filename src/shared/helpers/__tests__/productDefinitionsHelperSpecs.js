import {
  convertBackgroundBrandColor,
  convertBackgroundBrandColorToHexCode,
  convertBrandColor,
  convertNamedIcon
} from 'src/shared/helpers/productDefinitionsHelper';

describe('ProductDefinitionsHelper', () => {
  it('should convert known brand color', () => {
    expect(convertBrandColor('primary-yellow')).to.equal('yellow');
  });

  it('should convert known upper-case brand color', () => {
    expect(convertBrandColor('Primary-Yellow')).to.equal('yellow');
  });

  it('should return provided default for unknown brand colors', () => {
    expect(convertBrandColor('primary-wrong', 'a-default-color')).to.equal('a-default-color');
  });

  it('should convert known brand color', () => {
    expect(convertNamedIcon('circle')).to.equal('bullet');
  });

  it('should convert known upper-case brand color', () => {
    expect(convertNamedIcon('Circle')).to.equal('bullet');
  });

  it('should return provided for unknown brand colors', () => {
    expect(convertNamedIcon('wrong', 'a-default-icon')).to.be.undefined;
  });

  it('should return default for unknown brand colors', () => {
    expect(convertNamedIcon('wrong')).to.be.undefined;
  });

  it('should convert green-circle-check name icon', () => {
    expect(convertNamedIcon('green-circle-check')).to.equal('success');
  });

  it('should convert warning name icon', () => {
    expect(convertNamedIcon('warning')).to.equal('error');
  });

  it('should convert earlyBird name icon', () => {
    expect(convertNamedIcon('earlyBird')).to.equal('early-bird');
  });

  describe('convertBackgroundBrandColor', () => {
    it('should convert known background brand color', () => {
      expect(convertBackgroundBrandColor('primary-yellow')).to.equal('bgyellow');
    });

    it('should convert known upper-case background brand color', () => {
      expect(convertBackgroundBrandColor('Primary-Yellow')).to.equal('bgyellow');
    });

    it('should return provided default for unknown background brand colors', () => {
      expect(convertBackgroundBrandColor('primary-wrong', 'a-default-color')).to.equal('a-default-color');
    });
  });

  describe('convertBackgroundBrandColorToHexCode', () => {
    it('should convert known boarding pass background brand color', () => {
      expect(convertBackgroundBrandColorToHexCode('primary-blue')).to.equal('#304cb2');
    });

    it('should return provided default for unknown boarding pass background brand colors', () => {
      expect(convertBackgroundBrandColorToHexCode('primary-wrong', 'a-default-color')).to.equal('a-default-color');
    });
  });
});
