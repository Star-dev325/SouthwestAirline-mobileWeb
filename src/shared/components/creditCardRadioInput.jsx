// @flow

import React from 'react';
import type { Node } from 'react';
import cx from 'classnames';
import CreditCardImage from 'src/shared/components/creditCardImage';

type Props = {
  name?: string,
  type: string,
  savedCreditCardId: string,
  selected: boolean,
  children?: Node,
  onClick: (savedCreditCardId: string) => void,
  showRadioButton?: boolean,
  disabled?: boolean
};

class CreditCardRadioInput extends React.Component<Props> {
  static defaultProps = {
    showRadioButton: true
  };

  render() {
    const { name, type, savedCreditCardId, selected, onClick, children, showRadioButton, disabled } = this.props;

    return (
      <div
        className={cx('credit-card-radio-input', 'credit-card-radio-input_selected')}
        onClick={() => onClick(savedCreditCardId)}
      >
        <label className="credit-card-radio-input--label">
          <div className="credit-card-radio-input--container">
            <CreditCardImage cardType={type} disabled={disabled} />
            <div className="credit-card-radio-input--text">
              {!disabled && <p className={cx('pdkblue', { larger: type !== 'GHOST_CARD' })}>{name}</p>}
              {disabled && <p className="gray4 larger">{name}</p>}
              {children}
            </div>
          </div>
          {showRadioButton && (
            <div>
              <input
                className="hidden"
                type="radio"
                value={savedCreditCardId}
                name={'intentToStore'}
                checked={selected}
                readOnly
              />
              <div className="check" />
            </div>
          )}
        </label>
      </div>
    );
  }
}

export default CreditCardRadioInput;
