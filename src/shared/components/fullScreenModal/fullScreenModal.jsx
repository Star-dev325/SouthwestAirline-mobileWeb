// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { fullScreenModalStyles } from 'src/shared/constants/fullScreenModalConstants';
import { hideFullScreenModal } from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import RouterStore from 'src/shared/stores/routerStore';
import { isBrowserBackOrForward } from 'src/shared/routeUtils/routeStateHelper';

import type { Node } from 'react';

type Props = {
  id: string,
  activeIdInURL: string,
  forbidReopen?: boolean,
  children: Node
};

export class FullScreenModal extends React.Component<Props> {
  static defaultProps = {
    forbidReopen: false
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { id, forbidReopen } = nextProps;

    if (forbidReopen && isBrowserBackOrForward(RouterStore.getCurrentState())) {
      hideFullScreenModal(id);
    }
  }

  _shouldShowModal(activeIdInURL: string, id: string) {
    return _.includes(activeIdInURL, `_modal=${id}`);
  }

  render() {
    const { id, activeIdInURL, children } = this.props;
    const shouldShowModal = this._shouldShowModal(activeIdInURL, id);

    return (
      shouldShowModal && (
        <ReactModal isOpen ariaHideApp={false} style={fullScreenModalStyles}>
          {children}
        </ReactModal>
      )
    );
  }
}

export default connect(
  (state) => ({
    activeIdInURL: state.router.location.search
  }),
  {}
)(FullScreenModal);
