// @flow
import React from 'react';
import WithField from 'src/shared/form/enhancers/withField';
import MoneyOrPointsSwitchButton from 'src/shared/components/moneyOrPointsSwitchButton';
import { DOLLAR } from 'src/shared/constants/currencyTypes';
import i18n from '@swa-ui/locale';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type Props = {
  disabled?: boolean
} & FieldProps;

export class MoneyOrPointsSwitchButtonField extends React.Component<Props> {
  static defaultProps = {
    disabled: false
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const shouldResetCurrencyType = nextProps.disabled && this.props.value !== DOLLAR;

    shouldResetCurrencyType && nextProps.onChange(DOLLAR);
  }

  render() {
    const { disabled, onChange, MWEB_HOMEPAGE_REDESIGN, ...restProps } = this.props;

    return (
      <div className="checkbox-group">
        <label className="checkbox-label">{i18n('AIR_BOOKING__SEARCH_FLIGHTS__SHOW_FARES_IN')}</label>
        <MoneyOrPointsSwitchButton
          name="currencyType"
          onSelect={({ value }) => onChange(value)}
          disabled={disabled}
          MWEB_HOMEPAGE_REDESIGN={MWEB_HOMEPAGE_REDESIGN}
          {...restProps}
        />
      </div>
    );
  }
}

export default WithField()(MoneyOrPointsSwitchButtonField);
