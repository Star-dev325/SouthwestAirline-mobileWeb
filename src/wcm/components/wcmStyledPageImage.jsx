// @flow
import React from 'react';
import cx from 'classnames';

type Props = {
  mediaType?: 'image' | 'youtube' | 'none',
  image?: string,
  altText?: string,
  targetVideo?: string,
  className?: string,
  onLoad?: () => void,
  'data-qa'?: string
};

const WcmStyledPageImage = ({
  mediaType,
  image,
  altText,
  onLoad,
  targetVideo = '',
  className,
  'data-qa': dataQa
}: Props) => {
  const youtubeElement = (
    <div className={cx('embedded-youtube-video', 'fit', className)}>
      <iframe src={`https://www.youtube.com/embed/${targetVideo}`} frameBorder="0" allowFullScreen />
    </div>
  );

  const imageElement = (
    <img className={cx('fit', className)} src={image} alt={altText} data-qa={dataQa} onLoad={onLoad} />
  );

  return <div>{mediaType === 'youtube' ? youtubeElement : imageElement}</div>;
};

export default WcmStyledPageImage;
