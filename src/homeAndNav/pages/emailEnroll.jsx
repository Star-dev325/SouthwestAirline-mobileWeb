// @flow

import React from 'react';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import PageHeader from 'src/shared/components/pageHeader';
import { sitePaths } from 'src/shared/constants/siteLinks';
import BrowserObject from 'src/shared/helpers/browserObject';
import i18n from '@swa-ui/locale';
import URLS from 'src/shared/bootstrap/urls';

const { window } = BrowserObject;
const { clickNSaveSignUpIframeUrl } = URLS;

export const EmailEnroll = () => (
  <div>
    <PageHeader>{i18n('HOME_AND_NAV__EMAIL_ENROLL__PAGE_TITLE')}</PageHeader>
    <div className="email-enroll--sub-header">
      <p className="medium">{i18n('HOME_AND_NAV__EMAIL_ENROLL__SIGN_UP_BODY')}</p>
    </div>
    <div>
      <iframe
        className="email-enroll--iframe"
        scrolling="no"
        frameBorder="0"
        onLoad={() => {
          window.scroll(0, 0);
        }}
        src={clickNSaveSignUpIframeUrl}
      />
    </div>
    <div className="email-enroll--footer">
      <p className="white mb5">{i18n('HOME_AND_NAV__EMAIL_ENROLL__FOOTER_MESSAGE')}</p>
      <a target="_blank" href={sitePaths.privacyPolicy}>
        {i18n('HOME_AND_NAV__EMAIL_ENROLL__FOOTER_LINK')}
      </a>
    </div>
  </div>
);

export default withConnectedReactRouter(EmailEnroll);
