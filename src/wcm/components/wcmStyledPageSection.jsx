// @flow
import React from 'react';
import SectionBody from 'src/wcm/components/sectionBody';
import InlineImageSectionBody from 'src/wcm/components/inlineImageSectionBody';

import type { SectionBodyPropsType } from 'src/wcm/flow-typed/wcm.types';

const WcmStyledPageSection = (props: SectionBodyPropsType) => {
  const { heading, sectionTitle, imagePlacement } = props;

  return (
    <div className="wcm-styled-page-section larger gray5">
      <div className="m6 xxlarge bold pdkblue">{sectionTitle}</div>
      <h5 className="regular m6 large">{heading}</h5>
      {imagePlacement === 'inline' ? <InlineImageSectionBody {...props} /> : <SectionBody {...props} />}
    </div>
  );
};

export default WcmStyledPageSection;
