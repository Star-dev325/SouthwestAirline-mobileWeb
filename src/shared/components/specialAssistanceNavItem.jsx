// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import cx from 'classnames';

import i18n from '@swa-ui/locale';
import Fields from 'src/shared/components/fields';
import NavItemLink from 'src/shared/components/navItemLink';
import { DEFAULT_FIELD_VALUES } from 'src/shared/constants/specialAssistanceConstants';

import type { SpecialAssistanceType } from 'src/shared/flow-typed/shared.types';

type Props = {
  onClick: () => void,
  disabled?: boolean,
  specialAssistanceSelections?: SpecialAssistanceType
};

class SpecialAssistanceNavItem extends Component<Props> {
  _optionsSelectedCheck = () => {
    const { specialAssistanceSelections } = this.props;
    const currentFieldValues = _.merge(
      {},
      DEFAULT_FIELD_VALUES,
      specialAssistanceSelections ? specialAssistanceSelections : {}
    );

    return !_.isEqual(currentFieldValues, DEFAULT_FIELD_VALUES);
  };

  _fieldClicked = () => {
    const { onClick, disabled } = this.props;

    if (disabled) {
      return;
    } else {
      onClick();
    }
  };

  render() {
    const { disabled } = this.props;

    return (
      <Fields type="grouped">
        <NavItemLink
          onClick={this._fieldClicked}
          className="special-assistance-item"
          disabled={disabled}
          iconClassName={cx('nav-item-link--icon', { hide: disabled })}
        >
          <div>
            {i18n('SHARED__SPECIAL_ASSISTANCE__FIELD')}
          </div>
          <div className="special-assistance-item--option-label">
            {this._optionsSelectedCheck() ? 'Some options selected' : '(Optional)'}
          </div>
        </NavItemLink>
        <p className="sa-flight-in-progress-message">
          {i18n('SHARED__SPECIAL_ASSISTANCE__SA_FLIGHT_IN_PROGRESS_MESSAGE')}
        </p>
      </Fields>
    );
  }
}

export default SpecialAssistanceNavItem;
