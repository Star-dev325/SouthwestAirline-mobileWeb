// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

type Props = {
  onButtonClick: (string) => void,
  buttons: Array<{
    id: string,
    text: string,
    enable: boolean
  }>
};

const CreditCardsBottomBar = (props: Props) => {
  const { buttons, onButtonClick } = props;

  return (
    <div className="credit-cards-bottom-bar">
      {_.map(buttons, (button, index: number) => (
        <div
          key={index}
          className={cx('credit-cards-bottom-bar--button', {
            'credit-cards-bottom-bar--button_active': button.enable
          })}
          onClick={() => {
            button.enable && onButtonClick(button.id);
          }}
        >
          {button.text}
        </div>
      ))}
    </div>
  );
};

export default CreditCardsBottomBar;
