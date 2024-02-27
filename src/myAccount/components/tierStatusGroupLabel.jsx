// @flow
import React from 'react';
import i18n from '@swa-ui/locale';

type TierStatusNextType = {
  label: string,
  value: string,
  points: number,
  flights: number
};

type TierStatusCurrentType = {
  label: string,
  value: string
};

type Props = {
  next: TierStatusNextType,
  current: TierStatusCurrentType,
  isAList: boolean,
  earnedAListThisYear: boolean,
  isAListPreferred: boolean,
  earnedAListPreferredThisYear: boolean
};

const TierStatusGroupLabel = (props: Props) => {
  const { current, next, isAList, isAListPreferred, earnedAListThisYear, earnedAListPreferredThisYear } = props;

  let preString = i18n('MY_ACCOUNT__CLIMBING_TOWARDS');
  let status = next.label;
  let postString = '';

  if (isAList && !earnedAListThisYear) {
    preString = i18n('MY_ACCOUNT__MAINTAIN_YOUR');
    status = current.label;
    postString = i18n('MY_ACCOUNT__STATUS');
  }

  if (isAListPreferred) {
    if (earnedAListPreferredThisYear) {
      preString = i18n('MY_ACCOUNT__YOURE');
      status = current.label;
    } else {
      preString = i18n('MY_ACCOUNT__MAINTAIN_YOUR');
      status = current.label;
      postString = i18n('MY_ACCOUNT__STATUS');
    }
  }

  return (
    <span>
      {preString}
      <b>{status}</b>
      {`${postString}.`}
    </span>
  );
};

export default TierStatusGroupLabel;
