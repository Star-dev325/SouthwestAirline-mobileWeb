// @flow
import _ from 'lodash';
import Overlay from 'src/wcm/components/overlay';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import React from 'react';

type Props = {
  doneLabel: string,
  isWebView: boolean,
  onDone: () => void,
  overlay?: {
    title?: string,
    body?: Array<*>
  }
};

const WcmOverlayModal = ({ overlay, onDone, doneLabel, isWebView }: Props) => {
  const initialWcmContent = { title: '', body: [] };
  const { title, body } = _.merge({}, initialWcmContent, overlay);

  return (
    <div className="wcm-overlay-modal">
      <PageHeaderWithButtons title={title} rightButtons={[{ name: doneLabel, onClick: onDone }]} hidden={isWebView} />
      <Overlay body={body} />
    </div>
  );
};

export default WcmOverlayModal;
