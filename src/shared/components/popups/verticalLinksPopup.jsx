// @flow
import _ from 'lodash';
import { buttonPopupStyleTypeClass } from 'src/shared/helpers/buttonPopupStyleHelper';
import cx from 'classnames';
import React from 'react';
import withAbstractPopup from 'src/shared/enhancers/withAbstractPopup';
import filterDOMProps from 'src/shared/helpers/dom-whitelist/filterDomProps';

import type { VerticalLinksPopupType, LinkType } from 'src/shared/flow-typed/dialog.types';

type Props = VerticalLinksPopupType;

class VerticalLinksPopup extends React.Component<Props> {
  _close = () => {
    const { onClose } = this.props;

    onClose && onClose();
  };

  _getCloseButton = () => {
    const { closeLabel, closeLabelStyle } = this.props;

    return (
      <button
        className={cx('button button-popup button-popup_vertical', buttonPopupStyleTypeClass(closeLabelStyle))}
        data-qa="close"
        key="close-button"
        onClick={this._close}
        type="button"
      >
        {closeLabel || 'Close'}
      </button>
    );
  };

  render() {
    const { links, hideCloseButton } = this.props;

    const buttons = _.map(links, (link: LinkType, index: number) => {
      const { dataQa, href, isExternal, label, onClick, style } = link;

      let buttonProps = {
        className: cx('button', 'button-popup', 'button-popup_vertical', buttonPopupStyleTypeClass(style)),
        'data-qa': dataQa,
        href,
        key: index,
        onClick
      };

      if (isExternal) {
        buttonProps = _.merge(buttonProps, { target: '_blank' });
      }

      return <a {...filterDOMProps(buttonProps)}>{label}</a>;
    });

    return (
      <div className="popup-buttons--vertical">
        {hideCloseButton ? buttons : buttons.concat(this._getCloseButton())}
      </div>
    );
  }
}

export default withAbstractPopup(VerticalLinksPopup);
