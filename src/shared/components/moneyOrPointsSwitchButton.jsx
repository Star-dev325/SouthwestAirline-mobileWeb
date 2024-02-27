// @flow
import React from 'react';
import cx from 'classnames';

import SwitcherButton from 'src/shared/components/switcherButton';
import { DOLLAR, POINTS } from 'src/shared/constants/moneyOrPoints';
import type { CurrencySuit } from 'src/shared/flow-typed/shared.types';
import type { SwitcherButtonOptionType } from 'src/shared/components/switcherButton';

export type CurrencySwitchControlOption = $Shape<SwitcherButtonOptionType> & {
  label: string,
  className?: string,
  value: CurrencySuit
};

type Props = {
  disabled?: boolean,
  onSelect: (option: CurrencySwitchControlOption) => void,
  darkTheme?: boolean,
  value?: string,
  useAlternateTheme?: boolean,
  MWEB_HOMEPAGE_REDESIGN?: boolean
};

class MoneyOrPointsSwitchButton extends React.Component<Props> {
  _checkForRequiresCustomTheme = () => {
    const { disabled, darkTheme, useAlternateTheme } = this.props;

    if (!disabled) {
      if (useAlternateTheme) {
        return 'money-or-points_alternate';
      } else if (darkTheme) {
        return 'money-or-points_dark';
      }
    }
  };

  render() {
    const { MWEB_HOMEPAGE_REDESIGN } = this.props;
    const _options = MWEB_HOMEPAGE_REDESIGN
      ? [
        {
          label: POINTS.FULL,
          className: 'money-or-points--points bold',
          value: POINTS.VALUE
        },
        {
          label: DOLLAR.ABBR,
          className: 'money-or-points--money bold',
          value: DOLLAR.VALUE
        }
      ]
      : [
        {
          label: DOLLAR.ABBR,
          className: 'money-or-points--money',
          value: DOLLAR.VALUE
        },
        {
          label: POINTS.ABBR,
          className: 'money-or-points--points',
          value: POINTS.VALUE
        }
      ];

    return (
      <SwitcherButton
        {...this.props}
        className={cx('money-or-points', this._checkForRequiresCustomTheme())}
        options={_options}
        itemClickable
      />
    );
  }
}

export default MoneyOrPointsSwitchButton;
