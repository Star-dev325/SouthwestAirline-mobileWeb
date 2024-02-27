// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import React from 'react';
import Icon from 'src/shared/components/icon';

type Props = {
  hideIsNextDay?: boolean,
  isNextDay?: ?boolean,
  isOvernight?: ?boolean,
  shouldDisplayOrangeOvernight?: boolean,
  shouldDisplaySmallerSize?: boolean,
  shouldPrioritizeNextDay?: boolean
};

const MultiDayIndicator = (props: Props) => {
  const {
    hideIsNextDay,
    isNextDay,
    isOvernight,
    shouldDisplayOrangeOvernight,
    shouldDisplaySmallerSize,
    shouldPrioritizeNextDay
  } = props;
  const fontSize = cx({
    'multi-day-indicator--font-small': !shouldDisplaySmallerSize,
    'multi-day-indicator--font-smaller': shouldDisplaySmallerSize
  });
  const iconStyle = cx({
    'multi-day-indicator--icon': true,
    'multi-day-indicator--icon-small': !shouldDisplaySmallerSize,
    'multi-day-indicator--icon-smaller': shouldDisplaySmallerSize
  });
  const overnightStyles = cx({
    'multi-day-indicator': true,
    'multi-day-indicator--overnight-orange': shouldDisplayOrangeOvernight,
    'multi-day-indicator--overnight-red': !shouldDisplayOrangeOvernight
  });

  if ((isOvernight && !isNextDay) || (isOvernight && isNextDay && !shouldPrioritizeNextDay)) {
    return (
      <div className={overnightStyles} data-qa="overnight-indicator">
        <Icon className={iconStyle} type="next-day-indicator" />
        <p className={fontSize}>{i18n('AIR_BOOKING__SHOPPING__OVERNIGHT')}</p>
      </div>
    );
  }

  if (isNextDay && !hideIsNextDay) {
    return (
      <div className="multi-day-indicator multi-day-indicator--nextday-green" data-qa="next-day-indicator">
        <Icon className={iconStyle} type="next-day-indicator" />
        <p className={fontSize}>{i18n('AIR_BOOKING__SHOPPING__NEXT_DAY')}</p>
      </div>
    );
  }

  return null;
};

export default MultiDayIndicator;
