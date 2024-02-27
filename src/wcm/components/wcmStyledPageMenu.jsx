// @flow
import React from 'react';

import type { SectionMenuType, onLinkClickType } from 'src/wcm/flow-typed/wcm.types';

type Props = SectionMenuType & {
  onClick: onLinkClickType
};

const WcmStyledPageMenu = ({ linkType = '', target = '', image, altText, onClick }: Props) => (
  <a onClick={() => onClick({ link_type: linkType, target })}>
    <img className="image fit mt1" src={image} alt={altText} />
  </a>
);

export default WcmStyledPageMenu;
