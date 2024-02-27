// @flow

import React from 'react';
import ImgThatHidesOnError from 'src/shared/components/imgThatHidesOnError';

type Props = {
  title?: string,
  subtitle?: string,
  image: {
    src?: string,
    alt?: string
  }
};

const ImageItem = (props: Props) => (
  <div className="image-item">
    <div className="overlay">
      <ImgThatHidesOnError className="image" src={props.image.src} alt={props.image.alt} />
    </div>
    <div className="title">{props.title}</div>
    <div className="subtitle" dangerouslySetInnerHTML={{ __html: props.subtitle }} />
  </div>
);

export default ImageItem;
