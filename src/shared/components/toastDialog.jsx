// @flow
import React, { Component } from 'react';
import cx from 'classnames';
import _ from 'lodash';
import BrowserObject from 'src/shared/helpers/browserObject';

const { window } = BrowserObject;

type Props = {
  message: string,
  isVisible: boolean,
  onDismissCb: () => void
};

type State = {
  timeoutId: ?string
};

const EVENT_CAPTURE_PARAM = true;
const TOAST_ELEMENT_ID = 'toastDialogId';
const DISPLAY_TOAST_DIALOG_TIMEOUT = 5000;

class ToastDialog extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      timeoutId: undefined
    };
  }

  componentDidMount() {
    this._addWindowEventListeners();
  }

  componentDidUpdate(prevProps: Props) {
    if (!_.isEqual(this.props, prevProps)) {
      this._addWindowEventListeners();
    }
  }

  componentWillUnmount() {
    this._removeWindowEventListeners();
  }

  _onClickOrOnScrollForWindow = (event: Event) => {
    if (_.get(event, 'target.id') !== TOAST_ELEMENT_ID) {
      const { onDismissCb } = this.props;

      this._removeWindowEventListeners();
      onDismissCb();
    }
  };

  _addWindowEventListeners = () => {
    const { isVisible, onDismissCb } = this.props;

    if (isVisible) {
      window.addEventListener('click', this._onClickOrOnScrollForWindow, EVENT_CAPTURE_PARAM);
      window.addEventListener('scroll', this._onClickOrOnScrollForWindow, EVENT_CAPTURE_PARAM);
      const timeoutId = window.setTimeout(() => onDismissCb(), DISPLAY_TOAST_DIALOG_TIMEOUT);

      this.setState({
        timeoutId
      });
    }
  };

  _removeWindowEventListeners = () => {
    window.removeEventListener('click', this._onClickOrOnScrollForWindow, EVENT_CAPTURE_PARAM);
    window.removeEventListener('scroll', this._onClickOrOnScrollForWindow, EVENT_CAPTURE_PARAM);
    window.clearTimeout(this.state.timeoutId);
    this.setState({
      timeoutId: undefined
    });
  };

  render() {
    const { isVisible, message } = this.props;

    return (
      <div id={TOAST_ELEMENT_ID} className={cx('toast-dialog', { visible: isVisible })}>
        {message}
      </div>
    );
  }
}

export default ToastDialog;
