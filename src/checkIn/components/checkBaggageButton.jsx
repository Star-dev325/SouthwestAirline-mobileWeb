// @flow
import { useHref } from '@swa-ui/encryption';
import i18n from '@swa-ui/locale';
import React from 'react';
import Button from 'src/shared/components/button';
import Icon from 'src/shared/components/icon';
import { TRACK_CHECKED_BAGS } from 'src/shared/constants/checkedBagsFeatureNames';
import BrowserObject from 'src/shared/helpers/browserObject';
import { buildPathWithQuery } from 'src/shared/helpers/pathUtils';

import type { CheckInRequestType } from 'src/checkIn/flow-typed/checkIn.types';
import type {
  BagsSharedQueryParamsType,
  CheckedBagsType,
  TrackBagsQueryParamsType
} from 'src/shared/flow-typed/shared.types';

type Props = {
  buttonClassName?: string,
  buttonSize?: string,
  checkedBagsData: CheckedBagsType,
  checkInRequest?: CheckInRequestType,
  classNames?: string,
  component: string,
  feature: string,
  icon?: string | null,
  queryParams?: BagsSharedQueryParamsType | TrackBagsQueryParamsType
};

const checkBaggageButton = ({
  buttonClassName = '',
  buttonSize = 'larger',
  checkedBagsData,
  checkInRequest: { body: { firstName = '', lastName = '', recordLocator = '' } = {} } = {},
  classNames = '',
  component,
  icon,
  feature,
  queryParams
}: Props) => {
  const { labelText, url } = checkedBagsData;
  const dataToEncrypt = {
    first_name: firstName,
    last_name: lastName,
    record_locator: recordLocator
  };
  const { href = url } = useHref(dataToEncrypt, url, component, feature);
  const { window } = BrowserObject;
  const hrefWithClickCode = queryParams ? buildPathWithQuery(href, queryParams) : href;
  const trackCheckedBagsExternalLinkText = i18n('CHECK_IN__CHECK_BAGGAGE_BUTTON__TRACK_BAGS__ARIA');

  const _onCheckBaggageButtonClick = () => {
    window.open(hrefWithClickCode, feature === TRACK_CHECKED_BAGS ? '_blank' : '_self');
  };

  return (
    <div className={classNames}>
      <Button
        aria-label={feature === TRACK_CHECKED_BAGS ? trackCheckedBagsExternalLinkText : null}
        className={buttonClassName}
        color="blue"
        data-qa="check-baggage-button"
        fluid
        onClick={_onCheckBaggageButtonClick}
        size={buttonSize}
      >
        {labelText}
        {icon && <Icon aria-hidden="true" className="external-link-icon" type={icon} />}
      </Button>
    </div>
  );
};

export default checkBaggageButton;
