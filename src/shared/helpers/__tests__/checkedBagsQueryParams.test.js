jest.mock('src/shared/helpers/browserObject', () => ({
  location: { origin: 'http://test.com' }
}));

jest.mock('src/shared/bootstrap/urls', () => ({
  trackBagsHelpCenterUrl: 'http://test.com/help'
}));

import urls from 'src/shared/bootstrap/urls';
import browserObject from 'src/shared/helpers/browserObject';
import { getCheckedBagsQueryParams } from 'src/shared/helpers/checkedBagsQueryParams';

describe('getCheckedBagsQueryParams', () => {
  it('should return the correct object when trackCheckedBags is false', () => {
    const result = getCheckedBagsQueryParams(false);

    expect(result).toEqual(null);
  });

  it('should return the correct object when trackCheckedBags is true', () => {
    const result = getCheckedBagsQueryParams(true);

    expect(result).toEqual({
      helpCenterURL: urls.trackBagsHelpCenterUrl,
      returnToURL: browserObject.location.origin
    });
  });
});
