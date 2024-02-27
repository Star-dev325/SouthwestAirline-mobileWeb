// @flow

import React from 'react';

import { sitePaths } from 'src/shared/constants/siteLinks';
import filterDOMProps from 'src/shared/helpers/dom-whitelist/filterDomProps';

import type { Node } from 'react';

type Props = {
  children: Node
};

const LinkToDesktopSite = (props: Props) => {
  const { children, ...restProps } = props;

  return (
    <a {...filterDOMProps(restProps)} href={sitePaths.fullSite} target="_blank">
      {children}
    </a>
  );
};

export default LinkToDesktopSite;
