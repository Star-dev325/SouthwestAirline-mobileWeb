// @flow
import ButtonPopup from 'src/shared/components/popups/buttonPopup';
import { connect } from 'react-redux';
import React from 'react';
import VerticalLinksPopup from 'src/shared/components/popups/verticalLinksPopup';

import type { DialogType } from 'src/shared/flow-typed/dialog.types';

type Props = DialogType;

export class Dialog extends React.Component<Props> {
  _renderVerticalLinksPopup = () => {
    const {
      dialog: { active, name, title, message, contentView, verticalLinks, closeLabel, closeLabelStyle, ...other }
    } = this.props;

    return (
      <VerticalLinksPopup
        {...other}
        {...verticalLinks}
        active={!!(active && verticalLinks)}
        closeLabel={closeLabel}
        closeLabelStyle={closeLabelStyle}
        name={name}
        title={title}
      >
        {message && <p>{message}</p>}
        {contentView}
      </VerticalLinksPopup>
    );
  };

  _getButtonPopupProps = () => {
    const {
      dialog: { active, bodyClassName, buttons, className, name, onDimmerClick, title, titleClassName, verticalLinks }
    } = this.props;

    return {
      active: active && !verticalLinks,
      bodyClassName,
      buttons,
      className,
      name,
      onDimmerClick,
      title,
      titleClassName
    };
  };

  _renderButtonPopup = () => {
    const {
      dialog: { contentView, message }
    } = this.props;

    return (
      <ButtonPopup {...this._getButtonPopupProps()}>
        {message && <p>{message}</p>}
        {contentView}
      </ButtonPopup>
    );
  };

  render() {
    return (
      <div>
        {this._renderVerticalLinksPopup()}
        {this._renderButtonPopup()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dialog: state.app.dialog
});

export default connect(mapStateToProps, {})(Dialog);
