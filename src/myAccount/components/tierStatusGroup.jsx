// @flow
import React from 'react';
import _ from 'lodash';
import numeral from 'numeral';
import util from 'util';
import cx from 'classnames';
import i18n from '@swa-ui/locale';
import TierStatus from 'src/myAccount/components/tierStatus';

type TierStatusPtsFlightsType = {
  current: number,
  total: number
};

type Props = {
  type: 'tier' | 'companion pass',
  pts: TierStatusPtsFlightsType,
  flights: TierStatusPtsFlightsType,
  label?: *,
  completed?: boolean,
  RRFont?: boolean
};

const TierStatusGroup = (props: Props) => {
  const _formattedNumber = (number: number) => numeral(Number(number)).format('0,0');

  const _getPercentage = (obj: TierStatusPtsFlightsType) => (obj.current / obj.total) * 100;

  const { type, completed, RRFont, label, pts, flights } = props;
  const suffix = type === 'companion pass' ? '†' : '*';

  return (
    <div
      className={cx('tier-status-group', {
        'tier-status-group--completed': type === 'tier' && completed,
        'companion-pass': type === 'companion pass',
        'tier-status-group--rr-font': !!RRFont
      })}
    >
      {!_.isEmpty(label) && <div className="tier-status-group--label">{label}</div>}
      <div className={cx('tier-status-group--status', { 'companion-pass': type === 'companion pass' })}>
        <div className="tier-status-group--status-col tier-status-group--status-col_graph">
          <TierStatus
            completed={completed}
            percentage={_getPercentage(pts)}
            label={_formattedNumber(pts.current)}
            desc={
              <span>
                {util.format(i18n('MY_ACCOUNT__TIER_STATUS_GROUP__POINTS_STATUS'), _formattedNumber(pts.total))}
                <sup>{suffix}</sup>
              </span>
            }
          />
        </div>
        <div className="tier-status-group--status-col">{i18n('MY_ACCOUNT__TIER_STATUS_GROUP__OR')}</div>
        <div className="tier-status-group--status-col tier-status-group--status-col_graph">
          <TierStatus
            completed={completed}
            percentage={_getPercentage(flights)}
            centerIconType="airplane-depart"
            label={_formattedNumber(flights.current)}
            desc={
              <span>
                {util.format(i18n('MY_ACCOUNT__TIER_STATUS_GROUP__FLIGHTS_STATUS'), _formattedNumber(flights.total))}
                <sup>{suffix}</sup>
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TierStatusGroup;
