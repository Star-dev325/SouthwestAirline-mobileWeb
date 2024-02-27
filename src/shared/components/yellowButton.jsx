// @flow

import React from 'react';
import Button from 'src/shared/components/button';

type Props = {
  href?: string,
  onClick?: () => void,
  target?: string,
  title?: string,
};

const YellowButton = (props: Props) => (
  <Button color="yellow" fluid {...props}>
    {props.title}
  </Button>
);

export default YellowButton;
