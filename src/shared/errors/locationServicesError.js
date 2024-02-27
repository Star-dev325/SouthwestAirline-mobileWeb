import ExtendableError from 'src/shared/errors/extendableError';
import i18n from '@swa-ui/locale';

class LocationServicesError extends ExtendableError {
  constructor(message) {
    message = message || i18n('SHARED__ERROR_MESSAGES__LOCATION_UNAVAILABLE');

    super(message);
  }
}

export default LocationServicesError;
