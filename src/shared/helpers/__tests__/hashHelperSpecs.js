import { createSha256Hash } from 'src/shared/helpers/hashHelper';

describe('createHashHelperSpecs', () => {
  it('should convert item to a hash', () => {
    const result = createSha256Hash('12345');

    expect(result).to.equal('5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5');
  });

  it('should handle undefined value', () => {
    const result = createSha256Hash(undefined);

    expect(result).to.equal('');
  });

  it('should handle null value', () => {
    const result = createSha256Hash(null);

    expect(result).to.equal('');
  });
});
