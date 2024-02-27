// @flow
import React from 'react';
import { convertBrandColor } from 'src/shared/helpers/productDefinitionsHelper';

import type { Node } from 'react';
import type { StylizedLabel } from 'src/shared/flow-typed/shared.types';

type Props = {
  value: ?StylizedLabel,
  defaultText?: string
};

export default ({ value, defaultText = '' }: Props): Array<Node> => {
  const stylizedLabel: StylizedLabel = value || [{ label: defaultText }];

  return stylizedLabel.map((chunk, index) => (
    <span style={{ fontFamily: chunk.font }} className={convertBrandColor(chunk.primaryLabelColor)} key={index}>
      {chunk.label}
    </span>
  ));
};
