// @flow
import React from 'react';
import Button from 'src/shared/components/button';
import Icon from 'src/shared/components/icon';

import type { CallToActionType } from 'src/wcm/flow-typed/wcm.types';

const CallToAction = ({ ctaType = 'none', ctaText = '', onClick, linkType, target }: CallToActionType) => (
  <div>
    {ctaType === 'button' && (
      <div className="m6">
        <Button
          color="yellow"
          size="huge"
          type="button"
          onClick={() => onClick && onClick({ link_type: linkType, target })}
          fluid
        >
          <span className="xlarge">{ctaText}</span>
        </Button>
      </div>
    )}
    {ctaType === 'text' && (
      <div className="my6 ml6" data-qa="nav-item" onClick={() => onClick && onClick({ link_type: linkType, target })}>
        <div className="bold pblue inline">{ctaText}</div>
        <Icon className="bold pblue xxlarge pl6 call-to-action--icon" type="keyboard-arrow-right" />
      </div>
    )}
  </div>
);

export default CallToAction;
