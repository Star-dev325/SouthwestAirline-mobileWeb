// @flow
import _ from 'lodash';
import { buttonPopupStyleTypeClass } from 'src/shared/helpers/buttonPopupStyleHelper';
import cx from 'classnames';
import React from 'react';
import withAbstractPopup from 'src/shared/enhancers/withAbstractPopup';

import type { ButtonsPopupType, ButtonType } from 'src/shared/flow-typed/dialog.types';

type Props = ButtonsPopupType;

class ButtonPopup extends React.Component<Props> {
  render() {
    const { buttons } = this.props;
    const buttonProps = ['confirm-button', 'close-button'];

    const buttonsToRender = _.map(buttons, (button: ButtonType, index: number) => {
      const { dataAnalytics, dataQa, href, label, onClick, style } = button;
      const Component = href ? 'a' : 'button';

      return (
        <Component
          className={cx(
            'button button-popup button-popup_horizontal',
            buttonPopupStyleTypeClass(style),
            buttonProps[index]
          )}
          data-a={dataAnalytics}
          data-qa={dataQa}
          href={href}
          key={index}
          onClick={onClick}
        >
          {label}
        </Component>
      );
    });

    return <div className="flex fullwidth">{buttonsToRender}</div>;
  }
}

export default withAbstractPopup(ButtonPopup);
