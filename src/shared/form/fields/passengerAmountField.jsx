// @flow
import React from 'react';
import withField from 'src/shared/form/enhancers/withField';
import Icon from 'src/shared/components/icon';
import i18n from '@swa-ui/locale';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';
import type { PassengerCountValue } from 'src/airBooking/flow-typed/airBooking.types';

type Props = {
  paxType: string,
  onSelectPassengerClicked: () => void,
  MWEB_HOMEPAGE_REDESIGN: boolean,
  passengerCountValue: PassengerCountValue,
  adultsPlusChildrenCount: number
} & FieldProps;

export class PassengerAmountField extends React.Component<Props> {
  render() {
    const { adultsPlusChildrenCount, paxType, onSelectPassengerClicked, MWEB_HOMEPAGE_REDESIGN, passengerCountValue } =
      this.props;

    const handlePassengerLabel = () => {
      if (passengerCountValue?.valueUpdated) {
        if (adultsPlusChildrenCount > 1) {
          return 'SHARED__LAP_CHILD__LIST_ITEM_PASSENGERS_TITLE';
        } else {
          return 'SHARED__LAP_CHILD__LIST_ITEM_PASSENGER_TITLE';
        }
      } else {
        return 'SHARED__LAP_CHILD__TITLE_SELECT_PASSENGERS';
      }
    };

    return (
      <div className="passenger-amount-field" onClick={onSelectPassengerClicked}>
        <div className="flex flex-column flex5">
          <div className="passenger-amount-field--passenger-with-lap-child">{`${paxType}s`}</div>
          <span className="passenger-amount-field--description">
            {i18n('SHARED__LAP_CHILD__TITLE_DESCRIPTION_TEXT')}
          </span>
        </div>

        {!MWEB_HOMEPAGE_REDESIGN && <Icon type="passenger" className="passenger-amount-field--icon" />}
        <div className="passenger-amount-field--action flex5">
          <div className="passenger-amount-field--column">
            <span
              className={
                passengerCountValue?.valueUpdated ? 'selected-passengers-count--bold' : 'selected-passengers-count'
              }
            >
              {adultsPlusChildrenCount}
            </span>
            <span className="select-passenger-desc">{i18n(handlePassengerLabel())}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withField({
  format: Number
})(PassengerAmountField);
