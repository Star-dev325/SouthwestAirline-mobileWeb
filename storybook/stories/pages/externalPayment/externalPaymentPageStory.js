import _ from 'lodash';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { getCeptorConfigWithEmptyUpliftConfig, getCeptorConfig } from 'test/builders/model/ceptorBuilder';
import { INITIAL_AVAILABILITY } from 'src/shared/constants/alternativeFormsOfPaymentConstants';

import { ExternalPaymentPage } from 'src/externalPayment/pages/externalPaymentPage';

const defaultProps = {
  location: {
    search: 'search'
  },
  ceptorConfig: getCeptorConfigWithEmptyUpliftConfig(),
  afpAvailability: INITIAL_AVAILABILITY,
  requestedAFPParams: getCeptorConfig().requestedAFPParams,
  tokenAvailability: {
    isAvailable: false
  },
  isWebView: false,
  displayButton: true,
  paymentMethodAvailabilities: [],
  externalPaymentRedirectUrlWhitelist: {},
  setUpExternalPaymentPageFn: _.noop,
  initiateExternalPaymentMethodFn: _.noop,
  completeExternalPaymentFn: _.noop,
  setDisplayButtonFn: _.noop,
  showDialogFn: _.noop,
  hideDialogFn: _.noop,
  goBack: _.noop
};

const tokenAvailableProps = {
  tokenAvailability: {
    isAvailable: true
  }
};

storiesOf('pages/externalPayment/externalPaymentPage', module)
  .add('default', () => {
    return <ExternalPaymentPage {...defaultProps} />;
  })
  .add('token isAvailable', () => {
    return <ExternalPaymentPage {...defaultProps} {...tokenAvailableProps} />;
  });
