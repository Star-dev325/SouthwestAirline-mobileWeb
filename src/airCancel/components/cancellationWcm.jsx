import React from 'react';
import { sitePaths } from 'src/shared/constants/siteLinks';
import i18n from '@swa-ui/locale';

const CancellationWcm = () => (
  <div className="px5 pb5">
    <a href={sitePaths.cancellationPolicy} target="_blank" className="pblue larger">
      {i18n('AIR_CANCEL__WCM_LINK')}
    </a>
  </div>
);

export default CancellationWcm;
