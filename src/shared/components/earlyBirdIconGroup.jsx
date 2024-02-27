// @flow
import React from 'react';
import i18n from '@swa-ui/locale';
import Icon from 'src/shared/components/icon';

const EarlyBirdIconGroup = () => (
  <span className="early-bird-wrap">
    <Icon data-qa="earlyBirdIcon" type="early-bird" />{' '}
    <span className="early-bird-text"> {i18n('SHARED__EARLY_BIRD')} </span>
  </span>
);

export default EarlyBirdIconGroup;
