// @flow
import React from 'react';
import ImageBelow from 'src/wcm/components/imageBelow';
import SectionText from 'src/wcm/components/sectionText';
import CallToAction from 'src/wcm/components/callToAction';
import Disclaimers from 'src/wcm/components/disclaimers';

import type { SectionBodyPropsType } from 'src/wcm/flow-typed/wcm.types';

const SectionBody = (props: SectionBodyPropsType) => {
  const { callToAction, onCallToActionClick } = props;

  return (
    <div>
      <SectionText {...props} />
      <ImageBelow {...props} />
      <CallToAction {...callToAction} onClick={onCallToActionClick} />
      <Disclaimers {...props} />
    </div>
  );
};

export default SectionBody;
