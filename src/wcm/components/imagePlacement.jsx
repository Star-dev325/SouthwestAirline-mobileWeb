// @flow
import _ from 'lodash';

import React from 'react';

import type { ImagePlacementProps } from 'src/wcm/flow-typed/wcm.types';
import PlacementLink from 'src/wcm/components/placementLink';

const ImagePlacement = (content: ImagePlacementProps) => {
  const {
    imageForegroundAltText,
    promoImageBackground,
    target,
    linkType,
    referrer = '',
    isChaseCombo,
    isChasePlacement,
    onClick = _.noop,
    handlePlacementLinkFn,
    contentBlockId,
    shouldRaiseSatelliteEvent,
    pageId = ''
  } = content;

  if (!promoImageBackground) {
    return null;
  }

  const imageAttributes = {
    alt: imageForegroundAltText,
    className: 'image-placement--background-image',
    src: promoImageBackground
  };

  return (
    <div className="image-placement">
      <PlacementLink
        target={target}
        linkType={linkType}
        referrer={referrer}
        isChaseCombo={isChaseCombo}
        isChasePlacement={isChasePlacement}
        onClick={onClick}
        handlePlacementLinkFn={handlePlacementLinkFn}
        contentBlockId={contentBlockId}
        shouldRaiseSatelliteEvent={shouldRaiseSatelliteEvent}
        pageId={pageId}
      >
        <img {...imageAttributes} />
      </PlacementLink>
    </div>
  );
};

export default ImagePlacement;
