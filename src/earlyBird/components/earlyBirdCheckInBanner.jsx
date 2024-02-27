// @flow
import React from 'react';
import _ from 'lodash';
import ImgThatHidesOnError from 'src/shared/components/imgThatHidesOnError';
import type { EarlyBirdBannerType } from 'src/earlyBird/flow-typed/earlyBird.types';

type Props = {
  banner: EarlyBirdBannerType
};

const EarlyBirdCheckInBanner = ({ banner }: Props) => (
  <div>
    {_.isEmpty(banner) ? (
      <div className="early-bird-check-in--placeholder" />
    ) : (
      <div className="early-bird-check-in-banner">
        <ImgThatHidesOnError
          className="early-bird-check-in-banner--background-image"
          src={banner.image}
          alt={banner.alt}
        />
      </div>
    )}
  </div>
);

module.exports = EarlyBirdCheckInBanner;
