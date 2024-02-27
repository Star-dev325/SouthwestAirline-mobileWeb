import React from 'react';
import { connect } from 'react-redux';
import SimulateHybridForm from 'src/shared/simulateHybrid/components/simulateHybridForm';
import CheckboxButton from 'src/shared/components/checkboxButton';
import * as webViewActions from 'src/shared/actions/webViewActions';
import Container from 'src/shared/components/container';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import { hideFullScreenModal } from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';

const MODAL_ID = '_hybrid';

const SimulateHybridModal = ({ isWebView, isWebViewFn, isNotWebViewFn }) => {
  const _handleCheckboxChange = (checked) => {
    if (checked) {
      isWebViewFn();
    } else {
      isNotWebViewFn();
    }
  };

  const _handleDoneButtonClick = () => {
    hideFullScreenModal(MODAL_ID);
  };

  const _handleSubmit = (formData) => {
    console.log(`Sent message with formData: `, formData);
  };

  const _getRightPageHeaderButtons = () =>
    [{ name: 'Done', onClick: _handleDoneButtonClick }];

  return (
    <FullScreenModal id={MODAL_ID}>
      <PageHeaderWithButtons className="simulate-hybrid-modal--page-header"
        rightButtons={_getRightPageHeaderButtons()}
        title="Simulate Hybrid"
      />
      <Container>
        <CheckboxButton onChange={_handleCheckboxChange} defaultChecked={isWebView}>
          Enable Hybrid
        </CheckboxButton>
        <SimulateHybridForm onSubmit={_handleSubmit} />
      </Container>
    </FullScreenModal>
  );
};

const mapDispatchToProps = {
  isWebViewFn: webViewActions.isWebView,
  isNotWebViewFn: webViewActions.isNotWebView
};

const mapStateToProps = (state) => ({
  isWebView: state.app?.webView?.isWebView
});

export default connect(mapStateToProps, mapDispatchToProps)(SimulateHybridModal);
