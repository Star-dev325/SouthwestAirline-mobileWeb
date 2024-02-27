import _ from 'lodash';
import i18n from '@swa-ui/locale';

class PurchaseSummaryFormDataBuilder {
  constructor() {
    this.formData = {
      purposeOfTravel: '',
      paymentInfo: {},
      isEarlyBirdInPathRadioButtonChecked: '',
      contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_CALL')}, (123) 654-8973`,
      travelFundsAddress: null
    };
    this.purposeOfTravel = '';
    this.isEarlyBirdInPathRadioButtonChecked = '';
    this.contactMethodContent = `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_CALL')}, (123) 654-8973`;
    this.paymentInfo = {};
    this.securityCode = undefined;
    this.applyTravelFunds = '';
  }

  withEmailMe() {
    this.contactMethodContent = `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_EMAIL')}, a@gmail.com`;

    return this;
  }

  withSecurityCode() {
    this.securityCode = '1234';

    return this;
  }

  withTravelFundsAddress() {
    this.travelFundsAddress = {
      phoneNumber: '3214567890',
      phoneCountryCode: 'US',
      addressLine1: 'Testing',
      addressLine2: '',
      city: 'Austin',
      isoCountryCode: 'US',
      stateProvinceRegion: 'Texas',
      zipOrPostalCode: '12345'
    };

    return this;
  }

  build() {
    const { purposeOfTravel, isEarlyBirdInPathRadioButtonChecked, contactMethodContent, paymentInfo, securityCode, travelFundsAddress, applyTravelFunds } = this;

    return _.omitBy({ purposeOfTravel, isEarlyBirdInPathRadioButtonChecked, contactMethodContent, paymentInfo, securityCode, travelFundsAddress, applyTravelFunds }, _.isUndefined);
  }
}

export default PurchaseSummaryFormDataBuilder;
