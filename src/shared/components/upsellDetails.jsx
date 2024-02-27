// @flow
import React from 'react';
import i18n from '@swa-ui/locale';
import Button from 'src/shared/components/button';
import FeaturesList from 'src/shared/components/featuresList';
import StylizedLabel from 'src/shared/components/stylizedLabel';

import type { UpsellDetailsType } from 'src/shared/flow-typed/shared.types';

type Props = UpsellDetailsType & {
  onUpgradeMyFlight?: () => void
};

const UpsellDetails = ({
  shouldRenderHeader = true,
  shouldRenderUpgradeButton = true,
  offerFeatures,
  offerText,
  offerTitle,
  offerIcon,
  stylizedOfferTitle,
  onUpgradeMyFlight,
  labelText
}: Props) => {
  const imageURI = offerIcon && `/content/mkt/images/${offerIcon}.png`;

  const _renderHeader = () => (
    <div className={`upsell-details--header ${offerIcon ? '' : 'pt4'}`}>
      {imageURI && <img className="upsell-details--header-image" src={imageURI} alt="" />}
      {stylizedOfferTitle ? renderPluHeader() : renderBusHeader()}
    </div>
  );

  const renderBusHeader = () => (
    <div>
      <h2 className={`upsell-details--header-title ${labelText ? 'xlarge' : ''} ${offerIcon ? '' : 'ml4'}`}>
        {offerTitle}
      </h2>
      {offerText && <div className="upsell-details--header-offer-text">{offerText}</div>}
    </div>
  );

  const renderPluHeader = () => (
    <h2 className="upsell-details--header-title xlarge ml4">
      <StylizedLabel value={stylizedOfferTitle} defaultText={offerTitle} />
    </h2>
  );

  const _renderUpgradeButton = () => (
    <Button
      className={labelText ? 'bdpblue' : ''}
      size={labelText ? 'larger' : 'large'}
      color={labelText ? 'grey' : 'yellow'}
      fluid
      onClick={onUpgradeMyFlight}
    >
      {labelText || i18n('VIEW_RESERVATION__DETAIL_PAGE__UPGRADE_TEXT')}
    </Button>
  );

  return (
    <div className={`upsell-details${labelText ? ' m3' : ''}`}>
      {shouldRenderHeader && _renderHeader()}
      <div className="upsell-details--content">
        <FeaturesList features={offerFeatures} />
        {shouldRenderUpgradeButton && _renderUpgradeButton()}
      </div>
    </div>
  );
};

export default UpsellDetails;
