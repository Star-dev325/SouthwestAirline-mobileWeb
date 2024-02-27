// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import dayjs from 'dayjs';
import React from 'react';

type Props = {
  date: string,
  faqWithLinks?: string,
  from: string,
  isEnhancedStandby?: boolean,
  onShareClickedCb?: ?() => void,
  to: string
};

const SearchFlightsSummaryHeader = (props: Props) => {
  const { date, faqWithLinks, from, isEnhancedStandby, onShareClickedCb, to } = props;

  const _getFormattedDate = (dateString) => {
    const today = dayjs(dayjs().format('YYYY-MM-DD'));
    const chosenDate = dayjs(dateString);
    const diff = today.diff(chosenDate, 'days');
    let day = '';

    switch (diff) {
      case 1:
        day = isEnhancedStandby
          ? `[${i18n('SHARED__FLIGHTS_SUMMARY_HEADER__YESTERDAYS_DATE')}: ]`
          : `[${i18n('SHARED__FLIGHTS_SUMMARY_HEADER__YESTERDAY')} - ]`;
        break;
      case -1:
        day = isEnhancedStandby
          ? `[${i18n('SHARED__FLIGHTS_SUMMARY_HEADER__TOMORROWS_DATE')}: ]`
          : `[${i18n('SHARED__FLIGHTS_SUMMARY_HEADER__TOMORROWS')} - ]`;
        break;
      default:
        day = isEnhancedStandby
          ? `[${i18n('SHARED__FLIGHTS_SUMMARY_HEADER__TODAYS_DATE')}: ]`
          : `[${i18n('SHARED__FLIGHTS_SUMMARY_HEADER__TODAY')} - ]`;
    }

    return dayjs(dateString).format(`${day} ddd, MMM D, YYYY`);
  };

  const _renderShareButton = () => (
    <a className="flight-search-summary share-button" onClick={onShareClickedCb}>
      {i18n('SHARED__FLIGHT_STATUS__SHARE')}
    </a>
  );

  return (
    <div className={cx('flight-search-summary', { 'enhanced-flight-search-summary': isEnhancedStandby })}>
      {isEnhancedStandby ? (
        <h5 className="page header attached flight-search-summary">
          <p className="sub header date">{_getFormattedDate(date)}</p>
          <p className="sub header description" dangerouslySetInnerHTML={{ __html: faqWithLinks }}></p>
        </h5>
      ) : (
        <h5 className="page header attached flight-search-summary">
          <p className="sub header date">{_getFormattedDate(date)}</p>
          <p className="sub header">From: {from}</p>
          <p className="sub header to">To: {to}</p>
        </h5>
      )}
      {onShareClickedCb && _renderShareButton()}
    </div>
  );
};

export default SearchFlightsSummaryHeader;
