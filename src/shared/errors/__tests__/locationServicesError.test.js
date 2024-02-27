import LocationServicesError from 'src/shared/errors/locationServicesError';
import i18n from '@swa-ui/locale';

describe('LocationServicesError', () => {
  it('should set default error message', () => {
    const error = new LocationServicesError();

    expect(error.message).toEqual(i18n('SHARED__ERROR_MESSAGES__LOCATION_UNAVAILABLE'));
  });

  it('should set custom error message', () => {
    const error = new LocationServicesError('custom error message');

    expect(error.message).toEqual('custom error message');
  });
});
