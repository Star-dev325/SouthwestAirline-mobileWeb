// @flow
import React from 'react';

type Props = {
  shouldDisplay: boolean,
  styles: *,
  children: *
};

const LoadingShimmer = ({ shouldDisplay, styles = {}, children }: Props) => {
  const { height, width } = styles;

  return (
    <div className={`shimmer${shouldDisplay ? ' bggray2' : ''}`} style={{ height, width }}>
      {shouldDisplay && (
        <div className="shimmer--animate">
          <div className="shimmer--effect"></div>
          <div className="shimmer--effect"></div>
        </div>
      )}
      <div className="shimmer--children">{children}</div>
    </div>
  );
};

export default LoadingShimmer;
