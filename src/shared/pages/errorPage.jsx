// @flow
import React, { useEffect } from 'react';

import { exitWebView } from 'src/shared/helpers/webViewHelper';
import { isHybridEnabled } from '@swa-ui/hybrid';
import Button from 'src/shared/components/button';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import ErrorDetails from 'src/shared/components/errorDetails';
import i18n from '@swa-ui/locale';
import InfoBanner from 'src/shared/components/infoBanner';

type Props = {
  error: string,
  errorInfo: *,
  resetErrorBoundary: () => void
};

const ErrorPage = (props: Props) => {
  const { error, errorInfo, resetErrorBoundary } = props;

  useEffect(() => () => resetErrorBoundary(), []);

  const handleButtonClick = () => {
    if (isHybridEnabled()) {
      exitWebView('');
    } else {
      window.location.replace('/');
    }
  };

  return (
    <div className="error-page">
      <InfoBanner
        iconTypeColor="error"
        header={i18n('SHARED__ERROR_PAGE__BANNER_TITLE')}
        body={i18n('SHARED__ERROR_PAGE__BANNER_DESCRIPTION')}
      />
      <div className="error-page--heading">{i18n('SHARED__ERROR_PAGE__TITLE')}</div>
      <div className="error-page--body">
        <DynamicPlacement className="error-page--placement" placementKey="contentModule1" shouldCheckBootstrapData />
        <DynamicPlacement className="error-page--placement" placementKey="contentModule2" shouldCheckBootstrapData />
        <DynamicPlacement className="error-page--placement" placementKey="contentModule3" shouldCheckBootstrapData />
        <Button onClick={handleButtonClick} color="yellow" size="larger" fluid>
          {isHybridEnabled() ? i18n('SHARED__ERROR_PAGE__WEBVIEW_BUTTON') : i18n('SHARED__ERROR_PAGE__BUTTON')}
        </Button>
        <ErrorDetails error={error} errorInfo={errorInfo} />
      </div>
    </div>
  );
};

export default ErrorPage;
