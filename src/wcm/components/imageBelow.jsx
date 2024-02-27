// @flow
import React from 'react';
import WcmStyledPageImage from 'src/wcm/components/wcmStyledPageImage';

type Props = {
  imagePlacement: string,
  image: string
};

const ImageBelow = (props: Props) => {
  const { imagePlacement, image } = props;

  return !!image && imagePlacement === 'below' && <WcmStyledPageImage data-qa="wcm-image-below" {...props} />;
};

export default ImageBelow;
