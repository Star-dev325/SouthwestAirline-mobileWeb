// @flow

import React from 'react';
import i18n from '@swa-ui/locale';
import { sitePaths } from 'src/shared/constants/siteLinks';

type Props = {
  className?: string,
  isWebView?: boolean
};

const TermsAndPrivacyLinks = (props: Props) => (
  <div className={props.className}>
    <a href={sitePaths.termsAndConditions} target={props.isWebView ? '_self' : '_blank'} className="pblue">
      {i18n('SHARED__FOOTER__TERMS_AND_CONDITIONS')}
    </a>
    <span className="page-footer-wcm--divider">|</span>
    <a href={sitePaths.privacyPolicy} target={props.isWebView ? '_self' : '_blank'} className="pblue">
      {i18n('SHARED__FOOTER__PRIVACY_POLICY')}
    </a>
  </div>
);

export default TermsAndPrivacyLinks;
