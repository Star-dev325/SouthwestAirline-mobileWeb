import _ from 'lodash';
import { FormNavItemFieldWithOptions } from 'src/shared/form/fields/formNavItemField';
import isoCountryCodes from 'src/shared/constants/isoCountryCode';

const format = (countryCode) => (_.isEmpty(countryCode) ? '' : `${isoCountryCodes[countryCode]} - ${countryCode}`);

const parse = (displayValue = '') => displayValue.split(' - ').pop();

export default FormNavItemFieldWithOptions({ format, parse });
