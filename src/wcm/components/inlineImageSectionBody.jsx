// @flow
import React from 'react';
import SectionBody from 'src/wcm/components/sectionBody';
import WcmStyledPageImage from 'src/wcm/components/wcmStyledPageImage';

import type { SectionBodyPropsType } from 'src/wcm/flow-typed/wcm.types';

const InlineImageSectionBody = (props: SectionBodyPropsType) => (
  <div className="flex">
    <div className="flex4">
      <WcmStyledPageImage data-qa="wcm-image-inline" className="pl6 pr3" {...props} />
    </div>
    <div className="flex8">
      <SectionBody {...props} />
    </div>
  </div>
);

export default InlineImageSectionBody;
