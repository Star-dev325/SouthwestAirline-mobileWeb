import { getIconType } from 'src/shared/constants/iconConstants';

describe('getIconType', () => {
  it('should get mapped to info value', () => {
    const icon = getIconType('info');

    expect(icon).toBe('ic-info');
  });

  it('should get mapped to warning value', () => {
    const icon = getIconType('WARNING');

    expect(icon).toBe('exclamation-circle');
  });

  it('should get default value', () => {
    const icon = getIconType('check');

    expect(icon).toBe('exclamation-circle');
  });
});